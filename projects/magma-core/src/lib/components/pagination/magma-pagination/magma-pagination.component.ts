import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'magma-pagination',
  standalone: false,
  templateUrl: './magma-pagination.component.html',
  styleUrl: './magma-pagination.component.scss'
})
export class MagmaPaginationComponent {

  @Input() totalItems = 0
  @Input() pageSize = 10
  @Input() currentPage = 1

  @Output() pageChange = new EventEmitter<number>()

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize)
  }

  get displayPages(): (number | string)[] {
    const pages: (number | string)[] = []

    if (this.totalPages === 0) {
      return pages
    }

    const prevPage = this.currentPage - 1
    const nextPage = this.currentPage + 1

    if (prevPage > 1 && this.totalPages != 3) {
      pages.push(1)
      pages.push('space')
    }

    if (this.currentPage > 1) {
      if (this.currentPage == this.totalPages && (prevPage - 1 > 0)) {
        pages.push(prevPage - 1)
      }
      pages.push(prevPage)
    }

    // Always show current page
    pages.push(this.currentPage)

    // Show next page if it's not the last page
    if (nextPage <= this.totalPages - 1) {
      pages.push(nextPage)

      if (this.currentPage == 1 && (nextPage <= this.totalPages - 1)) {
        pages.push(nextPage + 1)
      }
      if (this.totalPages != 3){
        pages.push('space')
      }
    } else if (nextPage === this.totalPages) {
      pages.push(nextPage)
    }

    // Always show last page (if it's not already included)
    if (!pages.includes(this.totalPages)) {
      pages.push(this.totalPages)
    }

    return pages
  }

  changePage(page: number|string, action: string) {

    if ((this.currentPage === 1 && action == 'prev') || (this.currentPage === this.totalPages && action == 'next')) {
      return
    }

    let p = Number(page)
    if (p < 1 || p > this.totalPages || page === this.currentPage) return
    this.currentPage = p
    this.pageChange.emit(this.currentPage)
  }

}
