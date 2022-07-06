import { HttpException, HttpStatus, Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from "typeorm";
import { UpdateUserDto } from "src/dto/update-user.dto";
import { AuthEntity } from "src/entities/Auth.entity";
import { UserDto } from "src/dto/create-user.dto";

@Injectable()
/*We add five methods in our service,*/
export class AuthService {
  constructor(@InjectRepository(AuthEntity)
  private authRepository: Repository<AuthEntity>) {}
  
  async getById(id: number) {
    const user = await this.authRepository.findOne({ id });
    if (user) {
      return user;
    }
    throw new HttpException(`Cet utilisateur n'existe pas`, HttpStatus.NOT_FOUND);
  }
 
  async create(userData: UserDto) : Promise<AuthEntity>{
    return this.authRepository.save(userData);
  }

  async findAll(): Promise<AuthEntity[]>{
    return this.authRepository.find();
  }

  update(id: number, updateBookDto: UpdateUserDto): Promise<AuthEntity>{
    const updateUser = this.getById(id)
    return updateUser;
  }

  delete(id: number) : Promise<AuthEntity> {
    const deleteUser = this.getById(id)
    return deleteUser;
  }
}