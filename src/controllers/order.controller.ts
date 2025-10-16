import { Request, Response } from 'express';
import { EntityManager } from '@mikro-orm/core';
import { OrderService } from '../services/order.service';

export class OrderController {
  private service: OrderService;

  constructor(private readonly em: EntityManager) {
    this.service = new OrderService(em);
  }

  // Crear un pedido
  createOrder = async (req: Request, res: Response) => {
    const { user_id, status, description, totalPrice } = req.body;

    // Validación básica
    if (typeof user_id !== 'string' || typeof status !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing order fields (user_id, status)' });
    }

    // Validación del enum status
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

  // Obtener todos los pedidos
  getAllOrders = async (_req: Request, res: Response) => {
    try {
      const orders = await this.service.getAllOrders();
      res.json(orders);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  // Obtener pedido por ID
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

  // Actualizar un pedido
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

  // Eliminar un pedido
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
