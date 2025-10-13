
import { User } from '../entities/User';
import { EntityManager } from '@mikro-orm/core';

export class UserService {
  constructor(private readonly em: EntityManager) {}

  async getUserByEmail(email: string) {
    return this.em.findOne(User, { email });
  }

  async createUser({ name, email, password, role }: { name: string; email: string; password: string; role: 'admin' | 'customer' }) {
    const user = new User();
    user.name = name;
    user.email = email;
    user.password = password;
    user.role = role;
    await this.em.persistAndFlush(user);
    return user;
  }

  getAllUsers = async (filters?: { name?: string; role?: string }) => {
    const where: any = {};

    // Filtro por nombre (LIKE)
    if (filters?.name) {
      where.name = { $ilike: `%${filters.name}%` };
    }

    // Filtro por rol exacto
    if (filters?.role) {
      where.role = filters.role;
    }

    return this.em.find(User, where);
  };

  async getUserById(id: string) {
    return this.em.findOne(User, { id });
  }

  async updateUser(id: string, { name, email, password, role }: { name?: string; email?: string; password?: string; role?: 'admin' | 'customer' }) {
    const user = await this.getUserById(id);
    if (!user) return null;
    if (name !== undefined) user.name = name;
    if (email !== undefined) user.email = email;
    if (password !== undefined) user.password = password;
    if (role !== undefined) user.role = role;
    await this.em.persistAndFlush(user);
    return user;
  }

  async deleteUser(id: string) {
    const user = await this.getUserById(id);
    if (!user) return null;
    await this.em.removeAndFlush(user);
    return user;
  }
}
