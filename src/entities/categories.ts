import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Movies } from "./movies";
import { Users } from "./users";

@Entity("categories")
export class Categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 60 })
  name: string;

  @OneToMany(() => Movies, categoryMovies => categoryMovies.category)
  categoryMovies: Movies[];

  @ManyToOne(() => Users)
  user: Users;
}
