import { Router } from 'express';
import { ProductController } from '../controllers/product.controller';
import { RequestContext } from '@mikro-orm/core';

const router = Router();

// POST /products
router.post('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProductController(em).createProduct(req, res);
});

// GET /products
router.get('/', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProductController(em).getAllProducts(req, res);
});

// GET /products/:id
router.get('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProductController(em).getProductById(req, res);
});

// PUT /products/:id
router.put('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProductController(em).updateProduct(req, res);
});

// DELETE /products/:id
router.delete('/:id', (req, res) => {
  const em = RequestContext.getEntityManager();
  if (!em) {
    return res.status(500).json({ error: 'EntityManager not found in RequestContext.' });
  }
  new ProductController(em).deleteProduct(req, res);
});

export default router; 
