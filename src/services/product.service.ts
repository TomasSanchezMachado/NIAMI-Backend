import { Product } from '../entities/Product';
import { Category } from '../entities/Category';
import { Ingredient } from '../entities/Ingredient';
import { Promotion } from '../entities/Promotion';
import { EntityManager, FilterQuery} from '@mikro-orm/core';

export class ProductService {
  constructor(private readonly em: EntityManager) {}

  async createProduct(data: {
    description: string;
    price: number;
    image?: string;
    categoryId: string;
    ingredientIds?: string[];
    promotionIds?: string[];
  }) {
    const category = await this.em.findOne(Category, { id: data.categoryId });
    if (!category) throw new Error('Category not found');

    const product = new Product(data.description, data.price, category, data.image);

    // Asociar ingredientes si se proporcionan
    if (data.ingredientIds && data.ingredientIds.length > 0) {
      const ingredients = await this.em.find(Ingredient, { id: { $in: data.ingredientIds } });
      product.ingredients.add(ingredients);
    }

    // Asociar promociones si se proporcionan
    if (data.promotionIds && data.promotionIds.length > 0) {
      const promotions = await this.em.find(Promotion, { id: { $in: data.promotionIds } });
      for (const promo of promotions) {
        promo.product = product;
        product.promotions.add(promo);
      }
    }

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

    return this.em.find(Product, {}, { populate: ['category', 'ingredients', 'promotions', 'orderItems'] });

  }

  async getProductById(id: string) {
  return this.em.findOne(Product, { id }, { populate: ['category', 'ingredients', 'promotions', 'orderItems'] });
  }

  async updateProduct(id: string, data: Partial<{
    description: string;
    price: number;
    image?: string;
    categoryId: string;
    ingredientIds: string[];
    promotionIds: string[];
  }>) {
  const product = await this.em.findOne(Product, { id }, { populate: ['category', 'ingredients', 'promotions'] });
    if (!product) return null;

    if (data.description !== undefined) product.description = data.description;
    if (data.price !== undefined) product.price = data.price;
    if (data.image !== undefined) product.image = data.image;

    if (data.categoryId) {
      const category = await this.em.findOne(Category, { id: data.categoryId });
      if (!category) throw new Error('Category not found');
      product.category = category;
    }

    if (data.ingredientIds) {
      const ingredients = await this.em.find(Ingredient, { id: { $in: data.ingredientIds } });
      product.ingredients.removeAll();
      product.ingredients.add(ingredients);
    }

    if (data.promotionIds) {
      const promotions = await this.em.find(Promotion, { id: { $in: data.promotionIds } });
      product.promotions.removeAll();
      for (const promo of promotions) {
        promo.product = product;
        product.promotions.add(promo);
      }
    }

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
