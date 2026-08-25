import { PrismaClient, AdminRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_INITIAL_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_INITIAL_PASSWORD;
  const name = process.env.ADMIN_INITIAL_NAME?.trim() || 'Managing Director | Amber Property Corner';

  if (!email || !password) {
    throw new Error(
      'Missing required environment variables: ADMIN_INITIAL_EMAIL and ADMIN_INITIAL_PASSWORD must be configured before running seed-admin.'
    );
  }

  if (password.length < 6) {
    throw new Error('ADMIN_INITIAL_PASSWORD must be at least 6 characters in length.');
  }

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email },
  });

  if (existingAdmin) {
    console.log('ℹ️ Admin account already exists for the specified email. Existing credentials left unchanged.');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  await prisma.adminUser.create({
    data: {
      email,
      name,
      passwordHash,
      role: AdminRole.ADMIN,
      isActive: true,
    },
  });

  console.log('✅ Admin seed completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Error during admin initialization:', e.message || e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
