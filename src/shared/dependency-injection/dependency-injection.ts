import {InMemoryBookRepository} from "../../implementations/in-memory/in-memory-book.repository";
import {DatasourceTypeEnum} from "./enums/datasource-type.enum";
import {MissingEnvVariableError} from "../errors/missing-env-variable.error";
import {IBookRepository} from "../../domain/books/book.repository";
import {DatasourceTypeNotImplemented} from "./errors/datasource-type-not-implemented.error";
import {PrismaBookRepository} from "../../implementations/prisma/prisma-book.repository";

if (!process.env.BOOK_REPOSITORY_DATASOURCE) {
  throw new MissingEnvVariableError("BOOK_REPOSITORY_DATASOURCE");
}

const bookRepositoryDatasource: DatasourceTypeEnum = DatasourceTypeEnum.fromValue(process.env.BOOK_REPOSITORY_DATASOURCE);

if (bookRepositoryDatasource === DatasourceTypeEnum.MIKRO_ORM) {
  throw new DatasourceTypeNotImplemented(bookRepositoryDatasource)
}

const bookRepository: IBookRepository = bookRepositoryDatasource === DatasourceTypeEnum.IN_MEMORY
  ? new InMemoryBookRepository()
  : new PrismaBookRepository();

const dependencyInjection = {
  bookRepository,
};

console.log("DI Initialized");

export {
  dependencyInjection,
}