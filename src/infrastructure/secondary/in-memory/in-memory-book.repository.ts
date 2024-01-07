import {Book, Books, IBookRepository} from "../../../domain/books";

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

  byName(name: string): Promise<Book | null> {
    const book: Book | undefined = Array.from(this._books).find(book => book.name === name);

    if (typeof book === "undefined") return Promise.resolve(null);

    return Promise.resolve(book);
  }

}