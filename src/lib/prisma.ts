import { PrismaClient } from '@/generated/prisma';

// Initialize Prisma Client instance
const prisma = new PrismaClient();

// Export the instance for use throughout the app
export { prisma };