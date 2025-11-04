import { Request, Response } from 'express';
import { UserService } from './user.service';
import { EntityManager } from '@mikro-orm/core';
import { sendMail } from '../mail/mailer';

export class UserController {
  private service: UserService;

  constructor(private readonly em: EntityManager) {
    this.service = new UserService(em);
  }


  createUser = async (req: Request, res: Response) => {
    const { name, email, password, role, address, phone } = req.body;
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || (role !== 'admin' && role !== 'customer')) {
      return res.status(400).json({ error: 'Invalid or missing user fields (name, email, password, role)' });
    }
    if (address !== undefined && typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid address' });
    }
    if (phone !== undefined && typeof phone !== 'string') {
      return res.status(400).json({ error: 'Invalid phone' });
    }
    try {
      const user = await this.service.createUser({ name, email, password, role, address, phone });
      const validationCode = Math.floor(Math.random() * 10000).toString();
      user.validationCode = validationCode;
      await this.em.persistAndFlush(user);
      if (user){
        await sendMail(
          email,
          'Bienvenido a NIAMI - FastFood',
          'Gracias por registrarte.',
          '<b>Gracias por registrarte. Tu codigo de validación es: ' + validationCode + '</b>'
        )
      }
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
    const { name, email, password, role, address, phone } = req.body;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing user id' });
    }
    if (role !== undefined && role !== 'admin' && role !== 'customer') {
      return res.status(400).json({ error: 'Invalid role value' });
    }
    if (address !== undefined && typeof address !== 'string') {
      return res.status(400).json({ error: 'Invalid address' });
    }
    if (phone !== undefined && typeof phone !== 'string') {
      return res.status(400).json({ error: 'Invalid phone' });
    }
    try {
      const user = await this.service.updateUser(id, { name, email, password, role, address, phone });
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

  validateUser = async (req: Request, res: Response) => {
    const { email, code } = req.body;

    if (typeof email !== 'string' || typeof code !== 'string') {
      return res.status(400).json({ error: 'Email y código son requeridos y deben ser string' });
    }

    try {
      const user = await this.service.validateUser(email, code);

      await sendMail(
        email,
        'Cuenta validada correctamente',
        'Tu cuenta ha sido validada exitosamente.',
        `<b>Tu cuenta ha sido validada exitosamente</b>`
      );

      res.json({ message: 'Usuario validado correctamente', user });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  };

}
