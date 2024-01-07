import {Entity, PrimaryKey, Property} from "@mikro-orm/core";

@Entity({
  tableName: "Book",
})
export class BookEntity {

  @PrimaryKey()
  _id!: number;

  @Property()
  name!: string;

  constructor(name: string) {
    this.name = name;
  }
}