
interface IBookParams {
  name: string;
}

export class Book {
  private readonly _name: string;

  constructor(params: IBookParams) {
    this._name = params.name;
  }

  get name(): string {
    return this._name;
  }
}