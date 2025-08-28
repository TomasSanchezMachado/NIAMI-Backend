import { Request, Response } from 'express';
import { ProviderService } from '../services/provider.service';
import { EntityManager } from '@mikro-orm/core';

export class ProviderController {
  private service: ProviderService;

  constructor(private readonly em: EntityManager) {
    this.service = new ProviderService(em);
  }

  createProvider = async (req: Request, res: Response) => {
    const { name } = req.body;
    if (typeof name !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing provider name' });
    }
    try {
      const provider = await this.service.createProvider({ name });
      res.json(provider);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getAllProviders = async (_req: Request, res: Response) => {
    try {
      const providers = await this.service.getAllProviders();
      res.json(providers);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  getProviderById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing provider id' });
    }
    try {
      const provider = await this.service.getProviderById(id);
      if (!provider) return res.status(404).json({ error: 'Provider not found' });
      res.json(provider);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  updateProvider = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name } = req.body;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing provider id' });
    }
    try {
      const provider = await this.service.updateProvider(id, { name });
      if (!provider) return res.status(404).json({ error: 'Provider not found' });
      res.json(provider);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };

  deleteProvider = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (typeof id !== 'string') {
      return res.status(400).json({ error: 'Invalid or missing provider id' });
    }
    try {
      const provider = await this.service.deleteProvider(id);
      if (!provider) return res.status(404).json({ error: 'Provider not found' });
      res.json({ message: 'Provider deleted', provider });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  };
}
