import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  @Input() listOfData: any;
  @Output() deleteRow = new EventEmitter<any>();
  @Output() editRow = new EventEmitter<any>();
  @Output() updateData = new EventEmitter<any>();
  @Output() paginationEvent = new EventEmitter<any>();
  currentPage: number = 1;
  checked: any;
  constructor(private notification: NzNotificationService) {}

  ngOnInit(): void {}

  onSelectAll($event: any) {
    this.listOfData = this.listOfData.map((res: any, index: number) => {
      return {
        ...res,
        checked: index < 10 ? $event : false,
      };
    });
  }

  delete(data: any) {
    this.deleteRow.emit(data);
  }

  edit(data: any) {
    this.editRow.emit(data);
  }

  onSelectOfDeleteRow() {
    this.checked = false;
    const initialLength = this.listOfData.length;
    this.listOfData = this.listOfData.filter((res: any) => !res.checked);
    if (this.listOfData.length === initialLength) {
      this.notification.create(
        'warning',
        'No rows selected',
        'Please check rows to delete'
      );
    }
    this.updateData.emit(this.listOfData);
  }

  changePagination(event: any) {
    this.currentPage = event;
    this.paginationEvent.emit(event);
  }
}
