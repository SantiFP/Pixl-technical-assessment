
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Verifica la contraseña
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    // Crear el JWT
    const token = jwt.sign(
      { userId: user.id, email: user.email, role:user.role },
      process.env.JWT_SECRET as string, 
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
