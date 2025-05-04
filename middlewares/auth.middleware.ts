import dotenv from 'dotenv';
import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import type { reqUser } from '../@Types/types.ts';
dotenv.config();

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // Récupération du token utilisateur
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: 'Access denied: Login required' });
    return;
  }
  // Extraction du token
  const token = authHeader.split(' ')[1];

  try {
    // Vérification de la variable d'environnement (typescript)
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    // Vérification du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as reqUser;

    // Récupération de l'utilisateur
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof Error) {
      console.error('User error: ', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
