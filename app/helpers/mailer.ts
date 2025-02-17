// Import required dependencies
import nodemailer from "nodemailer";
import User from "@/app/models/userModel";
import bcryptjs from "bcryptjs";

/**
 * Sends an email for email verification or password reset
 * @param email - Recipient's email address
 * @param emailType - Type of email ("VERIFY" or "RESET")
 * @param userId - User's ID in the database
 */

const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // Create a hashed token from the user ID for security
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    // Update user document based on email type
    if (emailType === "VERIFY") {
      // For email verification, set verify token and expiry (1 hour)
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        }
      );
    } else if (emailType === "RESET") {
      // For password reset, set forgot password token and expiry (1 hour)
      await User.findByIdAndUpdate(
        { _id: userId },
        {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 3600000,
        }
      );
    }

    // Configure email transport using Mailtrap for development
    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Configure email content and recipients
    const mailOptions = {
      from: "mayur@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
            or copy and paste the link below in your browser. <br> ${
              process.env.DOMAIN
            }/verifyemail?token=${hashedToken}
            </p>`,
    };

    // Send the email and return the response
    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export default sendEmail;
