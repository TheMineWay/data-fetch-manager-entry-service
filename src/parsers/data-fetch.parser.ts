import { object, string } from "yup";
import { DataFetchEntryDTO } from "../dto";
import { Sort } from "../types";
import { DataFetchEntryObject } from "../types/data-fetch-entry-object.type";

type Options<T extends object> = { keys: (keyof T)[] };

const filtersSchema = object({
  search: string().optional(),
});

export class DataFetchParser<T extends object> {
  constructor(
    private readonly dto: DataFetchEntryDTO,
    private readonly options: Options<T>
  ) {}

  parse = () => {
    const {
      filters: rawFilters,
      limit: rawLimit,
      offset: rawOffset,
      sort: rawSort,
    } = this.dto;

    const filters = rawFilters
      ? filtersSchema.cast(JSON.parse(rawFilters), { stripUnknown: true })
      : undefined;
    const limit = rawLimit ? Math.abs(+rawLimit) : undefined;
    const offset = rawOffset ? Math.abs(+rawOffset) : undefined;
    const sort = rawSort ? this.parseSort(JSON.parse(rawSort)) : undefined;

    return {
      filters,
      limit,
      offset,
      sort,
    } as DataFetchEntryObject<T>;
  };

  private parseSort = (rawSort: [string, string][]) => {
    if (!Array.isArray(rawSort)) return [];

    // Clean array from strange values
    return rawSort.filter(
      (sort) =>
        Array.isArray(sort) &&
        sort.length === 2 &&
        sort.filter((s) => typeof s === "string") &&
        this.options.keys.includes(sort[0] as keyof T) &&
        ["asc", "desc"].includes(sort[1])
    ) as Sort<T>;
  };
}
