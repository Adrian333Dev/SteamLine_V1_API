import { prismaExclude } from '../crap-prisma/exclude';
import { Prisma, User } from '@prisma/client';

type UserKey = keyof User;
type SelectedUserKey = keyof Omit<User, 'password' | 'refreshToken'>;
type UnselectedUserKey = keyof Pick<User, 'password' | 'refreshToken'>;

// export const selectUser = (options?: {
//   include?: UnselectedUserKey[];
//   exclude?: SelectedUserKey[];
// }): Prisma.UserSelect => {
//   const defaultExclude: UnselectedUserKey[] = ['password', 'refreshToken'];
//   const exclude: UserKey[] = options?.exclude ?? [];
//   for (const key of defaultExclude)
//     !options?.include?.includes(key) && exclude.push(key);
//   return prismaExclude('User', exclude);
// };

export const selectUser = prismaExclude('User', ['password', 'refreshToken']);
