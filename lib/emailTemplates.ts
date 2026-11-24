// HTML email templates for the contact form (sent through Brevo).
// Email clients ignore <style> blocks and CSS variables, so everything is
// table-based with inline styles. Colors match tailwind.config.ts.

const C = {
  paper: "#F3EFE7",
  paper2: "#E9E3D7",
  ink: "#121212",
  muted: "#6E6A62",
  accent: "#FF5A1F",
  white: "#FFFFFF",
};

const FONT = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const nl2br = (s: string) => esc(s).replace(/\r?\n/g, "<br>");

function layout(preheader: string, inner: string) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${esc(preheader)}</title>
</head>
<body style="margin:0;padding:0;background:${C.paper};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${C.paper};">
  <tr><td align="center" style="padding:32px 16px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;">
      <tr><td style="padding:0 4px 20px;font-family:${FONT};font-size:12px;letter-spacing:2.5px;text-transform:uppercase;color:${C.muted};">
        <span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${C.accent};margin-right:8px;"></span>Shubham Thakur
      </td></tr>
      <tr><td style="background:${C.white};border-radius:24px;padding:40px 36px;font-family:${FONT};color:${C.ink};">
        ${inner}
      </td></tr>
      <tr><td style="padding:20px 4px 0;font-family:${FONT};font-size:12px;line-height:1.6;color:${C.muted};">
        WordPress Backend Developer · Mandi, Himachal Pradesh, India
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`;
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:10px 0;border-bottom:1px solid ${C.paper2};font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};width:90px;vertical-align:top;">${label}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${C.paper2};font-size:15px;color:${C.ink};">${value}</td>
  </tr>`;
}

export type ContactData = { name: string; email: string; topic: string; message: string };

/** Sent to you: the new enquiry. Hitting "Reply" answers the visitor directly. */
export function ownerNotification({ name, email, topic, message }: ContactData) {
  const html = layout(
    `New ${topic} enquiry from ${name}`,
    `<p style="margin:0 0 8px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:${C.accent};font-weight:600;">New enquiry</p>
    <h1 style="margin:0 0 28px;font-family:${SERIF};font-weight:normal;font-size:30px;line-height:1.2;color:${C.ink};">${esc(name)} wants help with <em>${esc(topic)}</em></h1>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
      ${row("Name", esc(name))}
      ${row("Email", `<a href="mailto:${esc(email)}" style="color:${C.ink};">${esc(email)}</a>`)}
      ${row("Topic", esc(topic))}
    </table>
    <div style="background:${C.paper};border-radius:16px;padding:20px 22px;font-size:15px;line-height:1.7;color:${C.ink};">${nl2br(message)}</div>
    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-top:28px;"><tr>
      <td style="background:${C.ink};border-radius:999px;">
        <a href="mailto:${esc(email)}?subject=${encodeURIComponent(`Re: ${topic}`)}" style="display:inline-block;padding:14px 26px;font-size:14px;font-weight:600;color:${C.white};text-decoration:none;">Reply to ${esc(name.split(" ")[0])} →</a>
      </td>
    </tr></table>`
  );
  const text = `New enquiry from your portfolio\n\nName: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`;
  return { subject: `${topic} — new message from ${name}`, html, text };
}

/** Sent to the visitor: confirmation that the message arrived. */
export function visitorAutoReply({ name, topic, message }: ContactData, ownerEmail: string) {
  const first = name.split(" ")[0];
  const html = layout(
    `Thanks ${first} — I got your message`,
    `<h1 style="margin:0 0 20px;font-family:${SERIF};font-weight:normal;font-size:32px;line-height:1.2;color:${C.ink};">Thanks, ${esc(first)}. <em style="color:${C.accent};">Message received.</em></h1>
    <p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:${C.ink};">I've got your note about <strong>${esc(topic)}</strong> and will get back to you within one working day, usually sooner.</p>
    <p style="margin:0 0 28px;font-size:16px;line-height:1.7;color:${C.ink};">If it's urgent, for example a hacked site, just reply to this email and I'll prioritise it.</p>
    <p style="margin:0 0 8px;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:${C.muted};">Your message</p>
    <div style="background:${C.paper};border-radius:16px;padding:20px 22px;font-size:14px;line-height:1.7;color:${C.muted};">${nl2br(message)}</div>
    <p style="margin:28px 0 0;font-size:16px;line-height:1.7;color:${C.ink};">Talk soon,<br><span style="font-family:${SERIF};font-size:22px;">Shubham Thakur</span><br>
    <a href="mailto:${esc(ownerEmail)}" style="font-size:14px;color:${C.muted};">${esc(ownerEmail)}</a></p>`
  );
  const text = `Thanks, ${first}. Message received.\n\nI've got your note about ${topic} and will get back to you within one working day, usually sooner. If it's urgent, just reply to this email.\n\nYour message:\n${message}\n\nTalk soon,\nShubham Thakur\n${ownerEmail}`;
  return { subject: "Thanks — I got your message", html, text };
}
