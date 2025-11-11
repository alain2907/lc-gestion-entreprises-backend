import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ExercicesService } from './exercices.service';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';

@Controller('exercices')
export class ExercicesController {
  constructor(private readonly exercicesService: ExercicesService) {}

  @Post()
  create(@Body() createExerciceDto: CreateExerciceDto) {
    return this.exercicesService.create(createExerciceDto);
  }

  @Get()
  findAll() {
    return this.exercicesService.findAll();
  }

  @Get('entreprise/:entreprise_id')
  findByEntreprise(@Param('entreprise_id', ParseIntPipe) entreprise_id: number) {
    return this.exercicesService.findByEntreprise(entreprise_id);
  }

  @Get('open')
  findOpen(@Query('entreprise_id') entreprise_id?: number) {
    return this.exercicesService.findOpen(entreprise_id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.exercicesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateExerciceDto: UpdateExerciceDto,
  ) {
    return this.exercicesService.update(id, updateExerciceDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.exercicesService.remove(id);
  }

  @Patch(':id/close')
  close(@Param('id', ParseIntPipe) id: number) {
    return this.exercicesService.close(id);
  }

  @Patch(':id/reopen')
  reopen(@Param('id', ParseIntPipe) id: number) {
    return this.exercicesService.reopen(id);
  }
}
