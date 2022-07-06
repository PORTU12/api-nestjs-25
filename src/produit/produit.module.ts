import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProduitEntity } from 'src/entities/produit.entity';
import { ProduitController } from './produit.controller';
import { ProduitService } from './produit.service';

@Module({
  imports:[TypeOrmModule.forFeature([ProduitEntity])],
  controllers: [ProduitController],
  providers: [ProduitService]
})
export class ProduitModule {}
