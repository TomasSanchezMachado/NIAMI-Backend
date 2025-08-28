import { Router } from 'express';
import { IngredientController } from '../controllers/ingredient.controller';
import { RequestContext } from '@mikro-orm/core';

const router = Router();

// POST /ingredients
router.post('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new IngredientController(em).createIngredient(req, res);
});

// GET /ingredients
router.get('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new IngredientController(em).getAllIngredients(req, res);
});

// GET /ingredients/:id
router.get('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new IngredientController(em).getIngredientById(req, res);
});

// PUT /ingredients/:id
router.put('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new IngredientController(em).updateIngredient(req, res);
});

// DELETE /ingredients/:id
router.delete('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new IngredientController(em).deleteIngredient(req, res);
});

export default router;
