import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { ProduitDto } from 'src/dto/create-produit.dto';
import { ProduitEntity } from 'src/entities/produit.entity';
import { ProduitService } from './produit.service';

@Controller('produit')
export class ProduitController {
    constructor(private readonly produitService: ProduitService) { }

    @Get()
    //@UseGuards(JwtAuthGuard)
    async AfficheDesProduits(/*@User() request: UserEntity*/) : Promise<ProduitEntity[]>{
        return await this.produitService.findAllProduct();
    }
    @Get(':id')
    AfficheUnProduit(@Param('id', ParseIntPipe) id): Promise<ProduitEntity> {
        return this.produitService.findOneProduct(id);
    }



    // Chercher le nombre de produit par age
    /*@Get('stats')
    @UseGuards(JwtAuthGuard)
    async statsCvNumberByAge() {
        return await this.produitService.statCvNumberByAge();
    }

    @Get('recover/:id')
    @UseGuards(JwtAuthGuard)
    async restoreCv(
        @Param('id', ParseIntPipe) id: number,
        //@User() user
    ) {
        return await this.produitService.restoreCv(id, user);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteCv(
        @Param('id', ParseIntPipe) id: number,
        @User() user
    ) {
        return this.produitService.softDeleteCv(id, user);
    }*/

    @Post()
    //@UseGuards(JwtAuthGuard)
    async Ajoutproduit(@Body() produit: ProduitDto ) : Promise<ProduitEntity>{
        return await this.produitService.createProduit(produit);
    }
}
