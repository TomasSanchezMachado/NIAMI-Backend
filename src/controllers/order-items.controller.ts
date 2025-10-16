import { Request, Response } from 'express';
import { EntityManager } from '@mikro-orm/core';
import { OrderItemsService } from '../services/order-items.service';

export class OrderItemsController {
  private service: OrderItemsService;

  constructor(private readonly em: EntityManager) {
    this.service = new OrderItemsService(em);
  }

  createOrderItem = async (req: Request, res: Response) => {
    const { order_id, product_id, quantity, description, price } = req.body;
    if (!order_id || !product_id || !quantity) {
      return res.status(400).json({ error: 'Missing fields: order_id, product_id, quantity' });
    }

    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ error: 'Invalid description' });
    }

    if (price !== undefined && typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid price' });
    }

    try {
      const item = await this.service.createOrderItem({ order_id, product_id, quantity, description, price });
      res.json(item);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllOrderItems = async (_req: Request, res: Response) => {
    try {
      const items = await this.service.getAllOrderItems();
      res.json(items);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getOrderItemById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing orderItem id' });
    }
    try {
      const item = await this.service.getOrderItemById(id);
      if (!item) return res.status(404).json({ error: 'OrderItem not found' });
      res.json(item);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updateOrderItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing orderItem id' });
    }
    const { quantity, description, price } = req.body;
    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ error: 'Invalid description' });
    }
    if (price !== undefined && typeof price !== 'number') {
      return res.status(400).json({ error: 'Invalid price' });
    }
    try {
  const item = await this.service.updateOrderItem(id, { quantity, description, price });
      if (!item) return res.status(404).json({ error: 'OrderItem not found' });
      res.json(item);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  deleteOrderItem = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing orderItem id' });
    }
    try {
      const item = await this.service.deleteOrderItem(id);
      if (!item) return res.status(404).json({ error: 'OrderItem not found' });
      res.json({ message: 'OrderItem deleted', item });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
