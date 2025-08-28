import { Provider } from '../entities/Provider';
import { EntityManager } from '@mikro-orm/core';

export class ProviderService {
  constructor(private readonly em: EntityManager) {}

  async createProvider({ name }: { name: string }) {
    const provider = new Provider();
    provider.name = name;
    await this.em.persistAndFlush(provider);
    return provider;
  }

  async getAllProviders() {
    return this.em.find(Provider, {});
  }

  async getProviderById(id: string) {
    return this.em.findOne(Provider, { id });
  }

  async updateProvider(id: string, { name }: { name?: string }) {
    const provider = await this.getProviderById(id);
    if (!provider) return null;
    if (name !== undefined) provider.name = name;
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
