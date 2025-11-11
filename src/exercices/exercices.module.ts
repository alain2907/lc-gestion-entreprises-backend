import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExercicesController } from './exercices.controller';
import { ExercicesService } from './exercices.service';
import { Exercice } from './exercice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exercice])],
  controllers: [ExercicesController],
  providers: [ExercicesService],
  exports: [ExercicesService],
})
export class ExercicesModule {}
