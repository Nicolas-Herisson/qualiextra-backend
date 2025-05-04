import type { JwtPayload } from 'jsonwebtoken';

export interface IUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  is_verified: boolean;
  verification_token: string | null;
  role: IRole;
  save(): Promise<void>;
}

export interface IRole {
  id: string;
  name: string;
}

export interface reqUser extends JwtPayload, IUser {}

declare global {
  namespace Express {
    interface Request {
      user?: reqUser;
    }
  }
}
