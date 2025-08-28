import { Ingredient } from '../entities/Ingredient';
import { EntityManager } from '@mikro-orm/core';

export class IngredientService {
  constructor(private readonly em: EntityManager) {}

  async createIngredient(name: string) {
    const ingredient = new Ingredient(name);
    await this.em.persistAndFlush(ingredient);
    return ingredient;
  }

  async getAllIngredients() {
    return this.em.find(Ingredient, {});
  }

  async getIngredientById(id: string) {
    return this.em.findOne(Ingredient, { id });
  }

  async updateIngredient(id: string, name: string) {
    const ingredient = await this.getIngredientById(id);
    if (!ingredient) return null;
    ingredient.name = name;
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
