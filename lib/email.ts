import nodemailer from "nodemailer";
import type { InquiryInput } from "@/lib/validation";
import type { InquiryMeta } from "@/lib/googleSheets";

const LOGO_URL = "https://queuecap.com/branding/queuecap-logo-email.png";

let transporter: nodemailer.Transporter | null = null;

function getTransporter(): nodemailer.Transporter | null {
  if (transporter) return transporter;

  const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) return null;

  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
  return transporter;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fieldRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding: 14px 0; border-bottom: 1px solid #e2e8f0;">
        <div style="color: #2563EB; font-size: 11px; font-weight: bold; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 4px;">
          ${escapeHtml(label)}
        </div>
        <div style="color: #0f172a; font-size: 15px; line-height: 1.5; word-break: break-word;">
          ${escapeHtml(value)}
        </div>
      </td>
    </tr>`;
}

function buildHtml(data: InquiryInput, meta: InquiryMeta): string {
  const rows: [string, string][] = [
    ["Full Name", data.name],
    ["Phone Number", data.phone],
    ["Email Address", data.email],
    ["Event Type", data.eventType],
    ["Budget Range", data.budget || "Not specified"],
    ["Message", data.message || "—"],
    ["Submitted At", meta.submittedAt],
    ["Website", meta.website],
  ];

  if (meta.ip) rows.push(["IP Address", meta.ip]);
  if (meta.userAgent) rows.push(["User Agent", meta.userAgent]);

  return `
  <body style="margin: 0; padding: 0; background: #f1f5f9;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background: #f1f5f9; padding: 24px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; font-family: Arial, Helvetica, sans-serif;">
            <tr>
              <td style="background: linear-gradient(135deg, #2563EB 0%, #3B82F6 100%); padding: 28px 32px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align: middle; padding-right: 12px;">
                      <img src="${LOGO_URL}" alt="QueueCap" width="36" height="36" style="display: block; border-radius: 8px;" />
                    </td>
                    <td style="vertical-align: middle;">
                      <h1 style="margin: 0; font-size: 22px; color: #fff; letter-spacing: 2px;">QueueCap</h1>
                    </td>
                  </tr>
                </table>
                <p style="margin: 8px 0 0; font-size: 13px; color: #fff; opacity: 0.85;">New Website Inquiry</p>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 32px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rows.map(([label, value]) => fieldRow(label, value)).join("")}
                </table>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top: 28px;">
                  <tr>
                    <td align="center" style="padding-top: 4px;">
                      <a href="mailto:${encodeURIComponent(data.email)}" style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #2563EB, #3B82F6); color: #fff; font-weight: bold; text-decoration: none; border-radius: 50px; font-size: 13px; letter-spacing: 0.5px; margin: 4px;">
                        Reply to Client
                      </a>
                      <a href="https://wa.me/${data.phone.replace(/\D/g, "")}" style="display: inline-block; padding: 12px 24px; background: #25D366; color: #fff; font-weight: bold; text-decoration: none; border-radius: 50px; font-size: 13px; letter-spacing: 0.5px; margin: 4px;">
                        WhatsApp Client
                      </a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding: 16px 32px; background: #f8fafc; text-align: center;">
                <p style="margin: 0; color: #64748b; font-size: 11px;">QueueCap &mdash; ${escapeHtml(meta.website)}</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>`;
}

/**
 * Sends the admin notification email for a new inquiry. Throws on failure —
 * callers should treat this as best-effort and not block the user-facing
 * response on it (Google Sheets is the source of truth).
 */
export async function sendInquiryEmail(
  data: InquiryInput,
  meta: InquiryMeta
): Promise<void> {
  const t = getTransporter();
  const { CONTACT_EMAIL_TO, GMAIL_USER } = process.env;

  if (!t || !CONTACT_EMAIL_TO) {
    throw new Error(
      "Email is not configured (missing GMAIL_USER, GMAIL_APP_PASSWORD, or CONTACT_EMAIL_TO)"
    );
  }

  await t.sendMail({
    from: `"QueueCap Inquiries" <${GMAIL_USER}>`,
    to: CONTACT_EMAIL_TO,
    replyTo: data.email,
    subject: `New QueueCap Inquiry - ${data.name}`,
    html: buildHtml(data, meta),
  });
}
