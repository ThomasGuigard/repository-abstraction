import {Book, Books, IBookRepository} from "../../domain/books";
import {PrismaClient} from "@prisma/client";

export class PrismaBookRepository implements IBookRepository {
  private readonly _prismaClient;

  constructor() {
    this._prismaClient = new PrismaClient();
  }

  async add(book: Book): Promise<Book> {
    const bookEntity = await this._prismaClient.bookEntity.create({
      data : {
        name: book.name,
      },
    });

    return new Book({name: bookEntity.name});
  }

  async all(): Promise<Books> {
    const bookEntities = await this._prismaClient.bookEntity.findMany();
    const bookList = bookEntities.map(entity => new Book({name: entity.name}));

    return new Books(bookList);
  }

  async byName(name: string): Promise<Book | null> {
    const bookEntity = await this._prismaClient.bookEntity.findFirst(
      { where: { name: name }}
    );

    if (!bookEntity) return null;

    return new Book({name: bookEntity.name});
  }

}