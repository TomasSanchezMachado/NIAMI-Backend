import { EntityManager } from '@mikro-orm/core';
import { Order } from '../entities/Order';
import { User } from '../entities/User';

export class OrderService {
  constructor(private readonly em: EntityManager) {}

  // Crear un pedido
  async createOrder({ user_id, status }: { user_id: string; status: "pending" | "completed" | "canceled" }) {
    const user = await this.em.findOne(User, { id: user_id });
    if (!user) throw new Error('User not found');

    const order = new Order();
    order.user = user;       // asignamos el objeto User
    order.status = status;
    order.createdAt = new Date();

    await this.em.persistAndFlush(order);
    return order;
  }

  // Obtener todos los pedidos
  async getAllOrders() {
    return this.em.find(Order, {});
  }

  // Obtener pedido por ID
  async getOrderById(id: string) {
    return this.em.findOne(Order, { id });
  }

  // Actualizar un pedido
  async updateOrder(
    id: string,
    { user_id, status }: { user_id?: string; status?: "pending" | "completed" | "canceled" }
  ) {
    const order = await this.getOrderById(id);
    if (!order) return null;

    if (user_id !== undefined) {
      const user = await this.em.findOne(User, { id: user_id });
      if (!user) throw new Error('User not found');
      order.user = user;
    }

    if (status !== undefined) order.status = status;

    await this.em.persistAndFlush(order);
    return order;
  }

  // Eliminar un pedido
  async deleteOrder(id: string) {
    const order = await this.getOrderById(id);
    if (!order) return null;

    await this.em.removeAndFlush(order);
    return order;
  }
}
