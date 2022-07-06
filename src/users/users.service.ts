import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from 'src/dto/LoginCredentialsDto';
import { UserSubscribeDto } from 'src/dto/UserSubscribe.dto';
import * as bcrypt from 'bcrypt'
//import { UserRoleEnum } from '../enums/user-role.enum';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
        private jwtService: JwtService
    ) { }

    async register(userData: UserSubscribeDto): Promise<UserEntity> {
        const user = this.userRepository.create({
            ...userData
        });
        const salt = 10;
        user.password = await bcrypt.hash(user.password, salt);
        try {
            await this.userRepository.save(user);
        } catch (error) {
            throw new ConflictException(`Le username et le email doivent être unique`);
        } return user;
    }

    async login(credentials: LoginCredentialsDto) {

        // Récupére le login et le mot de passe
        const { username, password } = credentials;
        // On peut se logger ou via le username ou le password
        // Vérifier est ce qu'il y a un user avec ce login ou ce mdp
        const user = await this.userRepository.createQueryBuilder("user")
            .where("user.username = :username or user.email = :username",
                { username }
            )
            .getOne();
        // console.log(user);
        // Si not user je déclenche une erreur

        if (!user)
            throw new NotFoundException('username ou password erronée');
        // Si oui je vérifie est ce que le mot est correct ou pas
        const hashedPassword = await password;
        if (hashedPassword === user.password) {
            const payload = {
                username: user.username,
                email: user.email,
                role: user.role
            };
            const jwt = await this.jwtService.sign(payload);
            return {
                "access_token": jwt
            };
        } else {
            // Si mot de passe incorrect je déclenche une erreur
            throw new NotFoundException('username ou password mp');
        }

    }
    async findAll(): Promise<UserEntity[]>{
        return this.userRepository.find()
    }
}