import { ID } from '/common/types';

export interface IActiveUserData {
  sub: ID;
  email: string;
  iat?: number;
  exp?: number;
}

export interface IRefreshTokenPayload extends IActiveUserData {
  refreshToken: string;
}
