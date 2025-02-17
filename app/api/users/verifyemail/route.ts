// Import required models and configurations
import User from "@/app/models/userModel";
import connectToDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

// Initialize database connection
connectToDb();

/**
 * POST endpoint to verify user email
 * @param request - NextRequest object containing the verification token
 * @returns NextResponse with success/error message
 */

export async function POST(request: NextRequest) {
  try {
    // Extract token from request body
    const reqBody = await request.json();
    const { token } = reqBody;

    // Find user with valid token and non-expired token
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }, // Check if token hasn't expired
    });

    // Return error if user not found or token invalid
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Update user verification status
    user.isVerified = true;
    // Clear verification token and expiry
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    // Save updated user information
    await user.save();

    // Return success response
    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    // Handle any errors during verification process
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
