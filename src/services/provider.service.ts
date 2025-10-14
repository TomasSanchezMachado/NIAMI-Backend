import { Provider } from '../entities/Provider';
import { EntityManager } from '@mikro-orm/core';

export class ProviderService {
  constructor(private readonly em: EntityManager) {}

  async createProvider(data: { name: string; address?: string; phone?: string; email?: string }) {
    const provider = new Provider();
    provider.name = data.name;
    provider.address = data.address;
    provider.phone = data.phone;
    provider.email = data.email;
    await this.em.persistAndFlush(provider);
    return provider;
  }

  async getAllProviders() {
    return this.em.find(Provider, {}, { populate: ['ingredients'] });
  }

  async getProviderById(id: string) {
    return this.em.findOne(Provider, { id }, { populate: ['ingredients'] });
  }

  async updateProvider(id: string, data: Partial<{ name: string; address?: string; phone?: string; email?: string }>) {
    const provider = await this.getProviderById(id);
    if (!provider) return null;
    if (data.name !== undefined) provider.name = data.name;
    if (data.address !== undefined) provider.address = data.address;
    if (data.phone !== undefined) provider.phone = data.phone;
    if (data.email !== undefined) provider.email = data.email;
    await this.em.persistAndFlush(provider);
    return provider;
  }

  async deleteProvider(id: string) {
    const provider = await this.getProviderById(id);
    if (!provider) return null;
    await this.em.removeAndFlush(provider);
    return provider;
  }
}
