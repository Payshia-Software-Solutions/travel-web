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
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS, // Your app password
  },
});



app.post("/api/bookings", async (req, res) => {
    const bookingData = req.body;
  
    try {
      console.log("Booking data received in API:", bookingData); // Log data received from frontend
  
      // Send email notification
      await sendBookingEmail(bookingData);
      console.log("Booking email sent successfully!"); // Verify if this gets logged
  
      res.status(201).json({ message: "Booking created and email sent!" });
    } catch (error) {
      console.error("Error in booking API:", error.message); // Log backend error details
      res.status(500).json({ message: "Failed to create booking." });
    }
  });
  

// Function to send booking email
const sendBookingEmail = async (bookingData) => {
    console.log("Booking data received in sendBookingEmail:", bookingData); // Log the booking data
  
    const { name, email, mobile, destination, arrivalDate, departureDate, packageType } = bookingData;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "yomaltheekshana66@gmail.com",
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
      const result = await transporter.sendMail(mailOptions);
      console.log("Booking email result:", result); // Log success details
    } catch (error) {
      console.error("Error sending booking email:", error.message); // Log error details
      throw error; // Rethrow the error to the caller
    }
  };
  
// Booking API endpoint
app.post("/api/bookings", async (req, res) => {
    const bookingData = req.body;
  
    try {
      console.log("Booking data received in API:", bookingData); // Log data received from frontend
  
      // Send email notification
      await sendBookingEmail(bookingData);
      console.log("Booking email sent successfully!"); // Verify if this gets logged
  
      res.status(201).json({ message: "Booking created and email sent!" });
    } catch (error) {
      console.error("Error in booking API:", error.message); // Log backend error details
      res.status(500).json({ message: "Failed to create booking." });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
