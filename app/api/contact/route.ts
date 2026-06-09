import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface InquiryBody {
  name: string;
  phone: string;
  email: string;
  eventType: string;
  budget?: string;
  message?: string;
}

async function sendEmail(data: InquiryBody) {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_EMAIL_TO } = process.env;

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_EMAIL_TO) return;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"SHYTECH Contact Form" <${GMAIL_USER}>`,
    to: CONTACT_EMAIL_TO,
    replyTo: data.email,
    subject: `🎯 New Inquiry: ${data.eventType} — ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #ffffff; border-radius: 12px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #D4AF37 0%, #F5E27D 50%, #D4AF37 100%); padding: 28px 32px;">
          <h1 style="margin: 0; font-size: 22px; color: #000; letter-spacing: 2px;">SHYTECH</h1>
          <p style="margin: 4px 0 0; font-size: 13px; color: #000; opacity: 0.7;">New Client Inquiry</p>
        </div>

        <div style="padding: 32px;">
          <table style="width: 100%; border-collapse: collapse;">
            ${[
              ["Name", data.name],
              ["Phone", data.phone],
              ["Email", data.email],
              ["Event Type", data.eventType],
              ["Budget", data.budget || "Not specified"],
            ]
              .map(
                ([label, value]) => `
              <tr>
                <td style="padding: 10px 0; color: #D4AF37; font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; width: 120px; vertical-align: top;">${label}</td>
                <td style="padding: 10px 0; color: #ffffff; font-size: 15px; vertical-align: top;">${value}</td>
              </tr>
              <tr><td colspan="2" style="border-bottom: 1px solid #1a1a1a;"></td></tr>
            `
              )
              .join("")}
          </table>

          ${
            data.message
              ? `
            <div style="margin-top: 20px; padding: 16px; background: #111; border-radius: 8px; border-left: 3px solid #D4AF37;">
              <p style="margin: 0 0 8px; color: #D4AF37; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Message</p>
              <p style="margin: 0; color: #cccccc; font-size: 14px; line-height: 1.6;">${data.message}</p>
            </div>
          `
              : ""
          }

          <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #1a1a1a; text-align: center;">
            <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #D4AF37, #F5E27D); color: #000; font-weight: bold; text-decoration: none; border-radius: 50px; font-size: 13px; letter-spacing: 1px; margin-right: 10px;">
              REPLY TO CLIENT
            </a>
            <a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="display: inline-block; padding: 12px 28px; background: #25D366; color: #fff; font-weight: bold; text-decoration: none; border-radius: 50px; font-size: 13px; letter-spacing: 1px;">
              WHATSAPP CLIENT
            </a>
          </div>
        </div>

        <div style="padding: 16px 32px; background: #050505; text-align: center;">
          <p style="margin: 0; color: #444; font-size: 11px;">SHYTECH — Received ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        </div>
      </div>
    `,
  });
}

async function sendWhatsApp(data: InquiryBody) {
  const { CALLMEBOT_PHONE, CALLMEBOT_APIKEY } = process.env;

  if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) return;

  const text = encodeURIComponent(
    `🎯 *New SHYTECH Inquiry*\n\n` +
      `👤 *Name:* ${data.name}\n` +
      `📱 *Phone:* ${data.phone}\n` +
      `📧 *Email:* ${data.email}\n` +
      `🎪 *Event:* ${data.eventType}\n` +
      `💰 *Budget:* ${data.budget || "Not specified"}\n` +
      (data.message ? `\n💬 *Message:*\n${data.message}` : "")
  );

  await fetch(
    `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${text}&apikey=${CALLMEBOT_APIKEY}`
  );
}

export async function POST(request: NextRequest) {
  try {
    const body: InquiryBody = await request.json();
    const { name, phone, email, eventType } = body;

    if (!name || !phone || !email || !eventType) {
      return NextResponse.json(
        { error: "Required fields missing" },
        { status: 400 }
      );
    }

    // Fire both notifications in parallel — don't let one failure block the other
    await Promise.allSettled([sendEmail(body), sendWhatsApp(body)]);

    return NextResponse.json(
      { success: true, message: "Inquiry received. We will contact you within 24 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
