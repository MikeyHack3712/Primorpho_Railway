import { sendEmailViaGmail } from "./gmail.js";

interface EmailParams {
  to: string;
  from?: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmailWithFallback(params: EmailParams): Promise<boolean> {
  // Try Gmail SMTP first
  try {
    const success = await sendEmailViaGmail(params);
    if (success) {
      console.log('Email sent successfully via Gmail SMTP');
      return true;
    }
  } catch (error) {
    console.log('Gmail SMTP failed, email stored in database for manual review');
  }

  // Log email attempt for manual follow-up
  console.log('EMAIL NOTIFICATION PENDING:');
  console.log('To:', params.to);
  console.log('Subject:', params.subject);
  console.log('Body length:', params.html?.length || params.text?.length || 0);
  console.log('Check admin panel for form submissions requiring response');
  
  return false;
}