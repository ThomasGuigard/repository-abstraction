import {app as consoleApp} from "./infrastructure/primary/console-app/app";

require('dotenv').config()

const run = async (): Promise<void> => {

  await consoleApp();
}

run();