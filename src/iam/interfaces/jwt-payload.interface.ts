export interface IActiveUserData {
  sub: string;
  email: string;
  iat?: number;
  exp?: number;
}

export interface IRefreshTokenPayload extends IActiveUserData {
  refreshToken: string;
}
