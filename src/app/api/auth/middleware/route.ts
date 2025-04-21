import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

// Handle GET request to verify the JWT and return the user's role
export async function GET(req: Request) {
  // Extract token from the Authorization header
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");

  // Return 401 if token is missing
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify the token using the secret
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    // Respond with the user's role if the token is valid
    return NextResponse.json({ role: decoded.role }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
