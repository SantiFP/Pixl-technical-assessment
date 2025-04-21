
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Handle POST requests to /api/auth/login
export async function POST(request: Request) {

  // Parse JSON body to extract email and password
  const { email, password } = await request.json();

   // Validate required fields
  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
     // Find user by email in the database
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Compare provided password with hashed password in DB
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

     // Generate JWT token with user info
    const token = jwt.sign(
      { userId: user.id, email: user.email, role:user.role },
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' }
    );

     // Return the token to the client
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
