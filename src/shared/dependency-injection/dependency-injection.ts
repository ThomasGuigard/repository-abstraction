import {DatasourceTypeEnum} from "./enums/datasource-type.enum";
import {MissingEnvVariableError} from "../errors/missing-env-variable.error";
import {IBookRepository} from "../../domain/books";
import {InMemoryBookRepository} from "../../repositories-implementations/in-memory";
import {PrismaBookRepository} from "../../repositories-implementations/prisma";
import {MikroOrmBookRepository, getMikroOrmClient} from "../../repositories-implementations/mikro-orm";

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