import { UnitService } from './unit.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Unit } from './unit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'FrontEnd';

  public units: Unit[];
  constructor(private unitService: UnitService){}

  ngOnInit(){
    this.getUnits();
  }

  public getUnits(): void{
    this.unitService.getUnits().subscribe(
      ((response: Unit[]) => {for (let i = 0; i < response.length; i++) {
        console.log(response[i]);
      }}),
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )

  }
  /*public getString(): void{
    this.unitService.getString().subscribe(
      (response: string) =>
        alert(response),
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }*/



  
}
