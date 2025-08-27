import { Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import { EntityManager } from '@mikro-orm/core';

export class ProductController {
  private service: ProductService;

  constructor(private readonly em: EntityManager) {
    this.service = new ProductService(em);
  }

  createProduct = async (req: Request, res: Response) => {
    const { name } = req.body;
    try {
      const product = await this.service.createProduct(name);
      res.json(product);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllProducts = async (_req: Request, res: Response) => {
    try {
      const products = await this.service.getAllProducts();
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getProductById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing product id' });
    }
    try {
      const product = await this.service.getProductById(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    if (typeof id !== 'string' || typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing product id or name' });
    }
    try {
      const product = await this.service.updateProduct(id, name);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json(product);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing product id' });
    }
    try {
      const product = await this.service.deleteProduct(id);
      if (!product) return res.status(404).json({ error: 'Product not found' });
      res.json({ message: 'Product deleted', product });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
