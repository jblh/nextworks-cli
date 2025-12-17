import nodemailer from "nodemailer";
import { sendSmtpEmail } from "@/lib/email/provider-smtp";

let cachedTransport: nodemailer.Transporter | null = null;

async function getDevTransport() {
  if (cachedTransport) return cachedTransport;
  const testAccount = await nodemailer.createTestAccount();
  const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: { user: testAccount.user, pass: testAccount.pass },
  });
  cachedTransport = transport;
  return transport;
}

export async function sendDevEmail(opts: {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}) {
  const smtpConfigured = !!(
    process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS
  );
  if (smtpConfigured && process.env.NODE_ENV === "production") {
    return sendSmtpEmail(opts).then((r) => ({ info: r.info, previewUrl: undefined }));
  }

  const transport = await getDevTransport();
  const info = await transport.sendMail({
    from: opts.from ?? `Nextworks <${process.env.NOREPLY_EMAIL ?? "no-reply@example.com"}>`,
    to: opts.to,
    subject: opts.subject,
    text: opts.text,
    html: opts.html,
  });
  const previewUrl = nodemailer.getTestMessageUrl(info) || undefined;
  return { info, previewUrl };
}
