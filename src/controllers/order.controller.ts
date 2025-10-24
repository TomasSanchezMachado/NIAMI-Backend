import { Request, Response } from 'express';
import { EntityManager } from '@mikro-orm/core';
import { OrderService } from '../services/order.service';

export class OrderController {
  private service: OrderService;

  constructor(private readonly em: EntityManager) {
    this.service = new OrderService(em);
  }

  createOrder = async (req: Request, res: Response) => {
    const { user_id, status, description, totalPrice } = req.body;

    if (typeof user_id !== 'string' || typeof status !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing order fields (user_id, status)' });
    }

    if (!['pending', 'completed', 'canceled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ error: 'Invalid description' });
    }

    if (totalPrice !== undefined && typeof totalPrice !== 'number') {
      return res.status(400).json({ error: 'Invalid totalPrice' });
    }

    try {
      const order = await this.service.createOrder({ user_id, status: status as 'pending' | 'completed' | 'canceled', description, totalPrice });
      res.json(order);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllOrders = async (req: Request, res: Response) => {
    try {
      const { user_id, status } = req.query;

      const filters: any = {};
      if (user_id) filters.user = user_id;
      if (status) filters.status = status;

      const orders = await this.service.getAllOrders(filters);
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getOrderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing order id' });
    }

    try {
      const order = await this.service.getOrderById(id);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      res.json(order);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updateOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user_id, status, description, totalPrice } = req.body;

    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing order id' });
    }

    if (status !== undefined && !['pending', 'completed', 'canceled'].includes(status)) {
      return res.status(400).json({ error: 'Invalid status value' });
    }

    if (description !== undefined && typeof description !== 'string') {
      return res.status(400).json({ error: 'Invalid description' });
    }

    if (totalPrice !== undefined && typeof totalPrice !== 'number') {
      return res.status(400).json({ error: 'Invalid totalPrice' });
    }

    try {
      const order = await this.service.updateOrder(id, { 
        user_id, 
        status: status as 'pending' | 'completed' | 'canceled',
        description,
        totalPrice,
      });
      if (!order) return res.status(404).json({ error: 'Order not found' });
      res.json(order);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  deleteOrder = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing order id' });
    }

    try {
      const order = await this.service.deleteOrder(id);
      if (!order) return res.status(404).json({ error: 'Order not found' });
      res.json({ message: 'Order deleted', order });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
