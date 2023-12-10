export interface DataFetchEntryDTO {
  // Sorting
  sort?: string; // JSON array string

  // Filtering
  filters?: string; // JSON string

  // Pagination
  limit?: string;
  offset?: string;
}
