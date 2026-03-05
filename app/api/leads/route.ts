import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
      recentSubmissions.forEach((v, k) => {
        if (now - v > 60000) recentSubmissions.delete(k);
      });
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

    // Send email notification
    try {
      if (resend) await resend.emails.send({
        from: "BookYachtParty <onboarding@resend.dev>",
        to: "bookyachtparty@outlook.com",
        subject: `New Lead: ${sanitize(name)}`,
        html: `
          <h2>New Lead Received</h2>
          <table style="border-collapse:collapse;font-family:sans-serif;">
            <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${sanitize(name)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${sanitize(email)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${sanitize(phone)}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Date</td><td style="padding:8px;">${date ? sanitize(date) : "Not specified"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Guests</td><td style="padding:8px;">${guests ? sanitize(guests) : "Not specified"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;">Budget</td><td style="padding:8px;">${budget ? sanitize(budget) : "Not specified"}</td></tr>
          </table>
        `,
      });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request." },
      { status: 400 }
    );
  }
}
