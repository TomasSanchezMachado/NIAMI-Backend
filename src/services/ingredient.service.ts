import { Ingredient } from '../entities/Ingredient';
import { Provider } from '../entities/Provider';
import { Product } from '../entities/Product';
import { EntityManager } from '@mikro-orm/core';

export class IngredientService {
  constructor(private readonly em: EntityManager) {}

  async createIngredient(data: { description: string; providerId: string; productIds?: string[] }) {
    const provider = await this.em.findOne(Provider, { id: data.providerId });
    if (!provider) throw new Error('Provider not found');
    const ingredient = new Ingredient(data.description, provider);
    if (data.productIds && data.productIds.length > 0) {
      const products = await this.em.find(Product, { id: { $in: data.productIds } });
      ingredient.products.add(products);
    }
    await this.em.persistAndFlush(ingredient);
    return ingredient;
  }

  async getAllIngredients() {
    return this.em.find(Ingredient, {}, { populate: ['provider', 'products'] });
  }

  async getIngredientById(id: string) {
    return this.em.findOne(Ingredient, { id }, { populate: ['provider', 'products'] });
  }

  async updateIngredient(id: string, data: Partial<{ description: string; providerId: string; productIds: string[] }>) {
    const ingredient = await this.getIngredientById(id);
    if (!ingredient) return null;
    if (data.description !== undefined) ingredient.description = data.description;
    if (data.providerId) {
      const provider = await this.em.findOne(Provider, { id: data.providerId });
      if (!provider) throw new Error('Provider not found');
      ingredient.provider = provider;
    }
    if (data.productIds) {
      const products = await this.em.find(Product, { id: { $in: data.productIds } });
      ingredient.products.removeAll();
      ingredient.products.add(products);
    }
    await this.em.persistAndFlush(ingredient);
    return ingredient;
  }

  async deleteIngredient(id: string) {
    const ingredient = await this.getIngredientById(id);
    if (!ingredient) return null;
    await this.em.removeAndFlush(ingredient);
    return ingredient;
  }
}
