import {Book} from "./book";

export class Books {
  private _items: Array<Book>;

  constructor(books: Array<Book>) {
    this._items = books;
  }

  get items(): Array<Book> {
    return this._items;
  }
}