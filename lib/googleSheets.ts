import type { InquiryInput } from "@/lib/validation";

export interface InquiryMeta {
  submittedAt: string;
  website: string;
  ip?: string;
  userAgent?: string;
}

const REQUEST_TIMEOUT_MS = 10_000;

/**
 * Persists an inquiry to Google Sheets via a Google Apps Script Web App.
 * This is the source-of-truth write — a failure here must surface to the
 * caller so the inquiry isn't silently lost (see google-apps-script/Code.gs).
 */
export async function saveInquiryToSheet(
  data: InquiryInput,
  meta: InquiryMeta
): Promise<void> {
  const { GOOGLE_SHEETS_WEBHOOK_URL, GOOGLE_SHEETS_SECRET } = process.env;

  if (!GOOGLE_SHEETS_WEBHOOK_URL) {
    throw new Error(
      "Google Sheets webhook is not configured (missing GOOGLE_SHEETS_WEBHOOK_URL)"
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(GOOGLE_SHEETS_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret: GOOGLE_SHEETS_SECRET,
        timestamp: meta.submittedAt,
        fullName: data.name,
        phone: data.phone,
        email: data.email,
        eventType: data.eventType,
        budget: data.budget || "",
        message: data.message || "",
        status: "New",
        source: "Website",
      }),
      signal: controller.signal,
    });
  } catch (err) {
    throw new Error(
      `Failed to reach Google Sheets webhook: ${(err as Error).message}`
    );
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    throw new Error(`Google Sheets webhook responded with status ${response.status}`);
  }

  const result = await response.json().catch(() => null);
  if (!result || result.status !== "success") {
    throw new Error(
      `Google Sheets webhook did not confirm success: ${JSON.stringify(result)}`
    );
  }
}
