import { Permission, PrismaClient, Role, Prisma, User } from '@prisma/client';

export const roles: Role[] = [
  {
    id: 1,
    name: 'Admin',
  },
  {
    id: 2,
    name: 'User',
  },
];

export const permissions = [
  {
    id: 1,
    roleId: 1,
    action: 'manage',
    subject: 'all',
  },
  {
    id: 2,
    roleId: 2,
    action: 'read',
    subject: 'Story',
  },
  {
    id: 3,
    roleId: 2,
    action: 'manage',
    subject: 'Story',
    conditions: { created_by: '{{ id }}' },
  },
];

export const users = [
  {
    id: 1,
    roleId: 1,
    email: 'billy@yopmail.com',
    username: 'billydavid',
    password: 'password',
  },
  {
    id: 2,
    username: 'bennisondevadoss',
    roleId: 2,
    email: 'bennison@yopmail.com',
    password: 'password',
  },
];

const prisma = new PrismaClient();

async function main() {
  for await (const { id, ...roleAttrs } of roles) {
    await prisma.role.upsert({
      where: { id },
      create: roleAttrs,
      update: roleAttrs,
    });
  }

  for await (const { id, ...permissionAttrs } of permissions) {
    await prisma.permission.upsert({
      where: { id },
      create: permissionAttrs,
      update: permissionAttrs,
    });
  }

  for await (const { id, ...userAttrs } of users) {
    await prisma.user.upsert({
      where: { id },
      create: userAttrs,
      update: userAttrs,
    });
  }
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
  });
