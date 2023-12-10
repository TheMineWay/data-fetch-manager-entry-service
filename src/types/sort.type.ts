export type Sort<T extends object> = [keyof T, "asc" | "desc"][];
