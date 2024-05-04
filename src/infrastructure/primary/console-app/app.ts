import {getDependencies} from "./dependency-injection";
import {LibraryManager} from "../../../app/library-manager";
import { faker } from '@faker-js/faker';

const app = async (): Promise<void> => {
  const dependencies = await getDependencies();

  const libraryManager = new LibraryManager(
    dependencies.bookRepository,
  );

  const firstBookName = faker.word.words();

  await libraryManager.addBookToLibrary({name: firstBookName});
  await libraryManager.addBookToLibrary({name: faker.word.words()});
  await libraryManager.addBookToLibrary({name: faker.word.words()});

  const book = await libraryManager.getBookFromLibrary({name: firstBookName});
  console.log(`Here's your book : ${book.name}`);

  const books = await libraryManager.getAllBooksFromLibrary();
  console.table(books.items);
}

export {
  app,
}