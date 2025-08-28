import { Promotion } from '../entities/Promotion';
import { EntityManager } from '@mikro-orm/core';

export class PromotionService {
  constructor(private readonly em: EntityManager) {}

  async createPromotion({ name, discountPercent }: { name: string; discountPercent: number }) {
    const promotion = new Promotion();
    promotion.name = name;
    promotion.discountPercent = discountPercent;
    await this.em.persistAndFlush(promotion);
    return promotion;
  }

  async getAllPromotions() {
    return this.em.find(Promotion, {});
  }

  async getPromotionById(id: string) {
    return this.em.findOne(Promotion, { id });
  }

  async updatePromotion(id: string, { name, discountPercent }: { name?: string; discountPercent?: number }) {
    const promotion = await this.getPromotionById(id);
    if (!promotion) return null;
    if (name !== undefined) promotion.name = name;
    if (discountPercent !== undefined) promotion.discountPercent = discountPercent;
    await this.em.persistAndFlush(promotion);
    return promotion;
  }

  async deletePromotion(id: string) {
    const promotion = await this.getPromotionById(id);
    if (!promotion) return null;
    await this.em.removeAndFlush(promotion);
    return promotion;
  }
}
