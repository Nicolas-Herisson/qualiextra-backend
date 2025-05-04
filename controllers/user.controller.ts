import type { Request, Response } from 'express';
import * as z from 'zod';
import type { IUser } from '../@Types/types.ts';
import { User } from '../models/associations.ts';
import emailSchema from '../utils/emailValidator.ts';
import passwordSchema from '../utils/passwordValidator.ts';

//  User private routes
export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const requester = req.user;

    if (!requester) {
      res.status(400).json({ message: 'Missing user ID' });
      return;
    }

    const user = (await User.findByPk(requester.id, {
      include: 'role',
      attributes: {
        exclude: ['password'],
      },
    })) as unknown as IUser;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ message: `Hello ${user.firstname}` });
  } catch (error) {
    if (error instanceof Error) {
      console.error('User error: ', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(400).json({ message: 'Missing user ID' });
      return;
    }
    const { id } = req.user;
    const { firstname, lastname, email, password } = req.body;

    if (!id) {
      res.status(400).json({ message: 'Missing user ID' });
      return;
    }

    if (!firstname || !lastname || !email || !password) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    const user = (await User.findByPk(id)) as unknown as IUser;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    const emailParsed = emailSchema.safeParse(email);

    if (!emailParsed.success) {
      res.status(400).json({ message: 'Invalid email' });
      return;
    }

    const passwordParsed = passwordSchema.safeParse(password);

    if (!passwordParsed.success) {
      res.status(400).json({ message: 'Invalid password' });
      return;
    }

    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;

    await user.save();

    res.json({ message: 'User updated successfully' });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
      return;
    }
    if (error instanceof Error) {
      console.error('User error: ', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

//  Admin private routes
export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const requester = req.user;

    // Vérification: si le rôle de l'utilisateur est admin ou si l'utilisateur est le propriétaire de la ressource
    if (requester?.role.name !== 'admin' && requester?.id !== id) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    if (!id) {
      res.status(400).json({ message: 'Missing user ID' });
      return;
    }

    const user = (await User.findByPk(id, {
      include: 'role',
      attributes: {
        exclude: ['password'],
      },
    })) as unknown as IUser;

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    if (error instanceof Error) {
      console.error('User error: ', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({
      include: 'role',
      attributes: {
        exclude: ['password'],
      },
    });

    if (!users) {
      res.status(404).json({ message: 'Users not found' });
      return;
    }

    res.json({ message: 'Users retrieved successfully', users });
  } catch (error) {
    if (error instanceof Error) {
      console.error('User error: ', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const updateUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    console.log("in update user by id");
    const { id } = req.params;
    const { firstname, lastname, email, password } = req.body;

    if (!id) {
      res.status(400).json({ message: 'Missing user ID' });
      return;
    }
console.log("after id");
    const user = (await User.findByPk(id)) as unknown as IUser;
console.log("after user");
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
console.log("after user not found");
    // Mise à jour des champs de l'utilisateur
    user.firstname = firstname;
    user.lastname = lastname;
    user.email = email;
    user.password = password;

    // Sauvegarde des modifications
    await user.save();
console.log("after save");
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('User error: ', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: 'Missing user ID' });
      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.destroy();

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('User error: ', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};
