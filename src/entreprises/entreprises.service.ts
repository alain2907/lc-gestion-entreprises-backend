import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entreprise } from './entreprise.entity';
import { CreateEntrepriseDto } from './dto/create-entreprise.dto';
import { UpdateEntrepriseDto } from './dto/update-entreprise.dto';

@Injectable()
export class EntreprisesService {
  constructor(
    @InjectRepository(Entreprise)
    private readonly entrepriseRepository: Repository<Entreprise>,
  ) {}

  async create(createEntrepriseDto: CreateEntrepriseDto): Promise<Entreprise> {
    const entreprise = this.entrepriseRepository.create(createEntrepriseDto);
    return await this.entrepriseRepository.save(entreprise);
  }

  async findAll(): Promise<Entreprise[]> {
    return await this.entrepriseRepository.find({
      relations: ['exercices'],
      order: { date_creation: 'DESC' },
    });
  }

  async findActive(): Promise<Entreprise[]> {
    return await this.entrepriseRepository.find({
      where: { actif: true },
      relations: ['exercices'],
      order: { raison_sociale: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Entreprise> {
    const entreprise = await this.entrepriseRepository.findOne({
      where: { id },
      relations: ['exercices'],
    });

    if (!entreprise) {
      throw new NotFoundException(`Entreprise with ID ${id} not found`);
    }

    return entreprise;
  }

  async update(
    id: number,
    updateEntrepriseDto: UpdateEntrepriseDto,
  ): Promise<Entreprise> {
    const entreprise = await this.findOne(id);
    Object.assign(entreprise, updateEntrepriseDto);
    return await this.entrepriseRepository.save(entreprise);
  }

  async remove(id: number): Promise<void> {
    const entreprise = await this.findOne(id);
    await this.entrepriseRepository.remove(entreprise);
  }

  async softDelete(id: number): Promise<Entreprise> {
    const entreprise = await this.findOne(id);
    entreprise.actif = false;
    return await this.entrepriseRepository.save(entreprise);
  }
}
