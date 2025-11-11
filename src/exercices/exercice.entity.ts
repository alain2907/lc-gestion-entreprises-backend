import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { Entreprise } from '../entreprises/entreprise.entity';

@Entity('exercices')
export class Exercice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  entreprise_id: number;

  @ManyToOne(() => Entreprise)
  @JoinColumn({ name: 'entreprise_id' })
  entreprise: Entreprise;

  @Column({ type: 'int' })
  annee: number;

  @Column({ type: 'date' })
  date_debut: Date;

  @Column({ type: 'date' })
  date_fin: Date;

  @Column({ type: 'boolean', default: false })
  cloture: boolean;

  @CreateDateColumn()
  date_creation: Date;
}
