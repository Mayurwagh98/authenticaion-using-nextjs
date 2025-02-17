import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    return decodedToken._id;
  } catch (error: any) {
    console.log("error:", error);
    throw new Error(error.message);
  }
};
