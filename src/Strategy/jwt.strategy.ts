import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';
import { PayloadInterface } from 'src/Interface/payload.interface';
import { jwtConstants } from 'src/Constants/constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private AuthRepository: Repository<UserEntity>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: PayloadInterface) {
    const user = await this.AuthRepository.findOne({username: payload.username});
    const user1 = console.log(user)
    const payload1 = console.log(payload)

    if (user){
      const {password, ...result} = user;
      console.log(result);
    }else{

      throw new UnauthorizedException();
    }
  }
}