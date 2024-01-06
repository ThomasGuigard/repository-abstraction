require('dotenv').config()

import {dependencyInjection} from "./shared/dependency-injection";
import {LibraryManager} from "./app/library-manager";

const app = async (): Promise<void> => {
  const libraryManager = new LibraryManager(
    dependencyInjection.bookRepository,
  );

  await libraryManager.addBookToLibrary({name: "Clean Code"});
  await libraryManager.addBookToLibrary({name: "Hellblazer"});
  await libraryManager.addBookToLibrary({name: "Ultimate Spider-Man"});

  const hellblazer = await libraryManager.getBookFromLibrary({name: "Hellblazer"});
  console.log(`Here's your comic : ${hellblazer.name}`);

  const books = await libraryManager.getAllBooksFromLibrary();
  console.table(books);
}

app();