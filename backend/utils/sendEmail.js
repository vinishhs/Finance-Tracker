const nodemailer = require('nodemailer');

// Configure transporter (Gmail example)
const transporter = nodemailer.createTransport({
  service: 'Gmail', // or another SMTP service
  auth: {
    user: process.env.EMAIL_USER, // your email
    pass: process.env.EMAIL_PASS, // app password or email password
  },
});

// Function to send email
async function sendEmail(to, subject, text) {
  try {
    await transporter.sendMail({
      from: `"Finance Tracker" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Email sending failed');
  }
}

module.exports = sendEmail;
