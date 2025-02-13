import { NextResponse, NextRequest } from "next/server";
import connectToDb from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import User from "@/app/models/userModel";

connectToDb();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const { username, email, password } = reqBody;

    //find user
    const user = await User.findOne({ email });

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

    return NextResponse.json(
      { message: "User created successfully", success: true, saveUser },
      { status: 201 }
    );
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
