export type JwtPayload = {
  id: string;
  email: string;
};

export type JwtRefreshPayload = JwtPayload & {
  refreshToken: string;
};
