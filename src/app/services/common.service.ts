import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from '../../environment';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';
import { Author, Book, Response } from '../types';

@Injectable({ providedIn: 'root' })
export class CommonService {
  private BASE_URL = env.BASE_URL;
  author$ = new BehaviorSubject<Author | null>(null);
  isError = false;
  constructor(private http: HttpClient) {}

  getAuthors() {
    this.http
      .get<Response>(`${this.BASE_URL}/api-fun/books.json`)
      .pipe(
        tap((resp) => {
          const author = resp.status === 'success' ? resp.data : null;
          this.isError = false;
          this.author$.next(author);
        }),
        catchError((_) => {
          this.isError = true;
          return of([]);
        })
      )
      .subscribe();
  }

  //method to handle sorting by book title
  sortBooksByTitle() {
    let { books } = this.author$.getValue()!;
    books.sort(({ title: title1 }, { title: title2 }) =>
      title1.localeCompare(title2)
    );
    this.emitAuthor(books);
  }
  //method to handle sorting by book PublishDate
  sortBooksByYear() {
    let { books } = this.author$.getValue()!;
    books.sort(
      ({ PublishDate: PublishDate1 }, { PublishDate: PublishDate2 }) =>
        +PublishDate1 - +PublishDate2
    );
    this.emitAuthor(books);
  }

  // method to add new book to the authors list of books
  addBook(book: Book) {
    let { books } = this.author$.getValue()!;

    this.emitAuthor([book, ...books]);
  }
  editBook(index: number, { title, PublishDate }: Book) {
    let { books } = this.author$.getValue()!;
    books[index] = { ...books[index], title, PublishDate };
    this.emitAuthor([...books]);
  }
  deleteBook(index: number) {
    let { books } = this.author$.getValue()!;
    books.splice(index, 1);
    this.emitAuthor([...books]);
  }

  emitAuthor(books: Book[]) {
    this.author$.next({ ...this.author$.getValue()!, books: [...books] });
  }
}
