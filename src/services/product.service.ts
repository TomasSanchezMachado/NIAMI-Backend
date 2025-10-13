import { Product } from '../entities/Product';
import { EntityManager, FilterQuery } from '@mikro-orm/core';

export class ProductService {
  constructor(private readonly em: EntityManager) {}

  async createProduct(data: { name: string; price: number; image?: string }) {
    const product = this.em.create(Product, data);
    await this.em.persistAndFlush(product);
    return product;
  }

  async getAllProducts(filters: any = {}) {
    const where: FilterQuery<Product> = {};

    // 🔹 Filtro por nombre (búsqueda parcial, insensible a mayúsculas)
    if (filters.name) {
      where.name = { $ilike: `%${filters.name}%` }; // PostgreSQL (usa $like si es SQLite)
    }

    // 🔹 Filtro por rango de precio
    if (filters.minPrice || filters.maxPrice) {
      where.price = {};
      if (filters.minPrice) where.price.$gte = parseFloat(filters.minPrice);
      if (filters.maxPrice) where.price.$lte = parseFloat(filters.maxPrice);
    }

    // 🔹 Filtro por ingredientes (si querés filtrar productos que tengan cierto ingrediente)
    //if (filters.ingredient) {
    //  where.ingredients = { name: { $ilike: `%${filters.ingredient}%` } };
    //}

    return this.em.find(Product, where, {
      //populate: ['ingredients'], // opcional, si querés incluir ingredientes
    });
  }

  async getProductById(id: string) {
    return this.em.findOne(Product, { id });
  }

  async updateProduct(id: string, data: Partial<{ name: string; price: number; image?: string }>) {
    const product = await this.em.findOne(Product, { id });
    if (!product) return null;

    this.em.assign(product, data);
    await this.em.flush();
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.getProductById(id);
    if (!product) return null;
    await this.em.removeAndFlush(product);
    return product;
  }
}
