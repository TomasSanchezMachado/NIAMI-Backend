import { Router } from 'express';
import { RequestContext } from '@mikro-orm/core';
import { UserService } from '../services/user.service';
import { AuthController } from '../controllers/auth.controller';

const router = Router();

// Registro
router.post('/register', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  const service = new UserService(em);
  new AuthController(service).register(req, res);
});

// Login
router.post('/login', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  const service = new UserService(em);
  new AuthController(service).login(req, res);
});

export default router;
