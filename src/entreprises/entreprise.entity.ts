import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exercice } from '../exercices/exercice.entity';

@Entity('entreprises')
export class Entreprise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  raison_sociale: string;

  @Column({ type: 'varchar', length: 14, nullable: true })
  siret: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  forme_juridique: string;

  @Column({ type: 'text', nullable: true })
  adresse: string;

  @Column({ type: 'varchar', length: 5, nullable: true })
  code_postal: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ville: string;

  @Column({ type: 'varchar', length: 20, nullable: true })
  telephone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  email: string;

  @Column({ type: 'decimal', precision: 15, scale: 2, nullable: true })
  capital_social: number;

  @Column({ type: 'varchar', length: 20, nullable: true })
  numero_tva_intra: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  code_naf: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  regime_fiscal: string;

  @Column({ type: 'text', nullable: true })
  notes: string;

  @Column({ type: 'boolean', default: true })
  actif: boolean;

  @OneToMany(() => Exercice, (exercice) => exercice.entreprise)
  exercices: Exercice[];

  @CreateDateColumn()
  date_creation: Date;

  @UpdateDateColumn()
  date_modification: Date;
}
