import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import connectToDb from "@/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import jwt from "jsonwebtoken";

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { email, password } = reqBody;

    //find user
    const user = await User.findOne({ email });

    //validate user
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 400,
        }
      );
    }

    //validate password
    const validatePassword = await bcryptjs.compare(password, user.password);

    if (!validatePassword) {
      return NextResponse.json(
        { message: "Invalid password or email" },
        { status: 400 }
      );
    }

    //create token data
    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token);

    return response;
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
