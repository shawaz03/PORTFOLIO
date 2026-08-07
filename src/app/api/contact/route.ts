import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, services, serviceNames, budget, timeline, message, transmissionCode } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and Email are required." }, { status: 400 });
    }

    const gmailUser = process.env.GMAIL_USER || "shawazstar@gmail.com";
    const gmailPass = process.env.GMAIL_APP_PASSWORD;

    if (!gmailPass) {
      console.error("GMAIL_APP_PASSWORD environment variable is not configured.");
      return NextResponse.json({ error: "Email service credentials not configured." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailUser,
        pass: gmailPass,
      },
    });

    const budgetRange = `₹${budget}K - ₹${Number(budget) + 5}K INR`;
    const timelineLabel =
      timeline === "fast"
        ? "URGENT (< 1 Mo)"
        : timeline === "normal"
        ? "STANDARD (1-3 Mo)"
        : "FLEXIBLE (3+ Mo)";

    // 1. Send Notification Email to Shawaz
    const adminMailOptions = {
      from: `"Shawaz Portfolio Uplink" <${gmailUser}>`,
      to: gmailUser,
      replyTo: email,
      subject: `🚀 New Project Inquiry from ${name} [${transmissionCode}]`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #05040d; color: #ffffff; padding: 30px; border-radius: 12px;">
          <h2 style="color: #3FE0C5; border-bottom: 2px solid #3FE0C5; padding-bottom: 10px;">⚡ NEW COLLABORATION UPLINK RECEIPT</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 15px; color: #e2e8f0;">
            <tr>
              <td style="padding: 10px; font-weight: bold; width: 180px; color: #94a3b8;">Transmission ID:</td>
              <td style="padding: 10px; color: #3FE0C5; font-weight: bold;">${transmissionCode}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #94a3b8;">Sender Name:</td>
              <td style="padding: 10px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #94a3b8;">Sender Email:</td>
              <td style="padding: 10px;"><a href="mailto:${email}" style="color: #6E5CFF;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #94a3b8;">Selected Services:</td>
              <td style="padding: 10px; color: #3FE0C5;">${serviceNames || services || "N/A"}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #94a3b8;">Est. Budget:</td>
              <td style="padding: 10px; color: #6E5CFF; font-weight: bold;">${budgetRange}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #94a3b8;">Timeline Priority:</td>
              <td style="padding: 10px; color: #FF7A45; font-weight: bold;">${timelineLabel}</td>
            </tr>
            <tr>
              <td style="padding: 10px; font-weight: bold; color: #94a3b8;">Custom Message:</td>
              <td style="padding: 10px; background-color: #0e0c1f; border-radius: 8px; font-style: italic;">${message || "No message provided."}</td>
            </tr>
          </table>
        </div>
      `,
    };

    // 2. Send Auto-Reply Confirmation Email to the Visitor
    const clientMailOptions = {
      from: `"Shawaz J." <${gmailUser}>`,
      to: email,
      subject: `⚡ Confirmation: Collaboration Uplink Received [${transmissionCode}]`,
      html: `
        <div style="font-family: Arial, sans-serif; background-color: #05040d; color: #ffffff; padding: 32px; border-radius: 16px; border: 1px solid #3FE0C5; max-width: 600px; margin: auto;">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #3FE0C5; font-size: 24px; margin: 0; letter-spacing: 1px;">TRANSMISSION RECEIVED</h1>
            <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">UPLINK PASS ID: <strong style="color: #ffffff;">${transmissionCode}</strong></p>
          </div>

          <p style="font-size: 16px; color: #f8fafc; line-height: 1.6;">
            Greetings <strong>${name}</strong>! 🚀
          </p>
          
          <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
            Thank you for reaching out through my portfolio collaboration portal. Your project inquiry has been successfully transmitted and logged into my system.
          </p>

          <div style="background-color: #0e0c1f; border: 1px solid rgba(110, 92, 255, 0.4); padding: 20px; border-radius: 12px; margin: 24px 0;">
            <h3 style="color: #6E5CFF; margin-top: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">PROJECT SPECIFICATION SUMMARY</h3>
            <ul style="list-style: none; padding: 0; margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.8;">
              <li><strong>Intent Vectors:</strong> <span style="color: #3FE0C5;">${serviceNames || "Custom Scope"}</span></li>
              <li><strong>Est. Budget Range:</strong> <span style="color: #6E5CFF;">${budgetRange}</span></li>
              <li><strong>Deployment Priority:</strong> <span style="color: #FF7A45;">${timelineLabel}</span></li>
            </ul>
          </div>

          <p style="font-size: 15px; color: #cbd5e1; line-height: 1.6;">
            I am currently reviewing your requirements and will get back to you via email shortly to discuss next steps.
          </p>

          <div style="margin-top: 32px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 20px; font-size: 14px; color: #94a3b8;">
            <p style="margin: 0; color: #ffffff; font-weight: bold;">Shawaz J.</p>
            <p style="margin: 4px 0 0 0; font-size: 12px;">Full-Stack & AI Solutions Specialist</p>
            <p style="margin: 4px 0 0 0; font-size: 12px;"><a href="mailto:shawazstar@gmail.com" style="color: #3FE0C5; text-decoration: none;">shawazstar@gmail.com</a></p>
          </div>
        </div>
      `,
    };

    // Dispatch both emails in parallel
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions),
    ]);

    return NextResponse.json({ success: true, message: "Emails sent successfully!" });
  } catch (error: any) {
    console.error("Nodemailer dispatch error:", error);
    return NextResponse.json(
      { error: "Failed to send email", details: error?.message || error },
      { status: 500 }
    );
  }
}
