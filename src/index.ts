import {getDependencies} from "./shared/dependency-injection";

require('dotenv').config()

import {LibraryManager} from "./app/library-manager";

const app = async (): Promise<void> => {
  const dependencies = await getDependencies();

  const libraryManager = new LibraryManager(
    dependencies.bookRepository,
  );

  await libraryManager.addBookToLibrary({name: "Clean Code"});
  await libraryManager.addBookToLibrary({name: "Hellblazer"});
  await libraryManager.addBookToLibrary({name: "Ultimate Spider-Man"});

  const hellblazer = await libraryManager.getBookFromLibrary({name: "Hellblazer"});
  console.log(`Here's your comic : ${hellblazer.name}`);

  const books = await libraryManager.getAllBooksFromLibrary();
  console.table(books.items);
}

app();