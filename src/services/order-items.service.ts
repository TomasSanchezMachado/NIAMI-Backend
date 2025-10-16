import { EntityManager } from '@mikro-orm/core';
import { OrderItem } from '../entities/OrderItem';
import { Order } from '../entities/Order';
import { Product } from '../entities/Product';

export class OrderItemsService {
  constructor(private readonly em: EntityManager) {}

  async createOrderItem({ order_id, product_id, quantity, description, price }: { order_id: string; product_id: string; quantity: number; description?: string; price?: number }) {
    const order = await this.em.findOne(Order, { id: order_id });
    if (!order) throw new Error('Order not found');
    const product = await this.em.findOne(Product, { id: product_id });
    if (!product) throw new Error('Product not found');

    const orderItem = new OrderItem();
    orderItem.order = order;
    orderItem.product = product;
    orderItem.quantity = quantity;
    if (description !== undefined) orderItem.description = description;
    if (price !== undefined) orderItem.price = price;

    await this.em.persistAndFlush(orderItem);
    return orderItem;
  }

  async getAllOrderItems(order_id?: string) {
    const where = order_id ? { order: order_id } : {};
    return this.em.find(OrderItem, where, { populate: ['product'] });
  }

  async getOrderItemById(id: string) {
    return this.em.findOne(OrderItem, { id });
  }

  async updateOrderItem(id: string, { quantity, description, price }: { quantity?: number; description?: string; price?: number }) {
    const item = await this.getOrderItemById(id);
    if (!item) return null;

    if (quantity !== undefined) item.quantity = quantity;
    if (description !== undefined) item.description = description;
    if (price !== undefined) item.price = price;

    await this.em.persistAndFlush(item);
    return item;
  }

  async deleteOrderItem(id: string) {
    const item = await this.getOrderItemById(id);
    if (!item) return null;

    await this.em.removeAndFlush(item);
    return item;
  }
}
