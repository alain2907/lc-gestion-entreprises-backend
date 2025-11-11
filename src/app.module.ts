import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EntreprisesModule } from './entreprises/entreprises.module';
import { ExercicesModule } from './exercices/exercices.module';
import { Entreprise } from './entreprises/entreprise.entity';
import { Exercice } from './exercices/exercice.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'production',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        console.log('🔍 DATABASE_URL présent?', !!process.env.DATABASE_URL);

        return {
          type: 'postgres' as const,
          url: process.env.DATABASE_URL,
          entities: [Entreprise, Exercice],
          synchronize: true, // dev uniquement - désactiver en prod !
          logging: false,
          ssl: process.env.NODE_ENV === 'production'
            ? { rejectUnauthorized: false }
            : false,
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
