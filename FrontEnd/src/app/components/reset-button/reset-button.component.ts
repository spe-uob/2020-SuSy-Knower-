import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.css']
})
export class ResetButtonComponent implements OnInit {

  constructor() { }
  signal: boolean;
  @Output() searchEvent = new EventEmitter<boolean>();

  ngOnInit(): void {
  }
  public send_reset(){
    var signal = true;
    this.searchEvent.emit(signal);
  }

}
