import { Router } from 'express';
import { RequestContext } from '@mikro-orm/core';
import { OrderController } from '../controllers/order.controller';

const router = Router();

// POST /orders -> crear un pedido
router.post('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res
      .status(500)
      .json({ error: 'EntityManager not found in RequestContext.' });
  }
  new OrderController(em).createOrder(req, res);
});

// GET /orders -> listar todos los pedidos
router.get('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res
      .status(500)
      .json({ error: 'EntityManager not found in RequestContext.' });
  }
  new OrderController(em).getAllOrders(req, res);
});

// GET /orders/:id -> obtener un pedido por ID
router.get('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res
      .status(500)
      .json({ error: 'EntityManager not found in RequestContext.' });
  }
  new OrderController(em).getOrderById(req, res);
});

// PUT /orders/:id -> actualizar un pedido
router.put('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res
      .status(500)
      .json({ error: 'EntityManager not found in RequestContext.' });
  }
  new OrderController(em).updateOrder(req, res);
});

// DELETE /orders/:id -> eliminar un pedido
router.delete('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res
      .status(500)
      .json({ error: 'EntityManager not found in RequestContext.' });
  }
  new OrderController(em).deleteOrder(req, res);
});

export default router;
