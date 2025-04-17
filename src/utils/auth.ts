import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Función para encriptar contraseñas
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Función para verificar las contraseñas
export const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

// Configuración para JWT
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';  // Cambia esto por una clave secreta más segura

// Función para generar el token JWT
export const generateToken = (userId: number) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};
