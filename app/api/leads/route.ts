import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Basic rate limit: track IPs with timestamps
const recentSubmissions = new Map<string, number>();

function sanitize(str: string): string {
  return str.trim().slice(0, 500);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    // Rate limit: 1 submission per IP per 30 seconds
    const ip = req.headers.get("x-forwarded-for") || "unknown";
    const now = Date.now();
    const lastSubmit = recentSubmissions.get(ip);
    if (lastSubmit && now - lastSubmit < 30000) {
      return NextResponse.json(
        { error: "Please wait before submitting again." },
        { status: 429 }
      );
    }
    recentSubmissions.set(ip, now);
    // Clean old entries every 100 submissions
    if (recentSubmissions.size > 100) {
      for (const [k, v] of recentSubmissions) {
        if (now - v > 60000) recentSubmissions.delete(k);
      }
    }

    const body = await req.json();
    const { name, email, phone, date, guests, budget } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email and phone are required." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("leads").insert({
      name: sanitize(name),
      email: sanitize(email),
      phone: sanitize(phone),
      date: date ? sanitize(date) : null,
      guests: guests ? sanitize(guests) : null,
      budget: budget ? sanitize(budget) : null,
    });

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to save lead." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
