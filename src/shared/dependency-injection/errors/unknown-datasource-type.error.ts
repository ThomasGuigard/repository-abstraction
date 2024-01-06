export class UnknownDatasourceTypeError extends Error {

  constructor(passedDatasource: string) {
    super(`Unknown datasource has been passed : ${passedDatasource}`);
  }
}