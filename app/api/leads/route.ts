import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, date, guests, budget } = body;

    // Validation
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: "Name, email and phone are required." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("leads").insert({
      name,
      email,
      phone,
      date: date || null,
      guests: guests || null,
      budget: budget || null,
    });

    if (error) {
      console.error("Supabase insert error:", JSON.stringify(error));
      return NextResponse.json(
        { error: "Failed to save lead.", details: error.message },
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
