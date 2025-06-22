import nodemailer from 'nodemailer';

interface EmailParams {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmailViaGmail(params: EmailParams): Promise<boolean> {
  try {
    // Create transporter using explicit Gmail SMTP settings
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Send email
    await transporter.sendMail({
      from: params.from || process.env.GMAIL_USER,
      to: params.to,
      subject: params.subject,
      text: params.text,
      html: params.html
    });

    console.log('Gmail email sent successfully');
    return true;
  } catch (error) {
    console.error('Gmail email error:', error);
    return false;
  }
}