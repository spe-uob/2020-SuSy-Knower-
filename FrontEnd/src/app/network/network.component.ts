import { UnitService } from './../services/unit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Unit } from '../unit';
import { Network } from 'vis-network';
import { DataSet} from 'vis-data';
import { option } from 'vis-util/esnext';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';

declare var vis:any;

enum Mode {
  UNIT = 1,
  SUBJECT,
  SCHOOL,
  FACULTY,
}

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  @ViewChild("siteConfigNetwork") networkContainer: ElementRef;
  @ViewChild("pop") popOver: any;

  public nodes: any;
  public edges: any;
  public network: any;
  public mode: Mode;

  public units: Unit[];
  public tester: number;
  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.mode = Mode.FACULTY;
    var nodes = new DataSet([]);
    var edges = new DataSet([]);
    var data = {
    nodes: nodes,
    edges: edges
    };
  
    this.getUnits(data);

    // create an array with edges

    this.Load_Vis_Network(data);
    console.log(this.network);
  }
  //Observer of the unitservice to recieve units from database
  public getUnits(data): void {
    this.unitService.getUnits().subscribe(
      (response: Unit[]) => {
          this.units = response;
          data = this.Get_Network_Data(response,data.nodes,data.edges);
          this.Format_Loaded_Data(data);
        },
      (error: HttpErrorResponse) => {alert(error.message); }
    );
    console.log("Getting units")
  }
  //Create the network itself
  public Load_Vis_Network(data){
    var nodes = data.nodes;
    var edges = data.edges;
    var mode_type = Mode.FACULTY;
    var node_size =10
    
    var container = document.getElementById("mynetwork");
    var options = {

      interaction:{zoomView:true,zoomSpeed:0.2},

      nodes:{shape: "dot", size:node_size, borderWidth: node_size/2, borderWidthSelected: node_size/2,
            color:{ border:'green',background:"white",
                  highlight: {border: 'black',background: 'white'},},
            font:{face:"tahoma",size:9,strokeWidth: 3,strokeColor: "#ffffff"},
            level:0,
            },
      edges:{
              width:node_size/8,
              arrows:{to:{enabled:true,scaleFactor:0.5}},
            },
      physics:
              { enabled: true,repulsion:{nodeDistance:100},maxVelocity:5 },
      layout:{
              hierarchical:{enabled:false,direction:"LR"}
            },
      groups:{
              
            }
          };
    this.network = new Network(container,data, options);
    this.network.setOptions(options);
    nodes.add({id: 255, label: 'Node 255'});
    nodes.add({id: 256, label: 'Node 256'});
    var node255 = nodes.get(255);
    var node256 = nodes.get(256);
    this.Set_Node_Position(node255,nodes,5,5);
    this.Style_Children([node255,node256],nodes);
    

    var canvas = this.network.canvas.frame.canvas;
    /** @type {CanvasRenderingContext2D} */
    var c = canvas.getContext('2d');
    console.log("Loading Network");
  }
  public Get_Network_Data(units: Unit[],nodes,edges){
    units.forEach(unit => {
      nodes.add({id:unit.id, label: unit.name, subject:unit.programme,
         topic: unit.topic, level: this.Find_Level(unit), 
        type:Mode.UNIT,url:unit.url,group:unit.topic});
      console.log(unit.topic);
      var prerequisites = this.Find_Prerequisites(unit);
      prerequisites.forEach(prereq => {
        edges.add({from: prereq ,to: unit.id});
      });
    });
    var data = {nodes: nodes,edges: edges,};
    console.log("Turning data into nodes and edges")
    return data;
    }
  //Once data has been recieved from database, organise it into the original view
  public Format_Loaded_Data(data){
    this.Cluster_All(this.Get_Subject_List(),this.Get_School_List(),this.Get_Faculty_List());

    this.Run_Network_Events(data);
  }
  //Handles click and zoom events
  public Run_Network_Events(data){
    var nodes= data.nodes;
    var edges = data.edges;
    var that = this;
    this.network.on("beforeDrawing", function(ctx) {})
    this.network.on("initRedraw", function(){})
    this.network.on('click', function(params){
      that.Click(params,nodes,edges);
    })
    this.network.on('doubleClick', function(params){
      that.Double_click(params,nodes,edges);
    })
    this.network.on("zoom", function (params) {})
  }
  public Double_click(params,nodes,edges){

    if(params.nodes){
      var selected_node_id = params.nodes[0];
      

      if(this.network.isCluster(selected_node_id)){
        if(this.mode == Mode.FACULTY){
          var nodes_in_cluster = this.network.getNodesInCluster(selected_node_id);
          this.Uncluster(selected_node_id);
          this.Fit_To_Selection(nodes_in_cluster)
          this.mode = Mode.SCHOOL;
        }
        else if(this.mode == Mode.SCHOOL){
          var nodes_in_cluster = this.network.getNodesInCluster(selected_node_id);
          this.Uncluster(selected_node_id);
          this.Fit_To_Selection(nodes_in_cluster)
          this.mode = Mode.SUBJECT;
        }
        else if(this.mode == Mode.SUBJECT){
          this.Turn_On_Hierarchical(this.network.options);
          this.Turn_Off_Physics(this.network.options);
          var nodes_in_cluster = this.network.getNodesInCluster(selected_node_id);
          this.Uncluster(selected_node_id);
          this.Set_Unit_Positions(nodes_in_cluster,nodes);
          this.Fit_To_Selection(nodes_in_cluster)
          this.mode = Mode.UNIT;
        }
      }
      else{
        console.log("node is NOT a cluster")
        var unit = nodes.get(selected_node_id);

        window.open(unit.url, "_blank");
      }
  }
    
    
  }
  public Click(params,nodes,edges){
    var clicked_node_id = params.nodes[0];
    if(clicked_node_id){
      console.log(nodes.get(clicked_node_id));
    }

    if(this.network.isCluster(params.nodes[0]))
    {
      console.log("Selected node is a cluster")
    }

  }
  public Find_Prerequisites(unit: Unit): number[]{
    var prereqStr = unit.prereqs;
    var prereqChar = [];
    var prereqs = []
    if(prereqStr != null){
      prereqChar = prereqStr.split(',')
      prereqChar.forEach(char => {prereqs.push(parseInt(char))});
    }
    return prereqs;
    return [1,2,3];
  }
  public Find_Level(unit: Unit): number{
    return unit.tb;
  }
  public Get_Subject_List(){
    return ["Electrical and Electronic Engineering (BEng)","Aerospace Engineering (BEng)","Computer Science (BSc)",
    "Mathematics (MSci)"
    ,"Civil Engineering (BEng)","Psychology (BSc)","Philosophy (BA)","Physics (BSc)",
  ];
  }
  public Get_School_List(){
    return ["SCEEM","SAME","School of Physics","School of Philosophy","School of Psychological Science"]
  }
  public Get_Faculty_List(){
    return ["Engineering","Science","Arts"]
  }
  public Find_School(subject):String{
    if(subject == "Computer Science (BSc)"|| subject == "Electrical and Electronic Engineering (BEng)")
    {
      return "SCEEM";
    }
    else if (subject == "Aerospace Engineering (BEng)"|| subject == "Civil Engineering (BEng)"){
      return "SAME";
    }
    else if(subject == "Physics (BSc)"){
      return "School of Physics"
    }
    else if(subject == "Philosophy (BA)"){
      return "School of Philosophy"
    }
    else if(subject == "Psychology (BSc)"){
      return "School of Psychological Science"
    }
    else{
      return "Error";
    }
    
  }
  public Find_Faculty(school):String{
    return "Engineering";
  }
  public Get_Parents(node,nodes){
    
  }
  public Get_Children(node,nodes){
    return;
  }
  public Style_Parents(parents,nodes){
    parents.forEach(parent => {
      parent.color = {background:"red"}
      nodes.update(parent);
    });
  }
  public Style_Children(children,nodes){
    children.forEach(child => {
      child.color = {background:"green"}
      nodes.update(child);
    });
  }
  public Style_Node(node,style){

  }
  public Reset_Style(topic){

  }
  public Resize_Label(label): String{

    return "NEED TO WRITE FUNCTION";
  }
  public Cluster_One_Subject(subject,id){
    console.log("Clustering One Subject");
    var joinCon = function (nodeOptions) {
      return nodeOptions.subject == subject;
    };
    var properties = {
      level:0,
      label: subject,
      id: id,
      school: this.Find_School(subject),
      type: Mode.SUBJECT,
      size: 14,
      borderWidth:7,
      font:{size:12}
    };
    this.network.cluster({joinCondition: joinCon, clusterNodeProperties: properties});
    

  }
  public Cluster_Sujects(subjects: String[]){
    console.log("Clustering Many Subjects");
    var id = 1000;
    subjects.forEach(subject => {
      this.Cluster_One_Subject(subject,id);
      id++;
    });

  }
  public Cluster_One_School(school,id){
    console.log("Clustering One School");
    var joinCon = function (nodeOptions) {
      return nodeOptions.school == school;
    };
    var properties = {
      level:0,
      label: school,
      id: id,
      faculty: this.Find_Faculty(school),
      type: Mode.SCHOOL,
      size: 17,
      borderWidth:8,
      font:{size:12}
    };
    this.network.cluster({joinCondition: joinCon, clusterNodeProperties: properties});

  }
  public Cluster_Schools(schools){
    console.log("Clustering Many Schools");
    var id = 2000;
    schools.forEach(school => {
      this.Cluster_One_School(school,id);
      id++
    });
  
  }
  public Cluster_One_Faculty(faculty,id){
    console.log("Clustering One Faculty");
    var joinCon = function (nodeOptions) {
      //console.log(nodeOptions.faculty);
      return nodeOptions.faculty == faculty;
    };
    var properties = {
      level:0,
      label: faculty,
      id: id,
      type: Mode.FACULTY,
      size: 20,
      borderWidth:10,
      font:{size:12}
    };
    this.network.cluster({joinCondition: joinCon, clusterNodeProperties: properties});

  }
  public Cluster_Faculties(faculties){
    console.log("Clustering Many Faculties");
    var id = 3000;
    faculties.forEach(faculty => {
      this.Cluster_One_Faculty(faculty,id);
      id++
    });
  
  }
  public Turn_On_Physics(options){
    console.log("Turning Physics On");
    options.physics = true;
    this.network.setOptions(options);
  }
  public Turn_Off_Physics(options){
    console.log("Turning Physics Off");
    options.physics = false;
    this.network.setOptions(options);
  }
  public Turn_Off_Hierarchical(options){
    console.log("Turning Hierarchical Off")
    options.layout = {hierarchical: false};
    this.network.setOptions(options);
  }
  public Turn_On_Hierarchical(options){
    console.log("Turning Hierarchical On");
    options.layout = {hierarchical:{enabled:true,direction:"LR"}};
    console.log(options.layout.hierarchical);
    this.network.setOptions(options);
  }
  public Uncluster(cluster_id){
    console.log("Unclustering cluster")
    this.network.openCluster(cluster_id);
  }
  public Test_Routine(){
    
  }
  public Cluster_All(subjects,schools,faculties){
    this.Cluster_Sujects(subjects);
    this.Cluster_Schools(schools);
    this.Cluster_Faculties(faculties);
  }
  public Fit_To_Selection(node_Ids){
    console.log(node_Ids)
    this.network.fit({nodes:node_Ids});
    //this.network.options.
  }
  public Set_Node_Position(node,nodes,x:number,y:number){
    node.x = x;
    node.y = y;
    nodes.update(node);
  }
  public Set_Unit_Positions(units,nodes){
    var yOffset = 0;
    var currentLevel =1;
    units.forEach(unit => {
      var node = nodes.get(unit);
      if(!(node.level == currentLevel)){
        yOffset = 0;
        currentLevel = node.level;
      }
      this.Set_Node_Position(node,nodes,150*node.level,yOffset*100);
      yOffset++;
      
    });
  }
  public Position_Subjects(){}//Or a general one for clusters
  public Clean_Up_Unseleected(){};
  

  







}
