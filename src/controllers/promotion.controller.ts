import { Request, Response } from 'express';
import { PromotionService } from '../services/promotion.service';
import { EntityManager } from '@mikro-orm/core';

export class PromotionController {
  private service: PromotionService;

  constructor(private readonly em: EntityManager) {
    this.service = new PromotionService(em);
  }

  createPromotion = async (req: Request, res: Response) => {
    const { name, discountPercent } = req.body;
    if (typeof name !== 'string' || typeof discountPercent !== 'number') {
      return res.status(400).json({ error: 'Invalid or missing promotion fields (name, discountPercent)' });
    }
    try {
      const promotion = await this.service.createPromotion({ name, discountPercent });
      res.json(promotion);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllPromotions = async (_req: Request, res: Response) => {
    try {
      const promotions = await this.service.getAllPromotions();
      res.json(promotions);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getPromotionById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing promotion id' });
    }
    try {
      const promotion = await this.service.getPromotionById(id);
      if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
      res.json(promotion);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updatePromotion = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, discountPercent } = req.body;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing promotion id' });
    }
    try {
      const promotion = await this.service.updatePromotion(id, { name, discountPercent });
      if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
      res.json(promotion);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  deletePromotion = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing promotion id' });
    }
    try {
      const promotion = await this.service.deletePromotion(id);
      if (!promotion) return res.status(404).json({ error: 'Promotion not found' });
      res.json({ message: 'Promotion deleted', promotion });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
