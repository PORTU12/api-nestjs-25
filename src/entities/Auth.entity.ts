import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AuthEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 50
      })
      firstname: string;

      @Column({
        name: 'name',
        length: 50
      })
      lastname: string;
    
}