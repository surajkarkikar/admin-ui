import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1;
  @Input() total: number = 0;
  @Input() pageLimit: number = 10;
  @Output() deleteRow = new EventEmitter<any>();
  @Output() changePage = new EventEmitter<any>();
  pages: number[] = [];

  constructor() {}

  ngOnChanges(changes: any): void {
    if(changes?.total){
      const pagesCount = Math.ceil(this.total / this.pageLimit);
      this.pages = this.range(1, pagesCount);
    }
  }

  onClickOfDeleteSelected() {
    this.deleteRow.emit();
  }

  paginationEvent(source: any, currentPage?: any) {
    switch (source) {
      case 'NEXT_PAGE':
        if (this.currentPage < this.pages.length) {
          this.currentPage += 1;
        }
        break;
      case 'PREVIOUS_PAGE':
        if (this.currentPage > 1) {
          this.currentPage -= 1;
        }
        break;
      case 'FIRST_PAGE':
        this.currentPage = 1;
        break;
      case 'LAST_PAGE':
        this.currentPage = this.pages.length;
        break;
      case 'CURRENT_PAGE':
        this.currentPage = currentPage;
        break;
    }
    this.changePage.emit(this.currentPage);
  }

  range(start: number, end: number) {
    return [...Array(end).keys()].map((el: any) => el + start);
  }
}
