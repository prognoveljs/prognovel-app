export interface PostAttributes {
  title: string;
  author: string;
  createdAt?: string;
  modifiedAt?: string;
  tags?: string | string[];
  cover?: string;
  authors: string;
}

export interface Post {
  title: string;
  attributes: PostAttributes;
  slug: string;
  html: string;
  authors: string;
}
