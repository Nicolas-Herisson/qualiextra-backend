import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import type { IUser } from '../@Types/types.ts';
dotenv.config();

// Création du transporteur pour l'envoi des emails
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (
  user: IUser,
  verificationToken: string,
) => {
  const verificationUrl = `${process.env.VERIFICATION_URL}/${verificationToken}`;

  // configuration du mail de vérification
  const mailOptions = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
    to: user.email,
    subject: 'Verify your email address',
    html: `
      <p>Bonjour ${user.firstname},</p>
      <p>Merci de vous être inscrit chez Qualiextra.</p>
      <p>Veuillez cliquer sur le lien ci-dessous pour vérifier votre adresse e-mail :</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>Ce lien expirera dans 24 heures.</p>
    `,
  };
  
  // Envoi du mail de vérification
  await transporter.sendMail(mailOptions);
};

export default transporter;
