import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProduitDto } from "src/dto/create-produit.dto";
import { ProduitEntity } from "src/entities/produit.entity";
import { UserService } from "src/users/users.service";
import { Repository } from "typeorm";

@Injectable()
export class ProduitService {
    constructor(
        @InjectRepository(ProduitEntity)
        private ProduitRepository: Repository<ProduitEntity>,
    ) {
    }

    async findOneProduct(id: number) {
        const findproduit = await this.ProduitRepository.findOne(id);
        if (!findproduit) {
            throw new NotFoundException(`Le produit d'id ${id} n'existe pas`);
        }
        return findproduit;
    }
    async createProduit(produit: ProduitDto): Promise<ProduitEntity> {
        return await this.ProduitRepository.save(produit);
    }
    async findAllProduct(): Promise<ProduitEntity[]> {
        return await this.ProduitRepository.find();
    }
}