import { Product } from './Product';
import { Category } from '../category/Category';
import { Ingredient } from '../ingredient/Ingredient';
import { Promotion } from '../promotion/Promotion';
import { EntityManager, FilterQuery} from '@mikro-orm/core';
import { wrap } from '@mikro-orm/core';

export class ProductService {
  constructor(private readonly em: EntityManager) {}

  async createProduct(data: {
    description: string;
    price: number;
    image?: string;
    category_id: string;
    ingredientIds?: string[];
    promotionIds?: string[];
  }) {
    const category = await this.em.findOne(Category, { id: data.category_id });
    if (!category) throw new Error('Categoria no encontranda');

    const product = new Product(data.description, data.price, category, data.image);

    if (data.ingredientIds && data.ingredientIds.length > 0) {
      const ingredients = await this.em.find(Ingredient, { id: { $in: data.ingredientIds } });
      product.ingredients.add(ingredients);
    }

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


  async getAllProducts(filters: any = {}): Promise<Record<string, any>[]> {
    const products = await this.em.find(Product, {}, { populate: ['category', 'ingredients', 'promotions', 'orderItems'] });
    const now = new Date();

    return products.map(product => {
      const activePromo = product.promotions.getItems().find(
        promo => new Date(promo.startDate) <= now && new Date(promo.endDate) >= now
      );

      const finalPrice = activePromo
        ? product.price - (product.price * (activePromo.discount / 100))
        : product.price;

      return {
        ...wrap(product).toObject(),
        finalPrice,
        activePromotion: activePromo ? wrap(activePromo).toObject() : null,
      };
    });
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
      if (!category) throw new Error('Categoria no encontranda');
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
