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

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD || !CONTACT_EMAIL_TO) {
    console.warn("[Email] Skipped: GMAIL_USER, GMAIL_APP_PASSWORD, or CONTACT_EMAIL_TO is not set");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `"QueueCap Contact Form" <${GMAIL_USER}>`,
    to: CONTACT_EMAIL_TO,
    replyTo: data.email,
    subject: `🎯 New Inquiry: ${data.eventType} — ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; color: #0f172a; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
        <div style="background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%); padding: 28px 32px;">
          <table style="border-collapse: collapse;">
            <tr>
              <td style="vertical-align: middle; padding-right: 12px;">
                <img src="https://queuecap.com/branding/queuecap-logo-email.png" alt="QueueCap" width="36" height="36" style="display: block; border-radius: 8px;" />
              </td>
              <td style="vertical-align: middle;">
                <h1 style="margin: 0; font-size: 22px; color: #fff; letter-spacing: 2px;">QueueCap</h1>
              </td>
            </tr>
          </table>
          <p style="margin: 8px 0 0; font-size: 13px; color: #fff; opacity: 0.85;">New Client Inquiry</p>
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
                <td style="padding: 10px 0; color: #2563EB; font-size: 12px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; width: 120px; vertical-align: top;">${label}</td>
                <td style="padding: 10px 0; color: #0f172a; font-size: 15px; vertical-align: top;">${value}</td>
              </tr>
              <tr><td colspan="2" style="border-bottom: 1px solid #e2e8f0;"></td></tr>
            `
              )
              .join("")}
          </table>

          ${
            data.message
              ? `
            <div style="margin-top: 20px; padding: 16px; background: #eff6ff; border-radius: 8px; border-left: 3px solid #2563EB;">
              <p style="margin: 0 0 8px; color: #2563EB; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase;">Message</p>
              <p style="margin: 0; color: #334155; font-size: 14px; line-height: 1.6;">${data.message}</p>
            </div>
          `
              : ""
          }

          <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
            <a href="mailto:${data.email}" style="display: inline-block; padding: 12px 28px; background: linear-gradient(135deg, #2563EB, #3B82F6); color: #fff; font-weight: bold; text-decoration: none; border-radius: 50px; font-size: 13px; letter-spacing: 1px; margin-right: 10px;">
              REPLY TO CLIENT
            </a>
            <a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="display: inline-block; padding: 12px 28px; background: #25D366; color: #fff; font-weight: bold; text-decoration: none; border-radius: 50px; font-size: 13px; letter-spacing: 1px;">
              WHATSAPP CLIENT
            </a>
          </div>
        </div>

        <div style="padding: 16px 32px; background: #f8fafc; text-align: center;">
          <p style="margin: 0; color: #64748b; font-size: 11px;">QueueCap — Received ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
        </div>
      </div>
    `,
  });

  console.log("[Email] Sent successfully");
}

async function sendWhatsApp(data: InquiryBody) {
  const { CALLMEBOT_PHONE, CALLMEBOT_APIKEY } = process.env;

  if (!CALLMEBOT_PHONE || !CALLMEBOT_APIKEY) {
    console.warn("[WhatsApp] Skipped: CALLMEBOT_PHONE or CALLMEBOT_APIKEY is not set");
    return;
  }

  const text = encodeURIComponent(
    `🎯 *New QueueCap Inquiry*\n\n` +
      `👤 *Name:* ${data.name}\n` +
      `📱 *Phone:* ${data.phone}\n` +
      `📧 *Email:* ${data.email}\n` +
      `🎪 *Event:* ${data.eventType}\n` +
      `💰 *Budget:* ${data.budget || "Not specified"}\n` +
      (data.message ? `\n💬 *Message:*\n${data.message}` : "")
  );

  const url = `https://api.callmebot.com/whatsapp.php?phone=${CALLMEBOT_PHONE}&text=${text}&apikey=${CALLMEBOT_APIKEY}`;
  console.log("[WhatsApp] Request URL:", url.replace(CALLMEBOT_APIKEY, "***"));

  const response = await fetch(url);
  const responseBody = await response.text();

  console.log("[WhatsApp] Response status:", response.status);
  console.log("[WhatsApp] Response body:", responseBody);

  // CallMeBot often returns HTTP 200 even when it fails (e.g. unregistered
  // phone, bad API key, rate limit) — the failure only shows up in the body text.
  if (!response.ok || /error/i.test(responseBody)) {
    throw new Error(`[WhatsApp] CallMeBot request failed (status ${response.status}): ${responseBody}`);
  }

  console.log("[WhatsApp] Message sent successfully");
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
    const [emailResult, whatsappResult] = await Promise.allSettled([
      sendEmail(body),
      sendWhatsApp(body),
    ]);

    if (emailResult.status === "rejected") {
      console.error("[Email] Failed to send:", emailResult.reason);
    }

    if (whatsappResult.status === "rejected") {
      console.error("[WhatsApp] Failed to send:", whatsappResult.reason);
    }

    return NextResponse.json(
      { success: true, message: "Inquiry received. We will contact you within 24 hours." },
      { status: 200 }
    );
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
