import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { IUser } from '../@Types/types.ts';
import { Role, User } from '../models/associations.ts';
dotenv.config();

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    // Récupération du token utilisateur
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'Access denied: Login required' });
      return;
    }

    // Extraction du token
    const token = authHeader.split(' ')[1];

    // Vérification de la variable d'environnement (typescript)
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Vérification du type du token
    if (typeof decoded !== 'object' || !decoded.id) {
      res.status(401).json({ message: 'Invalid token' });
      return;
    }

    // Récupération de l'utilisateur
    const user = (await User.findByPk(decoded.id, {
      include: {
        model: Role,
        as: 'role',
      },
    })) as unknown as IUser;

    if (!user || user.role.name !== 'admin') {
      res.status(403).json({ message: 'Access denied. Admins only.' });
      return;
    }

    // Récupération de l'utilisateur
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error('User error: ', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
