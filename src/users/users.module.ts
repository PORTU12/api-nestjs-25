import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { JwtStrategy } from 'src/Strategy/jwt.strategy';
import { UserController } from './users.controller';
import { UserService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  PassportModule.register({ defaultStrategy: 'jwt' }),
  JwtModule.register({
    secret: process.env.SECRET, //jwtConstants.secret,
    signOptions: { expiresIn: 3600 },
  }), ConfigModule,
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy]
})
export class UsersModule { }
