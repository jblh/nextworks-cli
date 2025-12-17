import { sendDevEmail } from "@/lib/email/dev-transport";
import { sendSmtpEmail } from "@/lib/email/provider-smtp";

export async function sendEmail(opts: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}) {
  const smtpConfigured = !!(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  );
  if (smtpConfigured) {
    return sendSmtpEmail(opts);
  }
  if (process.env.NEXTWORKS_USE_DEV_EMAIL === "1") {
    return sendDevEmail(opts);
  }
  throw new Error("No email transport configured");
}

export function isEmailProviderConfigured() {
  return !!(
    (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) ||
    process.env.MAILER_API_KEY
  );
}
