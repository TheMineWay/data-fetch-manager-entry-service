import { DataType } from "../types";

type Model<T extends object> = Record<
  keyof T,
  {
    dataType: DataType;
    disableQuery?: boolean;
    isSearchable?: boolean;
  }
>;

export class DataModelDefinition<T extends object> {
  constructor(private readonly model: Model<T>) {}

  getKeys = () =>
    Object.keys(this.model).filter(
      (key) => !this.model[key].disableQuery
    ) as (keyof T)[];
  getSearchableKeys = () =>
    this.getKeys().filter((key) => this.model[key].isSearchable);
}
