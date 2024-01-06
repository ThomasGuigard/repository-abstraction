import {IBookRepository} from "../../domain/books/book.repository";
import {Book} from "../../domain/books/book";
import {Books} from "../../domain/books/books";

export class InMemoryBookRepository implements IBookRepository {
  private _books = new Set<Book>;

  add(book: Book): Promise<Book> {
    this._books.add(book);

    return Promise.resolve(book);
  }

  all(): Promise<Books> {
    const books: Books = new Books(Array.from(this._books));

    return Promise.resolve(books);
  }

  byName(name: string): Promise<Book | undefined> {
    const book: Book | undefined = Array.from(this._books).find(book => book.name === name);

    return Promise.resolve(book);
  }

}