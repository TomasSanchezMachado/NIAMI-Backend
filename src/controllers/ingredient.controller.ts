import { Request, Response } from 'express';
import { IngredientService } from '../services/ingredient.service';
import { EntityManager } from '@mikro-orm/core';

export class IngredientController {
  private service: IngredientService;

  constructor(private readonly em: EntityManager) {
    this.service = new IngredientService(em);
  }

  createIngredient = async (req: Request, res: Response) => {
    const { description, providerId, productIds } = req.body;
    try {
      const ingredient = await this.service.createIngredient({ description, providerId, productIds });
      res.json(ingredient);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllIngredients = async (_req: Request, res: Response) => {
    try {
      const ingredients = await this.service.getAllIngredients();
      res.json(ingredients);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getIngredientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing ingredient id' });
    }
    try {
      const ingredient = await this.service.getIngredientById(id);
      if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
      res.json(ingredient);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updateIngredient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { description, providerId, productIds } = req.body;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing ingredient id' });
    }
    try {
      const ingredient = await this.service.updateIngredient(id, { description, providerId, productIds });
      if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
      res.json(ingredient);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  deleteIngredient = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing ingredient id' });
    }
    try {
      const ingredient = await this.service.deleteIngredient(id);
      if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
      res.json({ message: 'Ingredient deleted', ingredient });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
