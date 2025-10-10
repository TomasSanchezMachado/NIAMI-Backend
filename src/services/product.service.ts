import { Product } from '../entities/Product';
import { EntityManager } from '@mikro-orm/core';

export class ProductService {
  constructor(private readonly em: EntityManager) {}

  async createProduct(data: { name: string; price: number; image?: string }) {
    const product = this.em.create(Product, data);
    await this.em.persistAndFlush(product);
    return product;
  }

  async getAllProducts() {
    return this.em.find(Product, {});
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
