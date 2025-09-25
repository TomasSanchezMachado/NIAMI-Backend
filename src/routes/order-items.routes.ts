import { Router } from 'express';
import { RequestContext } from '@mikro-orm/core';
import { OrderItemsController } from '../controllers/order-items.controller';

const router = Router();

router.post('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) return res.status(500).json({ error: 'EntityManager not found' });

  new OrderItemsController(em).createOrderItem(req, res);
});

router.get('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) return res.status(500).json({ error: 'EntityManager not found' });

  new OrderItemsController(em).getAllOrderItems(req, res);
});

router.get('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) return res.status(500).json({ error: 'EntityManager not found' });

  new OrderItemsController(em).getOrderItemById(req, res);
});

router.put('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) return res.status(500).json({ error: 'EntityManager not found' });

  new OrderItemsController(em).updateOrderItem(req, res);
});

router.delete('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) return res.status(500).json({ error: 'EntityManager not found' });

  new OrderItemsController(em).deleteOrderItem(req, res);
});

export default router;
