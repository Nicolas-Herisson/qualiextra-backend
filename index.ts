import dotenv from 'dotenv';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
//import { isAdmin } from './middlewares/isAdmin.middleware.js';
import authRouter from './routers/auth.router.ts';
import userRouter from './routers/user.router.ts';
import swaggerDocument from './swagger.json' with { type: 'json' };

dotenv.config();

const app = express();

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.use(
  '/api-docs',
  //En condition réelle, on devrait mettre isAdmin
  //isAdmin,
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument),
);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on http://localhost:${process.env.PORT}/api-docs`,
  );
});
