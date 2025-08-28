import { Router } from 'express';
import { ProviderController } from '../controllers/provider.controller';
import { RequestContext } from '@mikro-orm/core';

const router = Router();

// POST /providers
router.post('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProviderController(em).createProvider(req, res);
});

// GET /providers
router.get('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProviderController(em).getAllProviders(req, res);
});

// GET /providers/:id
router.get('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProviderController(em).getProviderById(req, res);
});

// PUT /providers/:id
router.put('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProviderController(em).updateProvider(req, res);
});

// DELETE /providers/:id
router.delete('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProviderController(em).deleteProvider(req, res);
});

export default router;
