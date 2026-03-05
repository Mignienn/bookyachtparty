import { NextResponse } from "next/server";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

// Primary Resend (bookyachtparty@outlook.com account)
const resendKey = (process.env.RESEND_API_KEY || "").replace(/\s+/g, "");
const resend = resendKey ? new Resend(resendKey) : null;

// Backup Resend (n.mignien05@gmail.com account)
const resendBackupKey = (process.env.RESEND_API_KEY_BACKUP || "").replace(/\s+/g, "");
const resendBackup = resendBackupKey ? new Resend(resendBackupKey) : null;

// Basic rate limit: track IPs with timestamps
const recentSubmissions = new Map<string, number>();

function sanitize(str: string): string {
  return str.trim().slice(0, 500);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildEmailHtml(name: string, email: string, phone: string, date: string | null, guests: string | null, budget: string | null) {
  return `
    <h2>New Lead Received</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;">
      <tr><td style="padding:8px;font-weight:bold;">Name</td><td style="padding:8px;">${name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Email</td><td style="padding:8px;">${email}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Phone</td><td style="padding:8px;">${phone}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Date</td><td style="padding:8px;">${date || "Not specified"}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Guests</td><td style="padding:8px;">${guests || "Not specified"}</td></tr>
      <tr><td style="padding:8px;font-weight:bold;">Budget</td><td style="padding:8px;">${budget || "Not specified"}</td></tr>
    </table>
  `;
}

async function sendWithRetry(client: Resend, to: string, subject: string, html: string): Promise<boolean> {
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const result = await client.emails.send({
        from: "BookYachtParty <onboarding@resend.dev>",
        to,
        subject,
        html,
      });
      console.log(`Email to ${to} (attempt ${attempt}):`, JSON.stringify(result));
      return true;
    } catch (err) {
      console.error(`Email to ${to} attempt ${attempt} failed:`, err);
      if (attempt === 2) return false;
    }
  }
  return false;
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

    const sName = sanitize(name);
    const sEmail = sanitize(email);
    const sPhone = sanitize(phone);
    const sDate = date ? sanitize(date) : null;
    const sGuests = guests ? sanitize(guests) : null;
    const sBudget = budget ? sanitize(budget) : null;

    // Step 1: Try Supabase insert
    let supabaseOk = false;
    try {
      const { error } = await supabase.from("leads").insert({
        name: sName, email: sEmail, phone: sPhone,
        date: sDate, guests: sGuests, budget: sBudget,
      });
      if (error) {
        console.error("Supabase insert error:", JSON.stringify(error));
      } else {
        supabaseOk = true;
        console.log("Supabase insert OK");
      }
    } catch (dbErr) {
      console.error("Supabase crash:", dbErr);
    }

    // Step 2: Send email notifications (even if Supabase failed — don't lose the lead)
    const subject = `New Lead: ${sName}`;
    const html = buildEmailHtml(sName, sEmail, sPhone, sDate, sGuests, sBudget);

    let emailSent = false;

    // Primary: send to bookyachtparty@outlook.com
    if (resend) {
      const ok = await sendWithRetry(resend, "bookyachtparty@outlook.com", subject, html);
      if (ok) emailSent = true;
    }

    // Backup: send to n.mignien05@gmail.com
    if (resendBackup) {
      const ok = await sendWithRetry(resendBackup, "n.mignien05@gmail.com", subject, html);
      if (ok) emailSent = true;
    }

    // Log final status
    console.log(`Lead processed — Supabase: ${supabaseOk ? "OK" : "FAILED"}, Email: ${emailSent ? "OK" : "FAILED"}`);

    // If both Supabase AND email failed, return error so client shows WhatsApp fallback
    if (!supabaseOk && !emailSent) {
      return NextResponse.json(
        { error: "System temporarily unavailable. Please contact us via WhatsApp." },
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
