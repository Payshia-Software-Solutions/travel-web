const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const mailOptions = {
  from: "yomaltheekshana00@gmail.com",
  to: "yomaltheekshana66@gmail.com",
  subject: "Test Email",
  html: `<h1>This is a test email</h1>`,
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error("Error sending test email:", err.message);
    console.error(err);
  } else {
    console.log("Test email sent:", info.response);
  }
});
