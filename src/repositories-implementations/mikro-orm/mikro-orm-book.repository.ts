import {MikroOrmClient} from "./mikro-orm-client";
import {Book, Books, IBookRepository} from "../../domain/books";
import {BookEntity} from "./entities/book-entity";
import {EntityRepository} from "@mikro-orm/core";

export class MikroOrmBookRepository implements IBookRepository {
  private _bookRepository:  EntityRepository<BookEntity>;

  constructor(microOrmClient: MikroOrmClient) {
    this._bookRepository = microOrmClient.entityManager.fork().getRepository<BookEntity>("BookEntity");
  }

  async add(book: Book): Promise<Book> {
    const bookEntity = new BookEntity(book.name);

    await this._bookRepository.nativeInsert(bookEntity);

    return book;
  }

  async all(): Promise<Books> {
    const bookEntities = await this._bookRepository.findAll({
      populate: [],
    });
    const bookList = bookEntities.map(entity => new Book({name: entity.name}));

    return new Books(bookList);
  }

  async byName(name: string): Promise<Book | null> {
    const bookEntity = await this._bookRepository.findOne({ name: name }, {
      populate: true
    });

    if (!bookEntity) return null;

    return new Book({name: bookEntity.name});
  }

}