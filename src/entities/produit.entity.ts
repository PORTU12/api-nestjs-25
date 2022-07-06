import { ManyToOne, Entity, PrimaryGeneratedColumn, Column} from 'typeorm';
import { TimestampEntites } from './timestamp-entites';
import { UserEntity } from './user.entity';

@Entity()
export class ProduitEntity extends TimestampEntites {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    length: 50
  })
  prodname: string;

  @Column()
  price: number;

  /*@Column()
  age: number;

  @Column()
  cin: number;

  @Column()
  job: string;

  @Column()
  path: string;*/

  @ManyToOne(
    type => UserEntity,
    (user) => user.produits,
    {
      cascade: true,
      nullable: true,
      eager: true
    }
  )
  user: UserEntity;

}