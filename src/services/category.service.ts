import { Category } from '../entities/Category';
import { EntityManager } from '@mikro-orm/core';

export class CategoryService {
  constructor(private readonly em: EntityManager) {}

  // Obtener todas las categorías
  async getAllCategories() {
    return this.em.find(Category, {});
  }

  // Obtener una categoría por su ID
  async getCategoryById(id: string) {
    return this.em.findOne(Category, { id });
  }

  // Crear una nueva categoría
  async createCategory({ name }: { name: string }) {
    const category = new Category();
    category.name = name;
    await this.em.persistAndFlush(category);
    return category;
  }

  // Actualizar una categoría existente
  async updateCategory(id: string, { name }: { name?: string }) {
    const category = await this.getCategoryById(id);
    if (!category) return null;
    if (name !== undefined) category.name = name;
    await this.em.persistAndFlush(category);
    return category;
  }

  // Eliminar una categoría
  async deleteCategory(id: string) {
    const category = await this.getCategoryById(id);
    if (!category) return null;
    await this.em.removeAndFlush(category);
    return category;
  }
}