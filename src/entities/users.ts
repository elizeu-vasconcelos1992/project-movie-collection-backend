import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Movies } from "./movies";
import { Categories } from "./categories";

@Entity("users")
export class Users {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 50, unique: true })
  email: string;

  @Column({ length: 120 })
  @Exclude()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Movies, userMovies => userMovies.user)
  userMovies: Movies[];

  @OneToMany(
    () => Categories,
    userMoviesCategories => userMoviesCategories.user
  )
  userMoviesCategories: Categories[];
}
