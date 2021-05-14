import { Unit } from './../unit';
import { UnitService } from './../services/unit.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { DebugElement, Component, Injectable, Inject } from '@angular/core';
import { ComponentFixture, inject, TestBed, } from '@angular/core/testing';
import { DataSet} from 'vis-data';

import { NetworkComponent } from './network.component';
import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Network } from 'vis-network';


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
    component.nodes =new DataSet([]);
    component.edges = new DataSet([]);
    component.Load_Vis_Network();
    expect(component.network).toBeTruthy();
  });
  it('should call ngOnInit',() => {
    spyOn(component,'ngOnInit');
    component.ngOnInit();
    expect(component.ngOnInit).toHaveBeenCalled();
  });

});

describe('Get_Network_Data',()=>{
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
    mock_node ={id: 9, label: 'Algorithms 2',level: 2,}
  });
  afterEach(()=>{
    fixture.destroy();
  })

  it('should set yOffset to 0 if nodelevel is not equal to current level', () => {
    var nodes = new DataSet([mock_node]);
    component.edges = new DataSet([]);
    var yOffset = 0;
    var currentLevel = 1;
    component.Set_Unit_Positions([mock_node.id], nodes )
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


// FINDING DATA

describe('Check_Topic', () => {
  let component: NetworkComponent;
  let service: MockedUnitService;

  beforeEach(() => {
    service = new MockedUnitService(null);
    component = new NetworkComponent(service);
  });
  afterEach(() => {
    service = null;
    component = null;
  })
  it('should return topic', () => {
    expect(component.Check_Topic('1,2,3')).toEqual('1,2,3');
  })
  it('should return 1 for unknown', () => {
    expect(component.Check_Topic('')).toEqual('1');
  });
})

describe('Find_Prerequisites', () => {
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
    component.nodes = new DataSet([{id: 44, label: 'Combinatorics',level: 2,}])
    expect(component.Find_Node_Id_From_Label('Combinatorics')).toEqual(44)
  })
})

describe('Get_Subject_List', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
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
  afterEach(() => {
    fixture.destroy();
  })

  it('should be called', () => {
    spyOn(component, 'Get_Subject_List');
    component.Get_Subject_List();
    expect(component.Get_Subject_List).toHaveBeenCalled()
  })
  xit('should call All_Data_Loaded_Check')
})

describe('Get_School_List', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
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
  afterEach(() => {
    fixture.destroy();
  })

  it('should be called', () => {
    spyOn(component, 'Get_School_List');
    component.Get_School_List();
    expect(component.Get_School_List).toHaveBeenCalled()
  })
  xit('should call All_Data_Loaded_Check')
})

describe('Get_Faculty_List', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
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
  afterEach(() => {
    fixture.destroy();
  })

  it('should be called', () => {
    spyOn(component, 'Get_Faculty_List');
    component.Get_Faculty_List();
    expect(component.Get_Faculty_List).toHaveBeenCalled()
  })
  xit('should call Format_Loaded_Data')
})

describe('Find_School', () => {
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
    units = [{id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  it('should find school', () => {
    expect(component.Find_School('Computer Science (BSc)')).toEqual('School of Computer Science');
  });
});

describe('Find_Faculty', () => {
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
    units = [{id:1234, name:"mock unit", programme:"Computer Science",topic: '0',url:"google.com",school:"SCEEM",prerequisites:"1,2,3,4",tb:1}]
  });
  afterEach(() =>{
    fixture.destroy();
  })
  it('should find faculty', () => {
    expect(component.Find_Faculty('SCEEM')).toEqual('Faculty of Engineering');
  });
});


// GETTING PRE/POST REQUITSITE IDS
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


// STYLING

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


// All below should work fine once network is working

describe('Cluster_One_Subject', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
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
  afterEach(() => {
    fixture.destroy();
  })
  it('should cluster one subject', () => {
    var spy = spyOn(component.network, 'cluster')
    component.Cluster_One_Subject('Physics (BSc)', 1006)
    expect(spy).toHaveBeenCalled()
  })
})

describe('Cluster_Sujects', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
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
  afterEach(() => {
    fixture.destroy();
  })
  it('should cluster subjects', () => {
    expect(component.Cluster_Sujects(["Computer Science (BSc)", "Aerospace Engineering (BEng)",
      "Civil Engineering (BEng)", "Electrical and Electronic Engineering (BEng)", "Mathematics (MSci)", "Data Science (BSc)",
      "Physics (BSc)", "Chemical Physics (BSc)", "Philosophy (BA)",
      "Anthropology (BA)", "English (BA)", "Psychology (BSc)", "Zoology (BSc)", "Honours Law (LLB)", "Management (BSc)"])).toBeTruthy()
  })
})

describe('Cluster_One_School', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: UnitService, useClass: MockedUnitService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.componentInstance;
    var nodes = new DataSet([{id:2000,label:'School of Computer Science'}]);
    var edges = new DataSet([]);
    var options =       {nodes:{shape: "dot",
    level:0,
    fixed:true,
    },}
    var container = document.getElementById("mynetwork");
    component.network = new Network(container,{nodes:nodes,edges:edges}, options);
    de = fixture.debugElement;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  })
  it('should cluster one school', () => {
    var spy = spyOn(component.network, 'cluster')
    component.Cluster_One_School('School of Computer Science', 2000)
    expect(spy).toHaveBeenCalled()
  })
  it('should check if school exists', () => {
    expect(component.Cluster_One_School('false school', 2000)).toBeFalsy()
  })
})

describe('Cluster_Schools', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: UnitService, useClass: MockedUnitService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.componentInstance;
    var nodes = new DataSet([{id:2000,label:'School of Computer Science'},{id:2000,label:'School of Aerospace Engineering'}]);
    var edges = new DataSet([]);
    var options =       {nodes:{shape: "dot",
    level:0,
    fixed:true,
    },}
    var container = document.getElementById("mynetwork");
    component.network = new Network(container,{nodes:nodes,edges:edges}, options);

    de = fixture.debugElement;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  })
  it('should cluster schools', () => {
    expect(component.Cluster_Schools(["School of Computer Science", "School of Aerospace Engineering"])).toBeTruthy()
  })
})

describe('Cluster_One_Faculty', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        {provide: UnitService, useClass: MockedUnitService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkComponent);
    component = fixture.componentInstance;
    var nodes = new DataSet([{id:3000,label:'Engineering'}]);
    var edges = new DataSet([]);
    var options =       {nodes:{shape: "dot",
    level:0,
    fixed:true,
    },}
    var container = document.getElementById("mynetwork");
    component.network = new Network(container,{nodes:nodes,edges:edges}, options);
    de = fixture.debugElement;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
  })
  it('should cluster one faculty', () => {
    var spy = spyOn(component.network, 'cluster')
    component.Cluster_One_Faculty('Engineering', 3000)
    expect(spy).toHaveBeenCalled()
  })
  it('should check if faculty exists', () => {
    expect(component.Cluster_One_Faculty('false faculty', 3000)).toBeFalsy()
  })
})

describe('Cluster_Faculties', () => {
  let component: NetworkComponent;
  let fixture: ComponentFixture<NetworkComponent>;
  let de: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NetworkComponent],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
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
  afterEach(() => {
    fixture.destroy();
  })
  it('should cluster faculties', () => {
    expect(component.Cluster_Faculties(["Engineering", "Science", "Arts", "Life Sciences", "Social Sciences and Law"])).toBeTruthy()
  })
})

// Uncluster

describe('Cluster_All' , () => {
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
  it('should cluster all nodes', () => {
    let subjects = ["Electrical and Electronic Engineering (BEng)","Aerospace Engineering (BEng)","Computer Science (BSc)",
      "Mathematics (MSci)"
      ,"Civil Engineering (BEng)","Psychology (BSc)","Philosophy (BA)","Physics (BSc)","Data Science (BSc)","Anthropology (BA)",
      "Chemical Physics (BSc)","Management (BSc)","Honours Law (LLB)","English (BA)","Zoology (BSc)"];
    let schools = ['SCEEM', 'SAME', 'School of Physics', 'School of Arts', 'School of Psychological Science', 'School of Mathematics',
      'School of Management', 'University of Bristol Law School'];
    let faculties = ['Faculty of Engineering', 'Faculty of Science', 'Faculty of Arts', 'Faculty of Social Sciences', 'Faculty of Life Sciences'];
    // var spySubject = spyOn(component.Cluster_All(subjects,schools,faculties),'Cluster_Sujects');
    // var spySchool = spyOn(component.Cluster_All(subjects,schools,faculties), 'Cluster_Schools');
    // var spyFaculty = spyOn(component.Cluster_All(subjects,schools,faculties), 'Cluster_Faculties');
    // component.Cluster_All(subjects,schools,faculties);
    // expect(spySubject).toHaveBeenCalled();
    // expect(spySchool).toHaveBeenCalled();
    // expect(spyFaculty).toHaveBeenCalled();
  })
})
