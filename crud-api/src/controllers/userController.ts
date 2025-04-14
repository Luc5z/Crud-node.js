import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const create = async (req: Request, res: Response) => {
  try {
    console.log('REQ.BODY:', req.body);
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error('Erro no controller:', err);
    res.status(400).json({ error: 'Erro ao criar usuário.' });
  }
};

export const list = async (_req: Request, res: Response) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const get = async (req: Request, res: Response) => {
  const user = await userService.getUserById(Number(req.params.id));
  if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
  res.json(user);
};

export const update = async (req: Request, res: Response) => {
  await userService.updateUser(Number(req.params.id), req.body);
  res.json({ message: 'Usuário atualizado com sucesso' });
};

export const remove = async (req: Request, res: Response) => {
  await userService.deleteUser(Number(req.params.id));
  res.json({ message: 'Usuário deletado com sucesso' });
};
