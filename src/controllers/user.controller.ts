import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { EntityManager } from '@mikro-orm/core';

export class UserController {
  private service: UserService;

  constructor(private readonly em: EntityManager) {
    this.service = new UserService(em);
  }


  createUser = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || (role !== 'admin' && role !== 'customer')) {
      return res.status(400).json({ error: 'Invalid or missing user fields (name, email, password, role)' });
    }
    try {
      const user = await this.service.createUser({ name, email, password, role });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllUsers = async (req: Request, res: Response) => {
    try {
      const { name, role } = req.query;

      // Validamos role si se pasó
      if (role && role !== 'admin' && role !== 'customer') {
        return res.status(400).json({ error: 'Invalid role filter' });
      }

      // Convertimos los filtros a tipo string si existen
      const filters: { name?: string; role?: string } = {};
      if (name && typeof name === 'string') filters.name = name;
      if (role && typeof role === 'string') filters.role = role;

      const users = await this.service.getAllUsers(filters);
      res.json(users);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing user id' });
    }
    try {
      const user = await this.service.getUserById(id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing user id' });
    }
    if (role !== undefined && role !== 'admin' && role !== 'customer') {
      return res.status(400).json({ error: 'Invalid role value' });
    }
    try {
      const user = await this.service.updateUser(id, { name, email, password, role });
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing user id' });
    }
    try {
      const user = await this.service.deleteUser(id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted', user });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
