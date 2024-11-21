const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(bodyParser.json());

// Configure the Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Enable debug mode
  logger: true, // Enable detailed logs
});
// Function to send booking email
const sendBookingEmail = async (bookingData) => {
  const { name, email, mobile, destination, arrivalDate, departureDate, packageType } = bookingData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "yomaltheekshana66@gmail.com", // Replace with company owner's email
    subject: "New Booking Received",
    html: `
      <h1>New Booking Details</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Destination:</strong> ${destination}</p>
      <p><strong>Arrival Date:</strong> ${arrivalDate}</p>
      <p><strong>Departure Date:</strong> ${departureDate}</p>
      <p><strong>Package Type:</strong> ${packageType}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Booking email sent successfully!");
  } catch (error) {
    console.error("Error sending booking email:", error);
    throw error;
  }
};

// Booking API endpoint
app.post("/api/bookings", async (req, res) => {
  const bookingData = req.body;

  try {
    console.log("Booking data received:", bookingData); // Verify data is received

    // Send email notification
    await sendBookingEmail(bookingData);

    console.log("Email sent successfully"); // Check if this gets logged
    res.status(201).json({ message: "Booking created and email sent!" });
  } catch (error) {
    console.error("Error creating booking:", error); // Log any errors
    res.status(500).json({ message: "Failed to create booking." });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
