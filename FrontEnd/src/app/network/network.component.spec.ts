import { Unit } from './../unit';
import { UnitService } from './../services/unit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DebugElement, Component, Injectable, Inject } from '@angular/core';
import { ComponentFixture, inject, TestBed, } from '@angular/core/testing';
import { DataSet} from 'vis-data';

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
    prereqs: "2,3,4",
    tb: 2,
  }
];

@Injectable({
  providedIn: 'root'
})
class MockedUnitService extends UnitService {
  mockData = [{
      id: 1,
      name: "Object Orientated",
      programme: "Computer Science",
      school: "SCEEM",
      topic: "Algortihms",
      url: "googl.com",
      prereqs: "2,3,4",
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
  afterEach(() =>{
    fixture.destroy();
  })

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
  it('should have a network',() => {
    expect(component.network).toBeTruthy();
  });
  it('should call ngOnInit',() => {
    spyOn(component,'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

});

describe("Get_Network_Data",()=>{
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;
  let units: Unit[];

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
    units = [
      {id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prereqs:"1,2,3,4",tb:1}
    ]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  it('should call nodes.add',()=>{
    expect(component.Get_Network_Data(units,component.nodes,component.edges)).toBeTruthy;
  })
  it('should return nodes and edges')
  it('should find a units prerequisites')

})

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
    expect(component.Resize_Label("Computer Science")).toEqual("Computer Science");
  })
  it('should add a newline to a string if large',()=>{
    expect(component.Resize_Label("Object Orientated Programming")).toContain('\n');
  })

})

// xdescribe('Get_Parents',()=>{
//   let component: NetworkComponent;
//   let service: MockedUnitService;
//   let fixture: ComponentFixture<NetworkComponent>;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ NetworkComponent ],
//       imports: [ HttpClientTestingModule,],
//       providers:[{provide: UnitService, useClass: MockedUnitService}]
//     })
//
//     fixture = TestBed.createComponent(NetworkComponent);
//     component = fixture.componentInstance;
//     service = TestBed.inject(MockedUnitService);
//   });
//
//
//   it('should call',()=>{
//     expect(component.Resize_Label("Computer Science")).toEqual("Computer Science");
//   })
//   it('should add a newline to a string if large',()=>{
//     expect(component.Resize_Label("Object Orientated Programming")).toContain('\n');
//   })
// })

describe('Set Node Position',()=>{
  let component: NetworkComponent;
  let testBedService: UnitService;
  let fixture: ComponentFixture<NetworkComponent>;
  let mock_node;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkComponent ],
      imports: [ HttpClientTestingModule,],
      providers:[UnitService],
    })
    TestBed.overrideComponent(NetworkComponent,{set:{providers:[{provide: UnitService, useClass:MockedUnitService}]}})
    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.componentInstance;
    testBedService = TestBed.inject(UnitService);
    mock_node ={
      id: 1,
      name: "Object Orientated",
      programme: "Computer Science",
      school: "SCEEM",
      topic: "Algortihms",
      url: "googl.com",
      prereqs: "1,2,3,4",
      tb: 2,
    }
  });
  afterEach(()=>{
    fixture.destroy();
  })
  it('should call nodes.update',()=>{
    var nodes = new DataSet([]);
    var spy = spyOn(nodes,'update');
    nodes.update({id:1234,label:"unit"});
    var check = nodes.get(1234);
    expect(nodes.get(1234)).not.toBeNull;
    expect(spy).toHaveBeenCalled;
  })
  it('should inject into testbed and directly the same',
    inject([UnitService],(injectService:UnitService) => {
      expect(injectService).toBe(testBedService);})
    );
  it('should set x to value provided',()=>{
    component.Set_Node_Position(mock_node,component.nodes,0,0);
    expect(mock_node.y).toEqual(0);
  });
  it('should set y to value provided',()=>{
    component.Set_Node_Position(mock_node,component.nodes,0,0);
    expect(mock_node.x).toEqual(0);
  });
  it('should set node.fixed to true',()=>{
    component.Set_Node_Position(mock_node,component.nodes,0,0);
    expect(mock_node.fixed).toBeTruthy();
  });
  xit('should call add node to nodes',()=>{
    component.Set_Node_Position(mock_node,component.nodes,0,0);
    expect(component.nodes).toContain(mock_node);
  });
})


describe('Find all', () => {
  let component: NetworkComponent;
  let service: MockedUnitService;
  let unit: Unit;

  beforeEach(() => {
    service = new MockedUnitService(null);
    component = new NetworkComponent(service);
  });
  afterEach(() => {
    service = null;
    component = null;
  });
  // it('should find pre-requisites', () => {
  //   expect(component.Find_Prerequisites(unit)).toEqual([1, 2, 3, 4]);
  // });
  // it('should find level', () => {
  //   expect(component.Find_Level(unit)).toEqual(2);
  // });
  it('should find faculty', () => {
    expect(component.Find_Faculty('SCEEM')).toEqual('Faculty of Engineering');
  });
  it('should find school', () => {
    expect(component.Find_School('Computer Science (BSc)')).toEqual('SCEEM');
  });
});

describe('Get All', () => {
  let component: NetworkComponent;
  let service: MockedUnitService;
  let mock_node;

  beforeEach(() => {
    service = new MockedUnitService(null);
    component = new NetworkComponent(service);
    mock_node ={
      id: 1,
      name: "Object Orientated",
      programme: "Computer Science",
      school: "SCEEM",
      topic: "Algortihms",
      url: "googl.com",
      prereqs: "1,2,3,4",
      tb: 2,
    }
  });
  afterEach(() => {
    service = null;
    component = null;
  });
  it('should get subjects list', () => {
    expect(component.Get_Subject_List()).toEqual(["Electrical and Electronic Engineering (BEng)","Aerospace Engineering (BEng)","Computer Science (BSc)",
      "Mathematics (MSci)"
      ,"Civil Engineering (BEng)","Psychology (BSc)","Philosophy (BA)","Physics (BSc)","Data Science (BSc)","Anthropology (BA)",
      "Chemical Physics (BSc)","Management (BSc)","Honours Law (LLB)","English (BA)","Zoology (BSc)"
    ]);
  });
  it('should get school list', () => {
    expect(component.Get_School_List()).toEqual(['SCEEM', 'SAME', 'School of Physics', 'School of Arts', 'School of Psychological Science', 'School of Mathematics',
      'School of Management', 'University of Bristol Law School']);
  });
  it('should get faculty list', () => {
    expect(component.Get_Faculty_List()).toEqual(['Faculty of Engineering', 'Faculty of Science', 'Faculty of Arts', 'Faculty of Social Sciences', 'Faculty of Life Sciences']);
  });
  it('should get parents id')
  // it('should get parents id', () => {
  //   expect(component.Get_Parents_Ids(mock_node.id, component.nodes, component.edges)).toEqual([]);
  // });
  it('should get ancestors id')
  // it('should get ancestors id', () => {
  //   expect(component.Get_Ancestors_Ids(id,nodes,edges)).toEqual();
  // });
  it('should get children id')
  // it('should get children id', () => {
  //   expect(component.Get_Children_Ids(id,nodes,edges)).toEqual();
  // });
  it('should get descendents id')
  // it('should get descendents id', () => {
  //   expect(component.Get_Descendents_Ids(id,nodes,edges)).toEqual();
  // });
});
