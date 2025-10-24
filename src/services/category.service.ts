import { Category } from '../entities/Category';
import { EntityManager, FilterQuery } from '@mikro-orm/core';

export class CategoryService {
  constructor(private readonly em: EntityManager) {}

  async getAllCategories(filters: any = {}) {
    const where: FilterQuery<Category> = {};

    if (filters.name) {
      where.name = { $ilike: `%${filters.name}%` };
    }

    return this.em.find(Category, where);
  }

  async getCategoryById(id: string) {
    return this.em.findOne(Category, { id });
  }

  async createCategory({ name }: { name: string }) {
    const category = new Category();
    category.name = name;
    await this.em.persistAndFlush(category);
    return category;
  }

  async updateCategory(id: string, { name }: { name?: string }) {
    const category = await this.getCategoryById(id);
    if (!category) return null;
    if (name !== undefined) category.name = name;
    await this.em.persistAndFlush(category);
    return category;
  }

  async deleteCategory(id: string) {
    const category = await this.getCategoryById(id);
    if (!category) return null;
    await this.em.removeAndFlush(category);
    return category;
  }
}