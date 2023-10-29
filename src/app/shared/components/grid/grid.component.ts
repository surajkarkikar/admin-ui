import { Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit,OnChanges {
  @Input() listOfData: any=[];
  @Output() deleteRow = new EventEmitter<any>();
  @Output() editRow = new EventEmitter<any>();
  @Output() deleteSelectedRow = new EventEmitter<any>();
  @Output() paginationEvent = new EventEmitter<any>();
  currentPage: number = 1;
  checked: any;
  spliceValue={
    start:0,
    end:10
  }
  constructor(private notification: NzNotificationService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: any
    ): void {
      if(changes?.listOfData){
        this.currentPage=1;
        this.updateSplicingValue();
      }
    
  }

 

  onSelectAll($event: any) {
    this.listOfData.forEach((res: any, index: number) => {
      if(index>=this.spliceValue.start && index<this.spliceValue.end){
        res.checked=$event;        
      }
      else{
        res.checked=false;
      }
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
    // const initialLength = this.listOfData.length;
    // this.listOfData = this.listOfData.filter((res: any) => !res.checked);
    // if (this.listOfData.length === initialLength) {
    //   this.notification.create(
    //     'warning',
    //     'No rows selected',
    //     'Please check rows to delete'
    //   );
    // }
    this.deleteSelectedRow.emit(this.listOfData);
  }

  updateSplicingValue(){
    this.spliceValue={
      start:(this.currentPage-1)*10,
      end:((this.currentPage-1)*10)+10
    }
  }

  changePagination(event: any) {
    this.listOfData.forEach((res:any)=>{
      res.checked=false;
    })
    this.checked=false;
    this.currentPage = event;
    this.updateSplicingValue();
    this.paginationEvent.emit(event);
  }
}
