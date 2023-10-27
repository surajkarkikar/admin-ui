import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() deleteRow = new EventEmitter<any>();
  @Output() pagination = new EventEmitter<any>();
  pageNumbers: any;

  constructor() {}

  ngOnInit(): void {

  }
  onClickOfDeleteSelected() {
    this.deleteRow.emit();
  }

  paginationEvent(source: any) {
    this.pagination.emit(source);
  }
}
