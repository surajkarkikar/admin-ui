import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  constructor() {}
  @Output() searchData = new EventEmitter<string>();
  ngOnInit(): void {}

  search(event: any) {
    this.searchData.emit(event.target.value);
  }
}
