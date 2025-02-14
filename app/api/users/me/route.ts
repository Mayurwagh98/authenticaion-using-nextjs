import { getDataFromToken } from "@/app/helpers/getDataFromToken";
import { NextResponse, NextRequest } from "next/server";
import User from "@/app/models/userModel";
import connectToDb from "@/dbConfig/dbConfig";

connectToDb();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    console.log("userId:", userId);

    const user = await User.findOne({ _id: userId }).select(
      "-password -username -isAdmin -isVerified"
    );

    return NextResponse.json({ message: "User found", data: user });
  } catch (error: any) {
    console.log("error:", error);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
