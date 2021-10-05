import { Model, ModelObject } from 'objection';

export default class Book extends Model {
  id!: string;
  name!: string;
  author!: string;

  static tableName = 'book'; // database table name
  static idColumn = 'id'; // id column name
}

export type BookShape = ModelObject<Book>;
