import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(2000),
  company: z.string().optional(), // honeypot — must be empty
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  if (parsed.data.company) {
    // bot trapped: pretend success without sending
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  const { name, email, message } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to || apiKey === "your_resend_api_key") {
    // graceful when not configured (local/CI without real key)
    return NextResponse.json({ error: "Email not configured" }, { status: 502 });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Portfolio contact from ${name}`,
      text: `${name} <${email}>\n\n${message}`,
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
