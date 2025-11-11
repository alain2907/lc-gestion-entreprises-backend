import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntreprisesController } from './entreprises.controller';
import { EntreprisesService } from './entreprises.service';
import { Entreprise } from './entreprise.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entreprise])],
  controllers: [EntreprisesController],
  providers: [EntreprisesService],
  exports: [EntreprisesService],
})
export class EntreprisesModule {}
