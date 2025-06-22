import nodemailer from 'nodemailer';

async function testGmailConnection() {
  console.log('Testing Gmail SMTP connection...');
  console.log('GMAIL_USER exists:', !!process.env.GMAIL_USER);
  console.log('GMAIL_APP_PASSWORD exists:', !!process.env.GMAIL_APP_PASSWORD);
  
  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
    console.log('❌ Missing Gmail credentials');
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Test connection
    console.log('Testing connection...');
    await transporter.verify();
    console.log('✅ Gmail SMTP connection successful!');

    // Test sending email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      subject: 'Primorpho Test Email',
      html: '<h1>Gmail SMTP Test Successful!</h1><p>Your email notifications are working correctly.</p>'
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    
  } catch (error) {
    console.log('❌ Gmail SMTP Error:', error.message);
    
    if (error.code === 'EAUTH') {
      console.log('\n🔧 Authentication Fix Required:');
      console.log('1. Ensure 2-Factor Authentication is enabled on Gmail');
      console.log('2. Generate new App Password: https://myaccount.google.com/apppasswords');
      console.log('3. Use exact 16-character password (no spaces)');
      console.log('4. Verify Gmail address is correct');
    }
  }
}

testGmailConnection();