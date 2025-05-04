import type { NextFunction, Request, Response } from 'express';

export const sanitizer = (req: Request, res: Response, next: NextFunction) => {
  const { firstname, lastname, email, password } = req.body;

  if (typeof firstname === 'string') {
    // Suppression des caractères spéciaux et des espaces en début et fin de chaîne
    req.body.firstname.replace(/[@<>]/g, '').trim();
  }

  if (typeof lastname === 'string') {
    req.body.lastname.replace(/[@<>]/g, '').trim();
  }

  if (typeof email === 'string') {
    req.body.email.replace(/[<>]/g, '').trim();
  }

  if (typeof password === 'string') {
    // Suppression des espaces et des caractères spéciaux (\t \n \r \f etc.)
    req.body.password.replace(/\s+/g, '').trim();
  }

  next();
};
