import { Router } from 'express';
import { PromotionController } from '../controllers/promotion.controller';
import { RequestContext } from '@mikro-orm/core';

const router = Router();

// POST /promotions
router.post('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new PromotionController(em).createPromotion(req, res);
});

// GET /promotions
router.get('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new PromotionController(em).getAllPromotions(req, res);
});

// GET /promotions/:id
router.get('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new PromotionController(em).getPromotionById(req, res);
});

// PUT /promotions/:id
router.put('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new PromotionController(em).updatePromotion(req, res);
});

// DELETE /promotions/:id
router.delete('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new PromotionController(em).deletePromotion(req, res);
});

export default router;
