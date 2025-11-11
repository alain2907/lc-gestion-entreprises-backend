import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercice } from './exercice.entity';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';

@Injectable()
export class ExercicesService {
  constructor(
    @InjectRepository(Exercice)
    private readonly exerciceRepository: Repository<Exercice>,
  ) {}

  async create(createExerciceDto: CreateExerciceDto): Promise<Exercice> {
    const exercice = this.exerciceRepository.create(createExerciceDto);
    return await this.exerciceRepository.save(exercice);
  }

  async findAll(): Promise<Exercice[]> {
    return await this.exerciceRepository.find({
      relations: ['entreprise'],
      order: { annee: 'DESC' },
    });
  }

  async findByEntreprise(entreprise_id: number): Promise<Exercice[]> {
    return await this.exerciceRepository.find({
      where: { entreprise_id },
      relations: ['entreprise'],
      order: { annee: 'DESC' },
    });
  }

  async findOpen(entreprise_id?: number): Promise<Exercice[]> {
    const where: any = { cloture: false };
    if (entreprise_id) {
      where.entreprise_id = entreprise_id;
    }

    return await this.exerciceRepository.find({
      where,
      relations: ['entreprise'],
      order: { annee: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Exercice> {
    const exercice = await this.exerciceRepository.findOne({
      where: { id },
      relations: ['entreprise'],
    });

    if (!exercice) {
      throw new NotFoundException(`Exercice with ID ${id} not found`);
    }

    return exercice;
  }

  async update(
    id: number,
    updateExerciceDto: UpdateExerciceDto,
  ): Promise<Exercice> {
    const exercice = await this.findOne(id);
    Object.assign(exercice, updateExerciceDto);
    return await this.exerciceRepository.save(exercice);
  }

  async remove(id: number): Promise<void> {
    const exercice = await this.findOne(id);
    await this.exerciceRepository.remove(exercice);
  }

  async close(id: number): Promise<Exercice> {
    const exercice = await this.findOne(id);
    exercice.cloture = true;
    return await this.exerciceRepository.save(exercice);
  }

  async reopen(id: number): Promise<Exercice> {
    const exercice = await this.findOne(id);
    exercice.cloture = false;
    return await this.exerciceRepository.save(exercice);
  }
}
