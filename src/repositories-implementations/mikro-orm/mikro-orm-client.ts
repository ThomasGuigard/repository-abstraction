import {EntityManager, MikroORM} from "@mikro-orm/core";
import {MissingEnvVariableError} from "../../shared/errors/missing-env-variable.error";
import config from "./mikro-orm.config";

export class MikroOrmClient {
  private _entityManager: EntityManager;

  constructor(entityManager: EntityManager) {
    this._entityManager = entityManager;
  }

  static async initialize() {
    if (!process.env.DATABASE_URL) {
      throw new MissingEnvVariableError("DATABASE_URL");
    }

    const orm = await MikroORM.init(config);

    return new MikroOrmClient(orm.em);
  }

  get entityManager() {
    return this._entityManager;
  }
}

let mikroOrmClient: MikroOrmClient | null = null;

const getMikroOrmClient = async (): Promise<MikroOrmClient> => {
  if (!mikroOrmClient) mikroOrmClient = await MikroOrmClient.initialize();

  return mikroOrmClient;
}

export {
  getMikroOrmClient,
}