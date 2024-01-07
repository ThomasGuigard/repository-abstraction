import {InMemoryBookRepository} from "../../implementations/in-memory/in-memory-book.repository";
import {DatasourceTypeEnum} from "./enums/datasource-type.enum";
import {MissingEnvVariableError} from "../errors/missing-env-variable.error";
import {IBookRepository} from "../../domain/books/book.repository";
import {PrismaBookRepository} from "../../implementations/prisma/prisma-book.repository";
import {MikroOrmBookRepository} from "../../implementations/mikro-orm/mikro-orm-book.repository";
import {getMikroOrmClient} from "../../implementations/mikro-orm/mikro-orm-client";

const loadDependencies = async () => {
  if (!process.env.BOOK_REPOSITORY_DATASOURCE) {
    throw new MissingEnvVariableError("BOOK_REPOSITORY_DATASOURCE");
  }

  const bookRepositoryDatasource: DatasourceTypeEnum = DatasourceTypeEnum.fromValue(process.env.BOOK_REPOSITORY_DATASOURCE);

  const bookRepository: IBookRepository = bookRepositoryDatasource === DatasourceTypeEnum.IN_MEMORY
    ? new InMemoryBookRepository()
    : bookRepositoryDatasource === DatasourceTypeEnum.PRISMA
      ? new PrismaBookRepository()
      : new MikroOrmBookRepository(await getMikroOrmClient());

  const dependencyInjection = {
    bookRepository,
  };

  console.log("DI Initialized");

  return dependencyInjection;
}

let dependencies: any | null = null;

const getDependencies = async () => {
  if (!dependencies) dependencies = await loadDependencies();

  return dependencies;
}

export {
  getDependencies,
}