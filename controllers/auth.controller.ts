import crypto from 'node:crypto';
import argon2 from 'argon2';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import z from 'zod';
import type { IUser } from '../@Types/types.ts';
import { User } from '../models/associations.ts';
import { sendVerificationEmail } from '../services/nodemailer.ts';
import emailSchema from '../utils/emailValidator.ts';
import passwordSchema from '../utils/passwordValidator.ts';
dotenv.config();

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: 'Missing email or password' });
    return;
  }

  try {
    const user = (await User.findOne({
      where: { email },
      include: 'role',
    })) as unknown as IUser;

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    // Vérifier si le mot de passe est valide
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }
    // Vérifier si l'utilisateur à cliqué sur le lien de vérification
    if (!user.is_verified) {
      res.status(400).json({ message: 'User not verified' });
      return;
    }
    // Vérification de la variable d'environnement (typescript)
    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: 'Internal server error' });
      return;
    }
    // Génération d'un token
    const token = jwt.sign(
      { id: user.id, role: user.role.name },
      process.env.JWT_SECRET,
      { expiresIn: '4h' },
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!firstname || !lastname || !email || !password) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Vérification des conditions minimales requises pour le mot de passe
    passwordSchema.parse(password);

    // Vérification du format de l'email et de sa validité
    const emailParsed = emailSchema.safeParse(email);

    if (!emailParsed.success) {
      res.status(400).json({ message: 'Invalid email' });
      return;
    }

    // Hash du mot de passe
    const hash = await argon2.hash(password);

    // Génération d'un token de vérification
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Création de l'utilisateur
    const user = (await User.create({
      firstname,
      lastname,
      email,
      password: hash,
      role_id: 'd249c770-a893-4d30-8d11-fd6337c2f861',
      verification_token: verificationToken,
    })) as unknown as IUser;

    // Envoi du mail de vérification
    await sendVerificationEmail(user, verificationToken);

    // Retourne le token de vérification pour les tests avec Swagger
    res.status(201).json({
      message:
        'Votre compte a été créé avec succès, vérifiez votre email pour activer votre compte',
      verificationToken,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    console.error('Registration error: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Récupération du token de verification
    const { token } = req.params;

    if (!token) {
      res.status(400).json({ message: 'Missing verification token' });
      return;
    }

    // Récupération de l'utilisateur
    const user = (await User.findOne({
      where: { verification_token: token },
    })) as unknown as IUser;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Mise à jour de l'utilisateur
    user.is_verified = true;
    user.verification_token = null;

    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Email verification error: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
