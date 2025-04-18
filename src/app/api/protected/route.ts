import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(req: Request) {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    console.log(decoded); 

    if (decoded.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden, not an admin' }, { status: 403 });
    }

    return NextResponse.json({ message: 'You are an admin, welcome!' });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 });
  }
} 
