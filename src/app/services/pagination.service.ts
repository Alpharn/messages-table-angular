import { Injectable } from '@angular/core';

/**
 * Service to manage pagination state.
 * This service provides methods to set and retrieve the current page index and page size,
 * which can be used across the application to maintain consistent pagination settings.
 */
@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private pageIndex: number = 0;
  private pageSize: number = 10;

  /**
   * This method updates the page index used for pagination
   *
   * @param index The new page index to be set.
   */
  setPageIndex(index: number) {
    this.pageIndex = index;
  }

  /**
   * This method updates the page size used for pagination.
   *
   * @param size The new page size to be set.
   */
  setPageSize(size: number) {
    this.pageSize = size;
  }

  /**
   * This method returns the currently set page index value.
   *
   * @returns The current page index.
   */
  getPageIndex() {
    return this.pageIndex;
  }

  /**
   * This method returns the currently set page size value.
   *
   * @returns The current page size.
   */
  getPageSize() {
    return this.pageSize;
  }
}