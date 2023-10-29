import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor() {}
  @Input() searchKey:any;
  @Output() searchData = new EventEmitter<string>();
  ngOnInit(): void {}

  search(event: any) {
    this.searchData.emit(event.target.value);
  }
}
