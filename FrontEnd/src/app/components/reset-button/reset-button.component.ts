import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reset-button',
  templateUrl: './reset-button.component.html',
  styleUrls: ['./reset-button.component.css']
})
export class ResetButtonComponent implements OnInit {

  constructor() { }
  signal: string;
  @Output() resetEvent = new EventEmitter<string>();

  ngOnInit(): void {
  }
  public send_reset(){
    var signal = "reset";
    this.resetEvent.emit(signal);
  }

}
