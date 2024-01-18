import { ID } from '/common/types';

export interface IJwtPayload {
  sub: ID;
  username: string;
  iat?: number;
  exp?: number;
}

export interface IAccessTokenPayload extends IJwtPayload {}
