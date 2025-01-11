import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.$connect();
    console.log('Database connected successfully!');

    const hashedPassword = await bcrypt.hash('admin@1234', 10);

    const admin = await prisma.admin.upsert({
      where: { email: 'admin@tottem.com' },
      update: {}, // No-op if the record already exists
      create: {
        name: 'Admin',
        email: 'admin@tottem.com',
        password: hashedPassword,
      },
    });

    console.log('Admin seeded:', admin);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });