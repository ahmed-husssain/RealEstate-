import { PrismaClient, AdminRole } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🔒 Initializing Super Admin Account for Amber Property Corner...');

  const existingAdmin = await prisma.adminUser.findUnique({
    where: { email: 'admin@amberproperty.com' },
  });

  if (existingAdmin) {
    console.log('ℹ️ Super Admin account already exists (admin@amberproperty.com).');
    return;
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash('AmberProperty2026!', salt);

  const admin = await prisma.adminUser.create({
    data: {
      email: 'admin@amberproperty.com',
      name: 'Managing Director | Amber Property',
      passwordHash,
      role: AdminRole.ADMIN,
      isActive: true,
    },
  });

  console.log('✅ Created Super Admin Account:');
  console.log(`   Email: ${admin.email}`);
  console.log(`   Role: ${admin.role}`);
  console.log('   Password: AmberProperty2026!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding admin user:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
