import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { RequestContext } from '@mikro-orm/core';

const router = Router();

// POST /categories
router.post('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new CategoryController(em).createCategory(req, res);
});

// GET /categories
router.get('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new CategoryController(em).getAllCategories(req, res);
});

// GET /categories/:id
router.get('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new CategoryController(em).getCategoryById(req, res);
});

// PUT /categories/:id
router.put('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new CategoryController(em).updateCategory(req, res);
});

// DELETE /categories/:id
router.delete('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new CategoryController(em).deleteCategory(req, res);
});

export default router;