//import { UnitService } from './unit.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//mport { Unit } from './unit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  //public units: Unit[];
  //public editEmployee: Unit;
  //public deleteEmployee: Unit;
  title: String = "Front End";

  constructor(/*private employeeService: UnitService*/){}

  ngOnInit() {
   // this.getUnits();
  }

  // public getUnits(): void {
  //   this.employeeService.getUnits().subscribe(
  //     (response: Unit[]) => {
  //       this.units = response;
  //       console.log(this.units);
  //     },
  //     (error: HttpErrorResponse) => {
  //       alert(error.message);
  //     }
  //   );
  // }



/*export class AppComponent implements OnInit {
  title = 'FrontEnd';

  public units: Unit[];
  constructor(private unitService: UnitService,){}

  ngOnInit(){
    //this.getUnits();
  }

  public getUnits(): void{
    this.unitService.getUnits().subscribe(
      (response: Unit[]) => {
        this.units = [];
        for (let i = 0; i < response.length; i++) {
        //console.log(response[i]); 
      }},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/




  
}
