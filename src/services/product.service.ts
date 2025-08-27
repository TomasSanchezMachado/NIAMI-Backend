import { Product } from '../entities/Product';
import { EntityManager } from '@mikro-orm/core';

export class ProductService {
  constructor(private readonly em: EntityManager) {}

  async createProduct(name: string) {
    const product = new Product(name);
    await this.em.persistAndFlush(product);
    return product;
  }

  async getAllProducts() {
    return this.em.find(Product, {});
  }

  async getProductById(id: string) {
    return this.em.findOne(Product, { id });
  }

  async updateProduct(id: string, name: string) {
    const product = await this.getProductById(id);
    if (!product) return null;
    product.name = name;
    await this.em.persistAndFlush(product);
    return product;
  }

  async deleteProduct(id: string) {
    const product = await this.getProductById(id);
    if (!product) return null;
    await this.em.removeAndFlush(product);
    return product;
  }
}
