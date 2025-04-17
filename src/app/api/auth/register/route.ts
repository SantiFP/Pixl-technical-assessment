// src/app/api/auth/register/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ajusta la ruta según tu estructura
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { email, password } = await request.json();

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
  }

  try {
    // Verificar si el usuario ya existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario en la base de datos
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // Crear el JWT
    const token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.JWT_SECRET as string, // Asegúrate de tener esto en tu .env
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
