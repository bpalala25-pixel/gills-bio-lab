import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: { ciphers: "SSLv3" },
});

export async function POST(req: NextRequest) {
  try {
    const { name, institution, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }

    const subjectLabels: Record<string, string> = {
      general: "General Inquiry",
      bulk: "Bulk / Lab Quote Request",
      documentation: "Documentation Request",
      order: "Order Question",
      availability: "Availability / Backorder",
      other: "Other",
    };

    await transporter.sendMail({
      from: `"Gills Bio Lab Website" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      replyTo: email,
      subject: `[Contact] ${subjectLabels[subject] ?? subject} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1c1917;">
          <div style="background: linear-gradient(135deg, #01696f, #018a92); padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800;">New Contact Form Submission</h1>
            <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Gills Bio Lab — gillsbiolab.com</p>
          </div>
          <div style="background: #f7f5f2; padding: 28px 32px; border: 1px solid rgba(28,25,23,0.10); border-top: none;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr><td style="padding: 8px 0; color: #6b6560; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b6560;">Institution</td><td style="padding: 8px 0; font-weight: 600;">${institution || "—"}</td></tr>
              <tr><td style="padding: 8px 0; color: #6b6560;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #01696f;">${email}</a></td></tr>
              <tr><td style="padding: 8px 0; color: #6b6560;">Subject</td><td style="padding: 8px 0; font-weight: 600;">${subjectLabels[subject] ?? subject}</td></tr>
            </table>
            <div style="background: #ffffff; border: 1px solid rgba(28,25,23,0.10); border-radius: 10px; padding: 18px; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #3d3833;">${message}</div>
          </div>
          <div style="background: #ede9e3; padding: 14px 32px; border-radius: 0 0 12px 12px; font-size: 11px; color: #9c9590; border: 1px solid rgba(28,25,23,0.10); border-top: none;">
            Sent from the Gills Bio Lab contact form. Reply to this email to respond directly to ${email}.
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact email error:", err);
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
