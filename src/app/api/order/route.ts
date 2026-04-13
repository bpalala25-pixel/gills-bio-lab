import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import twilio from "twilio";

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

const SMS_RECIPIENTS = ["+17049099454", "+18644488174", "+18642831166"];

async function sendOrderSMS(body: string) {
  const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);
  await Promise.all(
    SMS_RECIPIENTS.map((to) =>
      client.messages.create({ from: process.env.TWILIO_FROM, to, body })
    )
  );
}

export async function POST(req: NextRequest) {
  try {
    const { info, shipping, paymentMethod, items, total, discountedTotal, savings } = await req.json();

    const paymentLabel =
      paymentMethod === "cashapp" ? "Cash App ($GillsResearch)"
      : `Crypto (10% discount — saved $${savings?.toFixed(2) ?? "0.00"})`;

    const itemRows = items
      .map(
        (item: { name: string; selectedQty: string; quantity: number; unitPrice: number }) =>
          `<tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid rgba(28,25,23,0.06);">${item.name}</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid rgba(28,25,23,0.06); color: #6b6560;">${item.selectedQty}</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid rgba(28,25,23,0.06); text-align: center;">${item.quantity}</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid rgba(28,25,23,0.06); text-align: right; font-weight: 600;">$${(item.unitPrice * item.quantity).toFixed(2)}</td>
          </tr>`
      )
      .join("");

    // Send email
    await transporter.sendMail({
      from: `"Gills Bio Lab Orders" <${process.env.SMTP_USER}>`,
      to: process.env.NOTIFY_EMAIL,
      replyTo: info.email,
      subject: `[New Order] ${info.name} — $${discountedTotal.toFixed(2)} — ${paymentLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; color: #1c1917;">
          <div style="background: linear-gradient(135deg, #01696f, #018a92); padding: 24px 32px; border-radius: 12px 12px 0 0;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 800;">New Research Order</h1>
            <p style="color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px;">Gills Bio Lab — gillsreasearch.com</p>
          </div>

          <div style="background: #f7f5f2; padding: 28px 32px; border: 1px solid rgba(28,25,23,0.10); border-top: none;">

            <h2 style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #9c9590; margin: 0 0 12px;">Customer</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr><td style="padding: 6px 0; color: #6b6560; width: 140px;">Name</td><td style="padding: 6px 0; font-weight: 600;">${info.name}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b6560;">Institution</td><td style="padding: 6px 0; font-weight: 600;">${info.institution}</td></tr>
              <tr><td style="padding: 6px 0; color: #6b6560;">Email</td><td style="padding: 6px 0;"><a href="mailto:${info.email}" style="color: #01696f;">${info.email}</a></td></tr>
              ${info.phone ? `<tr><td style="padding: 6px 0; color: #6b6560;">Phone</td><td style="padding: 6px 0;">${info.phone}</td></tr>` : ""}
              <tr><td style="padding: 6px 0; color: #6b6560;">Role</td><td style="padding: 6px 0;">${info.role}</td></tr>
            </table>

            <h2 style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #9c9590; margin: 0 0 12px;">Ship To</h2>
            <p style="font-size: 14px; margin: 0 0 24px; line-height: 1.6;">${shipping.address}<br>${shipping.city}, ${shipping.state} ${shipping.zip}<br>${shipping.country} — ${shipping.method === "express" ? "Express (2-3 days)" : "Standard (5-7 days)"}</p>

            <h2 style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #9c9590; margin: 0 0 12px;">Payment Method</h2>
            <p style="font-size: 14px; margin: 0 0 24px;">${paymentLabel}</p>

            <h2 style="font-size: 13px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #9c9590; margin: 0 0 12px;">Order Items</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; background: #ffffff; border-radius: 10px; overflow: hidden; border: 1px solid rgba(28,25,23,0.08);">
              <thead>
                <tr style="background: rgba(1,105,111,0.06);">
                  <th style="padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9c9590;">Product</th>
                  <th style="padding: 10px 12px; text-align: left; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9c9590;">Size</th>
                  <th style="padding: 10px 12px; text-align: center; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9c9590;">Qty</th>
                  <th style="padding: 10px 12px; text-align: right; font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #9c9590;">Subtotal</th>
                </tr>
              </thead>
              <tbody>${itemRows}</tbody>
              ${paymentMethod === "crypto" ? `
              <tr>
                <td colspan="3" style="padding: 10px 12px; text-align: right; font-size: 12px; color: #9c9590;">Original Total</td>
                <td style="padding: 10px 12px; text-align: right; font-size: 12px; text-decoration: line-through; color: #9c9590;">$${total.toFixed(2)}</td>
              </tr>
              <tr>
                <td colspan="3" style="padding: 10px 12px; text-align: right; font-size: 12px; color: #01696f;">10% Crypto Discount</td>
                <td style="padding: 10px 12px; text-align: right; font-size: 12px; color: #01696f;">−$${savings.toFixed(2)}</td>
              </tr>` : ""}
              <tr style="background: rgba(1,105,111,0.04);">
                <td colspan="3" style="padding: 12px; text-align: right; font-weight: 800; font-size: 15px;">Total Due</td>
                <td style="padding: 12px; text-align: right; font-weight: 800; font-size: 15px; color: #01696f;">$${discountedTotal.toFixed(2)}</td>
              </tr>
            </table>
          </div>

          <div style="background: #ede9e3; padding: 14px 32px; border-radius: 0 0 12px 12px; font-size: 11px; color: #9c9590; border: 1px solid rgba(28,25,23,0.10); border-top: none;">
            Order submitted via gillsreasearch.com. Reply to this email to contact the customer directly at ${info.email}.
          </div>
        </div>
      `,
    });

    // Send SMS alerts
    const itemSummary = items
      .map((i: { name: string; quantity: number }) => `${i.name} x${i.quantity}`)
      .join(", ");

    await sendOrderSMS(
      `🧪 New Gills Bio Lab Order!\n` +
      `Customer: ${info.name}\n` +
      `Items: ${itemSummary}\n` +
      `Total: $${discountedTotal.toFixed(2)}\n` +
      `Payment: ${paymentLabel}\n` +
      `Ship to: ${shipping.city}, ${shipping.state}`
    );

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order notification error:", err);
    return NextResponse.json({ error: "Failed to send order notification." }, { status: 500 });
  }
}
