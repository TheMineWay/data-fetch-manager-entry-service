import { Filter } from "./filter.type";
import { Sort } from "./sort.type";

export interface DataFetchEntryObject<T extends object> {
  filters?: Filter;
  sort?: Sort<T>;
  limit?: number;
  offset?: number;
}
