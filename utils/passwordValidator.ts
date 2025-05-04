import z from 'zod';

// Création de schema pour le mot de passe
//8 caractères minimum
//25 caractères maximum
//au moins une majuscule
//au moins un chiffre
//au moins un caractère spécial
const passwordSchema = z
  .string()
  .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
  .max(25, 'Le mot de passe doit contenir au maximum 25 caractères')
  .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
  .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
  .regex(
    /[@#$%^&*!(),.?":{}|<>]/,
    'Le mot de passe doit contenir au moins un caractère spécial',
  );

export default passwordSchema;
