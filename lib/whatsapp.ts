import type { InquiryInput } from "@/lib/validation";

/**
 * Best-effort WhatsApp notification via CallMeBot. Not part of the
 * inquiry's durability guarantee — failures here are logged, never
 * surfaced to the visitor.
 */
export async function sendWhatsAppNotification(data: InquiryInput): Promise<void> {
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

  const response = await fetch(url);
  const responseBody = await response.text();

  // CallMeBot often returns HTTP 200 even when it fails (e.g. unregistered
  // phone, bad API key, rate limit) — the failure only shows up in the body text.
  if (!response.ok || /error/i.test(responseBody)) {
    throw new Error(`CallMeBot request failed (status ${response.status}): ${responseBody}`);
  }
}
