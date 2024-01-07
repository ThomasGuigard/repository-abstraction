import {Book} from "./book";
import {Books} from "./books";

export interface IBookRepository {
  byName(name: string): Promise<Book | null>;
  all(): Promise<Books>;
  add(book: Book): Promise<Book>;
}