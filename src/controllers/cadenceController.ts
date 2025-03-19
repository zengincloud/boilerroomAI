import { Request, Response } from 'express';
import { prisma } from '../lib/prisma'; // Assuming you're using Prisma as ORM

export class CadenceController {
  // Get all cadences
  async getAllCadences(req: Request, res: Response) {
    try {
      const cadences = await prisma.cadence.findMany({
        include: {
          steps: true,
        },
      });
      return res.status(200).json(cadences);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch cadences' });
    }
  }

  // Create new cadence
  async createCadence(req: Request, res: Response) {
    try {
      const { name, steps } = req.body;
      
      const newCadence = await prisma.cadence.create({
        data: {
          name,
          steps: {
            create: steps,
          },
          active: 0,
          completed: 0,
        },
      });
      
      return res.status(201).json(newCadence);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to create cadence' });
    }
  }

  // Get cadence by ID
  async getCadenceById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cadence = await prisma.cadence.findUnique({
        where: { id: Number(id) },
        include: { steps: true },
      });
      
      if (!cadence) {
        return res.status(404).json({ error: 'Cadence not found' });
      }
      
      return res.status(200).json(cadence);
    } catch (error) {
      return res.status(500).json({ error: 'Failed to fetch cadence' });
    }
  }
} 