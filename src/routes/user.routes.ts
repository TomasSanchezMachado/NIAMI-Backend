import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { RequestContext } from '@mikro-orm/core';

const router = Router();

// POST /users
router.post('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new UserController(em).createUser(req, res);
});

// GET /users
router.get('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new UserController(em).getAllUsers(req, res);
});

// GET /users/:id
router.get('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new UserController(em).getUserById(req, res);
});

// PUT /users/:id
router.put('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new UserController(em).updateUser(req, res);
});

// DELETE /users/:id
router.delete('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new UserController(em).deleteUser(req, res);
});

export default router;
