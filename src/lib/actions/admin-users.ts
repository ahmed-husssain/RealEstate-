'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import { requireSuperAdminRole, hashPassword } from '@/lib/auth/admin';
import { AdminRole } from '@prisma/client';
import { revalidatePath, updateTag } from 'next/cache';

const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.nativeEnum(AdminRole),
});

export async function getTeamUsersAction() {
  try {
    await requireSuperAdminRole();

    const users = await prisma.adminUser.findMany({
      orderBy: [{ role: 'asc' }, { createdAt: 'desc' }],
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isActive: true,
        lastLoginAt: true,
        createdAt: true,
      },
    });

    return { success: true, data: users };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to load team users' };
  }
}

export async function createTeamUserAction(data: {
  name: string;
  email: string;
  password: string;
  role: AdminRole;
}) {
  try {
    await requireSuperAdminRole();
    const validated = createUserSchema.parse(data);

    // Check duplicate email
    const existing = await prisma.adminUser.findUnique({
      where: { email: validated.email.toLowerCase().trim() },
    });

    if (existing) {
      return { success: false, error: 'An authorized user with this email already exists' };
    }

    const passwordHash = await hashPassword(validated.password);

    const newUser = await prisma.adminUser.create({
      data: {
        name: validated.name.trim(),
        email: validated.email.toLowerCase().trim(),
        passwordHash,
        role: validated.role,
        isActive: true,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });

    revalidatePath('/admin/users');
    revalidatePath('/admin');
    updateTag('admin-users');
    updateTag('admin-dashboard');

    return { success: true, user: newUser, message: `Account created for ${newUser.name}` };
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0]?.message || 'Validation failed' };
    }
    return { success: false, error: error.message || 'Failed to create user account' };
  }
}

export async function toggleUserActiveAction(userId: string) {
  try {
    const currentAdmin = await requireSuperAdminRole();

    if (currentAdmin.id === userId) {
      return { success: false, error: 'You cannot deactivate your own administrative account' };
    }

    const user = await prisma.adminUser.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    const updated = await prisma.adminUser.update({
      where: { id: userId },
      data: { isActive: !user.isActive },
    });

    revalidatePath('/admin/users');
    revalidatePath('/admin');
    updateTag('admin-users');
    updateTag('admin-dashboard');

    return {
      success: true,
      message: `User ${updated.name} has been ${updated.isActive ? 'activated' : 'suspended'}`,
    };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update user status' };
  }
}

export async function resetUserPasswordAction(userId: string, newPassword: string) {
  try {
    await requireSuperAdminRole();

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters' };
    }

    const passwordHash = await hashPassword(newPassword);

    await prisma.adminUser.update({
      where: { id: userId },
      data: { passwordHash },
    });

    revalidatePath('/admin/users');
    revalidatePath('/admin');
    updateTag('admin-users');

    return { success: true, message: 'User password reset successfully' };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to reset password' };
  }
}

export async function deleteTeamUserAction(userId: string) {
  try {
    const currentAdmin = await requireSuperAdminRole();

    if (currentAdmin.id === userId) {
      return { success: false, error: 'You cannot delete your own account' };
    }

    await prisma.adminUser.delete({
      where: { id: userId },
    });

    revalidatePath('/admin/users');
    revalidatePath('/admin');
    updateTag('admin-users');
    updateTag('admin-dashboard');

    return { success: true, message: 'User account deleted successfully' };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete user' };
  }
}
