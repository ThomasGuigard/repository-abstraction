import {Book, Books, IBookRepository} from "../domain/books";
import {BookToAdd} from "./book-to-add";
import {BookToFind} from "./book-to-find";
import {BookNotFoundError} from "./errors/book-not-found.error";


export class LibraryManager {

  constructor(
    private bookRepository: IBookRepository,
  ) {
  }

  async addBookToLibrary(bookToAdd: BookToAdd): Promise<void> {
    const book: Book = new Book({name: bookToAdd.name});

    await this.bookRepository.add(book);
  }

  async getBookFromLibrary(bookToFind: BookToFind): Promise<Book> {
    const book: Book | null = await this.bookRepository.byName(bookToFind.name);

    if (!book) {
      throw new BookNotFoundError(bookToFind);
    }

    return book;
  }

  async getAllBooksFromLibrary(): Promise<Books> {
    return this.bookRepository.all();
  }
}