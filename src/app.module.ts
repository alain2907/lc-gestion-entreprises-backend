import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntreprisesModule } from './entreprises/entreprises.module';
import { ExercicesModule } from './exercices/exercices.module';
import { Entreprise } from './entreprises/entreprise.entity';
import { Exercice } from './exercices/exercice.entity';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: false,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        const dbPath = path.resolve(
          __dirname,
          '..',
          process.env.DATABASE_PATH || '../../comptabilite-france/backend/data/comptabilite.sqlite'
        );

        console.log('🔍 SQLite database path:', dbPath);

        return {
          type: 'better-sqlite3' as const,
          database: dbPath,
          entities: [Entreprise, Exercice],
          synchronize: false, // Ne pas modifier la structure de la base existante
          logging: true,
        };
      },
    }),
    EntreprisesModule,
    ExercicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
