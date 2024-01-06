import {BookToFind} from "../book-to-find";

export class BookNotFoundError extends Error {


  constructor(bookToFind: BookToFind) {
    super(`Didn't found book with name : ${bookToFind.name}`);
  }
}