import { OneToMany, Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { TimestampEntites } from './timestamp-entites';
import { UserRoleEnum } from 'src/users/enum/user-role.enum';
import { ProduitEntity } from './produit.entity';

@Entity()
export class UserEntity extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
    unique: true
  })
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    default: UserRoleEnum.USER
  })
  role: string;

 @OneToMany(
    type => ProduitEntity,
    (produit) => produit.user,
    {
      nullable: true,
      cascade: false
    }
  )
  produits: ProduitEntity[];
}
