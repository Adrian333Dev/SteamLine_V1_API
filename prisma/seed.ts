import { cloneDeep } from 'lodash';
import { genSalt, hash } from 'bcrypt';
import { Permission, Prisma, PrismaClient, Role, User } from '@prisma/client';
import { UserRole } from '/user/enums';

export const baseRoles: Role[] = [
  { id: 1, name: UserRole.ADMIN },
  { id: 2, name: UserRole.MEMBER },
];

export const basePermissions = [
  { id: 1, roleId: 1, action: 'manage', subject: 'all' },
  { id: 2, roleId: 2, action: 'read', subject: 'all' },
  {
    id: 3,
    roleId: 2,
    action: 'manage',
    subject: 'Story',
    conditions: { authorId: { equals: '{{ id }}' } },
  },
];

export const mockUsers = [
  {
    id: 1,
    firstName: 'Billian',
    lastName: 'David',
    roleId: 1,
    username: 'billy123',
    email: 'billy@yopmail.com',
    password: 'Qwerty@123',
  },
  {
    id: 2,
    firstName: 'Bennison',
    lastName: 'Devadoss',
    roleId: 2,
    username: 'bennison123',
    email: 'bennison@yopmail.com',
    password: 'Qwerty@123',
  },
];

const prisma = new PrismaClient();

async function main() {
  for await (const role of baseRoles) {
    const roleAttrs = cloneDeep(role);
    delete roleAttrs.id;
    await prisma.role.upsert({
      where: {
        id: role.id,
      },
      create: roleAttrs,
      update: roleAttrs,
    });
  }

  for await (const permission of basePermissions) {
    const permissionAttrs = cloneDeep(permission);
    delete permissionAttrs.id;
    await prisma.permission.upsert({
      where: {
        id: permission.id,
      },
      create: permissionAttrs,
      update: permissionAttrs,
    });
  }

  for await (const user of mockUsers) {
    const userAttrs = cloneDeep(user);
    delete userAttrs.id;
    userAttrs.password = await hash(user.password, await genSalt());
    await prisma.user.upsert({
      where: {
        id: user.id,
      },
      create: userAttrs,
      update: userAttrs,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
  });
