import {Options} from "@mikro-orm/core";


const config: Options = {
  entities: ['./dist/entities'], // path to our JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/infrastructure/secondary/mikro-orm/entities'], // path to our TS entities (src), relative to `baseDir`
  type: 'postgresql',
  clientUrl: process.env.DATABASE_URL,
};

export default config;