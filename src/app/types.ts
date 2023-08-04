export interface Book {
  imageUrl: string;
  title: string;
  purchaseLink: string;
  PublishDate: string;
}
export interface Author {
  author: string;
  birthday: string;
  birthPlace: string;
  books: Book[];
}

export interface Response {
  data: Author;
  status: string;
}
