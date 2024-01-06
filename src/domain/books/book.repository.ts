import {Book} from "./book";
import {Books} from "./books";

export interface IBookRepository {
  byName(name: string): Promise<Book | undefined>;
  all(): Promise<Books>;
  add(book: Book): Promise<Book>;
}