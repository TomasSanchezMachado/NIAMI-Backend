import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class AuthController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  register = async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await this.service.createUser({ name, email, password: hashedPassword, role });
      res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña requeridos' });
    }
    try {
      const user = await this.service.getUserByEmail(email);
      if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: 'Credenciales inválidas' });
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
