import { isFakeEmail } from 'fakefilter';
import z from 'zod';

// Création de schema pour l'email avec filtrage des emails fake
const emailSchema = z
  .string()
  .email({ message: 'Invalid email' })
  .refine((email) => !isFakeEmail(email), {
    message: 'Invalid email!',
  });

export default emailSchema;
