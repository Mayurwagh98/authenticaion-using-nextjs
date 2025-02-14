import { NextResponse, NextRequest } from "next/server";
import connectToDb from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import User from "@/app/models/userModel";
import sendEmail from "@/app/helpers/mailer";

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    //find user
    const user = await User.findOne({ email });
    console.log("user:", user);

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
    });

    const saveUser = await newUser.save();
    console.log("saveUser:", saveUser);

    //send verification email
    await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });

    return NextResponse.json(
      { message: "User created successfully", success: true, saveUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
