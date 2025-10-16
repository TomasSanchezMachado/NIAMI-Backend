import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';
import { EntityManager } from '@mikro-orm/core';

export class CategoryController {
  private service: CategoryService;

  constructor(private readonly em: EntityManager) {
    this.service = new CategoryService(em);
  }

  createCategory = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (typeof name !== 'string' || name.trim() === '') {
      return res.status(400).json({ error: 'Invalid or missing category name' });
    }
    try {
      const category = await this.service.createCategory({ name });
      res.json(category);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllCategories = async (req: Request, res: Response) => {
    try {
      const filters = req.query;
      const categories = await this.service.getAllCategories(filters);
      res.json(categories);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Invalid or missing category id' });
    }
    try {
      const category = await this.service.getCategoryById(id);
      if (!category) return res.status(404).json({ error: 'Category not found' });
      res.json(category);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    if (typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Invalid or missing category id' });
    }
    if (name !== undefined && (typeof name !== 'string' || name.trim() === '')) {
      return res.status(400).json({ error: 'Invalid category name' });
    }
    try {
      const category = await this.service.updateCategory(id, { name });
      if (!category) return res.status(404).json({ error: 'Category not found' });
      res.json(category);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string' || id.trim() === '') {
      return res.status(400).json({ error: 'Invalid or missing category id' });
    }
    try {
      const category = await this.service.deleteCategory(id);
      if (!category) return res.status(404).json({ error: 'Category not found' });
      res.json({ message: 'Category deleted', category });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
