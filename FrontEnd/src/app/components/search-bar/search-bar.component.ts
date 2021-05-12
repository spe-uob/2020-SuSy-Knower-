import { Component, OnInit, Output,EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  search: string;
  @Output() searchEvent = new EventEmitter<string>();


  constructor() { }

  
  ngOnInit(): void {
  }
  public send_search(){
    var inputVal = (<HTMLInputElement>document.getElementById("myInput")).value;
    console.log(inputVal);
    console.log("searching...");
    this.searchEvent.emit(inputVal);
  }
  

}
