import { Exclude } from "class-transformer";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Categories } from "./categories";
import { Users } from "./users";

@Entity("movies")
export class Movies {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 120 })
  image: string;

  @Column({ type: "date" })
  release: string;

  @Column({ length: 400 })
  sinopse: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Users)
  @Exclude()
  user: Users;

  @ManyToOne(() => Categories, { eager: true })
  category: Categories;
}
