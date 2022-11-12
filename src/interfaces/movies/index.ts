export interface IMovieRequest {
  name: string;
  image: string;
  release: string;
  sinopse: string;
  category: string;
}

export interface IMovie {
  id: string;
  name: string;
  image: string;
  release: string;
  sinopse: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMovieUpdate {
  name?: string;
  image?: string;
  release?: string;
  sinopse?: string;
}
