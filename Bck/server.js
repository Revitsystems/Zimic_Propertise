import "dotenv/config"; // Load environment variables
import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email Route
app.post("/send-email", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  try {
    // Configure Nodemailer with the company's Gmail account
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Company's Gmail
        pass: process.env.EMAIL_PASS, // App Password
      },
    });

    // Email Content
    const mailOptions = {
      from: email, // Customer's email address (not the company's)
      to: "zimicproperties@gmail.com", // Company's email address
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    };
    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email." });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
