import { Prisma } from '@prisma/client';

export interface IListUserParams {
  skip?: number;
  take?: number;
  cursor?: Prisma.UserWhereUniqueInput;
  where?: Prisma.UserWhereInput;
  orderBy?: Prisma.UserOrderByWithRelationInput;
}

export interface IGetUserParams {
  where: Prisma.UserWhereUniqueInput;
}

export interface ICreateUserParams {
  data: Prisma.UserCreateInput;
}

export interface IUpdateUserParams {
  where: Prisma.UserWhereUniqueInput;
  data: Prisma.UserUpdateInput;
}

export interface IDeleteUserParams {
  where: Prisma.UserWhereUniqueInput;
}
