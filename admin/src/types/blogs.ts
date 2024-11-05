export interface Blog {
  imageUrl: any;
  _id: string;
  title: string;
  author: string;
  content: string;
  summary: string;
  tags: string[];
  publishedDate: Date;
  status: string;
  categories: string[];
  comments: Comment[];
  likes: number;
  image: string;
  slug: string;
}

export interface Comment {
  user: string;
  comment: string;
  date: Date;
}
