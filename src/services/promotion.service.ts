import { Promotion } from '../entities/Promotion';
import { Product } from '../entities/Product';
import { EntityManager } from '@mikro-orm/core';

export class PromotionService {
  constructor(private readonly em: EntityManager) {}

  async createPromotion(data: { description: string; discount: number; startDate: Date; endDate: Date; productId: string }) {
    const product = await this.em.findOne(Product, { id: data.productId });
    if (!product) throw new Error('Product not found');
    const promotion = new Promotion();
    promotion.description = data.description;
    promotion.discount = data.discount;
    promotion.startDate = data.startDate;
    promotion.endDate = data.endDate;
    promotion.product = product;
    await this.em.persistAndFlush(promotion);
    return promotion;
  }

  async getAllPromotions() {
    return this.em.find(Promotion, {}, { populate: ['product'] });
  }

  async getPromotionById(id: string) {
    return this.em.findOne(Promotion, { id }, { populate: ['product'] });
  }

  async updatePromotion(id: string, data: Partial<{ description: string; discount: number; startDate?: Date; endDate?: Date; productId?: string }>) {
    const promotion = await this.getPromotionById(id);
    if (!promotion) return null;
    if (data.description !== undefined) promotion.description = data.description;
    if (data.discount !== undefined) promotion.discount = data.discount;
    if (data.startDate !== undefined) promotion.startDate = data.startDate;
    if (data.endDate !== undefined) promotion.endDate = data.endDate;
    if (data.productId) {
      const product = await this.em.findOne(Product, { id: data.productId });
      if (!product) throw new Error('Product not found');
      promotion.product = product;
    }
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
