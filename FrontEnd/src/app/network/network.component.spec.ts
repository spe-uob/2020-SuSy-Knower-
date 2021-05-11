import { Unit } from './../unit';
import { UnitService } from './../services/unit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DebugElement, Component } from '@angular/core';
import { ComponentFixture, TestBed, } from '@angular/core/testing';

import { NetworkComponent } from './network.component';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';


let mockData = [
  {
    id: 1,
    name: "Object Orientated",
    programme: "Computer Science",
    school: "SCEEM",
    topic: "Algortihms",
    url: "googl.com",
    prereqs: "1,2,3,4",
    tb: 2,
  }
];

class MockedUnitService extends UnitService {
  mockData = [{
      id: 1,
      name: "Object Orientated",
      programme: "Computer Science",
      school: "SCEEM",
      topic: "Algortihms",
      url: "googl.com",
      prereqs: "1,2,3,4",
      tb: 2,
    }]

  public getUnits(): Observable<Unit[]>{
      return new Observable((observer: Observer<Unit[]>) => {
        observer.next(mockData);
      })
  }
}




describe('NetworkComponent', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkComponent ],
      imports: [
        HttpClientTestingModule,
      ],
      providers:[
        {provide: UnitService, useClass: MockedUnitService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

describe('Resize Label',()=>{
  let component: NetworkComponent;
  let service: MockedUnitService;

  beforeEach(() => {
    service = new MockedUnitService(null);
    component = new NetworkComponent(service);
  });
  afterEach(()=>{
    service = null;
    component = null;
  })
  it('should not affect small strings',()=>{
    expect(component.Resize_Label("Computer Science")).toEqual("Hello");
  })
  it('should add a newline to a string if large',()=>{
    expect(component.Resize_Label("Object Orientated Programming")).toContain('\n');
  })

})