export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
  // paginatedResult: import("/Users/eyad.alhamza.local/Documents/Projects/College Projects/Gate-Pass-SPA/src/app/shared/models/admin/visitDetails").VisitDetails4Admin;
}
