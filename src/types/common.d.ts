type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] };

type TAuthor = {
  id: number;
  name: string;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
};
type TBook = {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string | null;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
  Author: TAuthor;
};
