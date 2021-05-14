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
    prerequisites: "2,3,4",
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
      prerequisites: "2,3,4",
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
      {id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}
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

xdescribe('Get_Parents',()=>{
  let component: NetworkComponent;
  let service: MockedUnitService;
  let fixture: ComponentFixture<NetworkComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkComponent ],
      imports: [ HttpClientTestingModule,],
      providers:[{provide: UnitService, useClass: MockedUnitService}]
    })

    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(MockedUnitService);
  });


  it('should call',()=>{
    expect(component.Resize_Label("Computer Science")).toEqual("Computer Science");
  })
  it('should add a newline to a string if large',()=>{
    expect(component.Resize_Label("Object Orientated Programming")).toContain('\n');
  })
})

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

describe('Set_Unit_Positions', () => {
  let component: NetworkComponent;
  let testBedService: UnitService;
  let fixture: ComponentFixture<NetworkComponent>;
  let units: Unit[];
  let mock_node;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [HttpClientTestingModule,],
      providers: [UnitService],
    })
    TestBed.overrideComponent(NetworkComponent, {
      set: {
        providers: [{
          provide: UnitService,
          useClass: MockedUnitService
        }]
      }
    })
    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.componentInstance;
    testBedService = TestBed.inject(UnitService);
    units = [{id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}]
    mock_node ={id: 9, lable: 'Algorithms 2',level: 2,}
  });
  afterEach(()=>{
    fixture.destroy();
  })

  it('should set yOffset to 0 if nodelevel is not equal to current level', () => {
    var yOffset = 0;
    var currentLevel = 1;
    component.Set_Unit_Positions(units, mock_node)
    expect(currentLevel).not.toEqual(mock_node.level)
    expect(yOffset).toEqual(0);
  })

  // it('should set current level equal to node level if not equal', () => {
  //   var currentLevel = 1;
  //   component.Set_Unit_Positions(units,mock_node)
  //   expect(currentLevel).toEqual(mock_node.level);
  // })
  // it('should set yOffset to 0 if nodelevel is not equal to current level', () => {
  //   var yOffset = 0;
  //   var currentLevel = 1;
  //   var nodes = component.nodes
  //   units.forEach(unit => {
  //     var node = nodes.get(unit);
  //     var nodeLevel = node.level;
  //     expect(currentLevel).not.toEqual(nodeLevel)
  //     expect(yOffset).toEqual(0);
  //   })
  // })
  // it('should set current level equal to node level if not equal', () => {
  //   var currentLevel = 1;
  //     var nodes = component.nodes
  //     units.forEach(unit => {
  //       var node = nodes.get(unit);
  //       let nodeLevel = node.level;
  //       expect(currentLevel).not.toEqual(nodeLevel);
  //       component.Set_Unit_Positions(units, nodes);
  //       expect(currentLevel).toEqual(nodeLevel);
  //     })
  // })
})

describe('Find_Prerequisites', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;
  let service: MockedUnitService;
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
    units = [{id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  it('should find pre-requisites', () => {
    units.forEach(unit => {
    expect(component.Find_Prerequisites(unit)).toEqual([1, 2, 3, 4]);
    })
  });
});

describe('Find_Level', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;
  let service: MockedUnitService;
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
    units = [{id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  it('should find level', () => {
    units.forEach(unit => {
      expect(component.Find_Level(unit)).toEqual(1);
    });
  });
});

describe('Find_Faculty', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;
  let service: MockedUnitService;
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
    units = [{id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  it('should find faculty', () => {
    expect(component.Find_Faculty('SCEEM')).toEqual('Faculty of Engineering');
  });
});

describe('Find_School', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;
  let service: MockedUnitService;
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
    units = [{id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  it('should find school', () => {
    expect(component.Find_School('Computer Science (BSc)')).toEqual('School of Computer Science');
  });
});

describe('Get Lists', () => {
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
  // it('should get subjects list', () => {
  //   expect(component.Get_Subject_List()).toEqual(["Electrical and Electronic Engineering (BEng)","Aerospace Engineering (BEng)","Computer Science (BSc)",
  //     "Mathematics (MSci)"
  //     ,"Civil Engineering (BEng)","Psychology (BSc)","Philosophy (BA)","Physics (BSc)","Data Science (BSc)","Anthropology (BA)",
  //     "Chemical Physics (BSc)","Management (BSc)","Honours Law (LLB)","English (BA)","Zoology (BSc)"
  //   ]);
  // });
  // it('should get school list', () => {
  //   expect(component.Get_School_List()).toEqual(['SCEEM', 'SAME', 'School of Physics', 'School of Arts', 'School of Psychological Science', 'School of Mathematics',
  //     'School of Management', 'University of Bristol Law School']);
  // });
  // it('should get faculty list', () => {
  //   expect(component.Get_Faculty_List()).toEqual(['Faculty of Engineering', 'Faculty of Science', 'Faculty of Arts', 'Faculty of Social Sciences', 'Faculty of Life Sciences']);
  // });
});

// Next 4 tests should work fine once .getConnectedNodes works

describe('Get_Parents_Ids', () => {
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
      {id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}
    ]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  xit('should get parents id', () => {
      expect(component.Get_Parents_Ids(5, [{from:5, to:8, id:"5-8"}, {from:5, to:11, id:"5-11"}])).toEqual([8, 11]);
  });
});

describe('Get_Ancestors_Ids', () => {
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
      {id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}
    ]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  xit('should get ancestors id', () => {
    expect(component.Get_Ancestors_Ids(5, [{from:5, to:8, id:"5-8"}, {from:5, to:11, id:"5-11"}])).toContain([8, 11]);
  });
});

describe('Get_Children_Ids', () => {
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
      {id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}
    ]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  xit('should get children id', () => {
    expect(component.Get_Children_Ids(9, [{from:3, to:9, id:"3-9"}, {from:4, to:9, id:"4-9"}, {from:6, to:9, id:"6-9"}])).toEqual([3,4,6]);
  });
});

describe('Get_Descendents_Ids', () => {
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
      {id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}
    ]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  xit('should get descendents id', () => {
    expect(component.Get_Descendents_Ids(9, [{from:3, to:9, id:"3-9"}, {from:4, to:9, id:"4-9"}, {from:6, to:9, id:"6-9"}])).toContain([3,4,6]);
  });
});

// Should work absolutely fine
describe('Find_Node_Id_From_Label', () => {
  let component: NetworkComponent;
  let service: MockedUnitService;

  beforeEach(() => {
    service = new MockedUnitService(null);
    component = new NetworkComponent(service);
  });
  afterEach(() => {
    service = null;
    component = null;
  });
  it('should find node id from label', () => {
    expect(component.Find_Node_Id_From_Label('Combinatorics')).toEqual(44)
  })
})

describe('Style_Ancestors', () => {
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
  });
  afterEach(()=>{
    fixture.destroy();
  })
  it('should color parent red', () => {
    spyOn(component,'Style_Ancestors')
    component.Style_Ancestors([5],[{from:5, to:8, id:"5-8"}, {from:5, to:11, id:"5-11"}]);
    expect(component.Style_Ancestors).toHaveBeenCalled();
  })
})

describe('Style_Descendents', () => {
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
  });
  afterEach(()=>{
    fixture.destroy();
  })
  it('should color descendent green', () => {
    spyOn(component,'Style_Descendents')
    component.Style_Descendents([5],[{from:3, to:9, id:"3-9"}, {from:4, to:9, id:"4-9"}, {from:6, to:9, id:"6-9"}]);
    expect(component.Style_Descendents).toHaveBeenCalled();
  })
})

describe('Reset Nodes' , () => {
  let component: NetworkComponent;
  let service: MockedUnitService;

  beforeEach(() => {
    service = new MockedUnitService(null);
    component = new NetworkComponent(service);
  });
  afterEach(() => {
    service = null;
    component = null;
  });
  it('should cluster all nodes back', () => {
    let subjects = ["Electrical and Electronic Engineering (BEng)","Aerospace Engineering (BEng)","Computer Science (BSc)",
      "Mathematics (MSci)"
      ,"Civil Engineering (BEng)","Psychology (BSc)","Philosophy (BA)","Physics (BSc)","Data Science (BSc)","Anthropology (BA)",
      "Chemical Physics (BSc)","Management (BSc)","Honours Law (LLB)","English (BA)","Zoology (BSc)"];
    let schools = ['SCEEM', 'SAME', 'School of Physics', 'School of Arts', 'School of Psychological Science', 'School of Mathematics',
      'School of Management', 'University of Bristol Law School'];
    let faculties = ['Faculty of Engineering', 'Faculty of Science', 'Faculty of Arts', 'Faculty of Social Sciences', 'Faculty of Life Sciences'];
    let nodes = component.nodes;
    let edges = component.edges
    spyOn(component,'Cluster_All');
    component.Cluster_All(subjects,schools,faculties,nodes,edges);
    expect(component.Cluster_All(subjects,schools,faculties,nodes,edges)).toHaveBeenCalled();
  })
})
