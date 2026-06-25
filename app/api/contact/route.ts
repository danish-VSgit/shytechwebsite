import { NextRequest, NextResponse } from "next/server";
import { validateInquiry, sanitizeInquiry, type InquiryInput } from "@/lib/validation";
import { saveInquiryToSheet, type InquiryMeta } from "@/lib/googleSheets";
import { sendInquiryEmail } from "@/lib/email";
import { sendWhatsAppNotification } from "@/lib/whatsapp";

export async function POST(request: NextRequest) {
  let body: Partial<InquiryInput>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { valid, errors } = validateInquiry(body);
  if (!valid) {
    return NextResponse.json(
      { error: "Please correct the highlighted fields.", fieldErrors: errors },
      { status: 400 }
    );
  }

  const data = sanitizeInquiry(body as InquiryInput);

  const meta: InquiryMeta = {
    submittedAt:
      new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
      }) + " IST",
    website: process.env.NEXT_PUBLIC_SITE_URL || "https://queuecap.com",
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined,
    userAgent: request.headers.get("user-agent") || undefined,
  };

  // Google Sheets is the source of truth for inquiries — a failure here
  // must be surfaced so the visitor knows to retry, rather than silently
  // losing the lead.
  try {
    await saveInquiryToSheet(data, meta);
  } catch (err) {
    console.error("[Contact] Google Sheets save failed:", err);
    return NextResponse.json(
      {
        error:
          "We couldn't save your inquiry right now. Please try again in a moment, or reach us directly on WhatsApp.",
      },
      { status: 502 }
    );
  }

  // Email and WhatsApp are best-effort notifications. The inquiry is
  // already durably saved, so their failure must not fail the request —
  // just log it for follow-up.
  const [emailResult, whatsappResult] = await Promise.allSettled([
    sendInquiryEmail(data, meta),
    sendWhatsAppNotification(data),
  ]);

  if (emailResult.status === "rejected") {
    console.error("[Contact] Email notification failed:", emailResult.reason);
  }
  if (whatsappResult.status === "rejected") {
    console.error("[Contact] WhatsApp notification failed:", whatsappResult.reason);
  }

  return NextResponse.json(
    {
      success: true,
      message:
        "Thank you! Your inquiry has been received. Our team will get back to you within 24 hours.",
    },
    { status: 200 }
  );
}
