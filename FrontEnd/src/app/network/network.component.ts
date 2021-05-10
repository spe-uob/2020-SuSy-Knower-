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
    console.log("Loading Network");
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
              smooth:false
            },
      physics:
              { enabled: true,repulsion:{nodeDistance:100},maxVelocity:2,
             },
      layout:{
              hierarchical:{enabled:false,direction:"LR"}
            },
      groups:{
              
            }
          };
    this.network = new Network(container,data, options);
    this.network.setOptions(options);
    // nodes.add({id: 255, label: 'Node 255'});
    // nodes.add({id: 256, label: 'Node 256'});
    // var node255 = nodes.get(255);
    // var node256 = nodes.get(256);
    // this.Set_Node_Position(node255,nodes,5,5);
    // this.Style_Descendents([255,256],nodes,edges);
    

    var canvas = this.network.canvas.frame.canvas;
    /** @type {CanvasRenderingContext2D} */
    var ctx = canvas.getContext('2d');

    
  }
  public Get_Network_Data(units: Unit[],nodes,edges){
    units.forEach(unit => {

      var prerequisites = this.Find_Prerequisites(unit);
      nodes.add({id:unit.id, label: unit.name, subject:unit.programme,
        topic: unit.topic, level: this.Find_Level(unit), 
       type:Mode.UNIT,url:unit.url,group:unit.topic});
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
  //Handles click zoom and drawing events
  public Run_Network_Events(data){
    var nodes= data.nodes;
    var edges = data.edges;
    var that = this;
    this.network.on("beforeDrawing", function(ctx) {
      that.Draw_Title("SuSy- Knower Knowlege Maps",ctx)
    })
    this.network.on("initRedraw", function(){})
    this.network.on('click', function(params){
      that.Click(params,nodes,edges);
    })
    this.network.on('doubleClick', function(params){
      that.Double_click(params,nodes,edges);
    })
    this.network.on("zoom", function (params) {})
  }
  public Draw_Title(title,ctx){
    console.log("Drawing Title");
    ctx.font = "50px Tahoma";
    ctx.fillStyle = 'rgba(255,0,0,1)'
    ctx.textAlign = "center";
    ctx.fillText(title,0,-200);
  }
  public Double_click(params,nodes,edges){

    if(params.nodes.length){
      var selected_node_id = params.nodes[0];
      
      if(this.network.isCluster(selected_node_id)){
        var cluster = this.network.body.nodes[selected_node_id].options;
        if(cluster.type == Mode.SUBJECT){
            //this.Turn_On_Hierarchical(this.network.options);
            //this.Turn_Off_Physics(this.network.options);
            var nodes_in_cluster = this.network.getNodesInCluster(selected_node_id);
            this.Uncluster(selected_node_id);
            this.Set_Unit_Positions(nodes_in_cluster,nodes);
            this.Fit_To_Selection(nodes_in_cluster);
            this.mode = Mode.UNIT;
        }
        else if(cluster.type == Mode.FACULTY){
          this.mode = Mode.SCHOOL;
          var nodes_in_cluster = this.network.getNodesInCluster(selected_node_id);
          this.Uncluster(selected_node_id);
          this.Fit_To_Selection(nodes_in_cluster)
        }
        else if(cluster.type == Mode.SCHOOL){
          this.mode = Mode.SUBJECT;
          var nodes_in_cluster = this.network.getNodesInCluster(selected_node_id);
          this.Uncluster(selected_node_id);
          this.Fit_To_Selection(nodes_in_cluster)
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
    if(params.nodes.length){
      
      if(this.network.isCluster(params.nodes[0]))
      {
        console.log("Selected node is a cluster")
      }
      else{
        var ancestors_Ids = this.Get_Ancestors_Ids(clicked_node_id,nodes,edges);
        this.Style_Ancestors(ancestors_Ids,nodes);
        console.log(ancestors_Ids);
        var descendents_Ids = this.Get_Descendents_Ids(clicked_node_id,nodes,edges);
        this.Style_Descendents(descendents_Ids,nodes,edges);
        console.log(descendents_Ids);
      }
  }
  else{
    console.log("No node clicked");
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
    ,"Civil Engineering (BEng)","Psychology (BSc)","Philosophy (BA)","Physics (BSc)","Data Science (BSc)","Anthropology (BA)",
    "Chemical Physics (BSc)"
  ];
  }
  public Get_School_List(){
    return ["SCEEM","SAME","School of Physics","School of Arts","School of Psychological Science","School of Mathematics"]
  }
  public Get_Faculty_List(){
    return ["Faculty of Engineering","Faculty of Science","Faculty of Arts"]
  }
  public Find_School(subject):String{
    if(subject == "Computer Science (BSc)"|| subject == "Electrical and Electronic Engineering (BEng)")
    {
      return "SCEEM";
    }
    else if (subject == "Aerospace Engineering (BEng)"|| subject == "Civil Engineering (BEng)"){
      return "SAME";
    }
    else if(subject == "Physics (BSc)"|| subject == "Chemical Physics (BSc)"){
      return "School of Physics";
    }
    else if(subject == "Philosophy (BA)" || subject == "Anthropology (BA)"){
      return "School of Arts";
    }
    else if(subject == "Psychology (BSc)"){
      return "School of Psychological Science";
    }
    else if(subject == "Mathematics (MSci)"|| subject == "Data Science (BSc)"){
      return "School of Mathematics";
    }
    else{
      return "Error";
    }
    
  }
  public Find_Faculty(school):String{
    if(school == "SCEEM"||school == "SAME"){
      return "Faculty of Engineering";
    }
    else if (school == "School of Mathematics"|| school == "School of Physics"){
      return "Faculty of Science"
    }
    else{
      return "Faculty of Engineering";
    }
  }
  public Get_Parents_Ids(node_Id,nodes,edges){
    var parents_Ids = []
    var edge_Ids = this.network.getConnectedEdges(node_Id);
    edge_Ids.forEach(edge_Id => {
      var edge = edges.get(edge_Id);
      if(edge.from == node_Id){
        parents_Ids.push(edge.to);
      }
    });
    console.log(parents_Ids)
    return parents_Ids
  }
  public Get_Ancestors_Ids(node_Id,nodes,edges){
    var ancestors_Ids =[];
    ancestors_Ids = ancestors_Ids.concat(this.Get_Parents_Ids(node_Id,nodes,edges))
    console.log(ancestors_Ids);
    ancestors_Ids.forEach(ancestor => {
      this.Get_Ancestors_Ids(ancestor,nodes,edges);
    });
    return ancestors_Ids
  }
  public Get_Children_Ids(node_Id,nodes,edges){
    var children_Ids = []
    var edge_Ids = this.network.getConnectedEdges(node_Id);
    edge_Ids.forEach(edge_Id => {
      var edge = edges.get(edge_Id);
      if(edge.to == node_Id){
        children_Ids.push(edge.from);
      }
    });
    console.log(children_Ids)
    return children_Ids;
    
  }
  public Get_Descendents_Ids(node_Id,nodes,edges){
    var descendents_Ids =[];
    descendents_Ids = descendents_Ids.concat(this.Get_Children_Ids(node_Id,nodes,edges))
    console.log(descendents_Ids);
    descendents_Ids.forEach(descendent => {
      this.Get_Descendents_Ids(descendent,nodes,edges);
    });
    return descendents_Ids
  }
  public Style_Ancestors(ancestor_Ids,nodes){
    ancestor_Ids.forEach(ancestor_Id => {
      var parent = nodes.get(ancestor_Id);
      parent.color = {background:"red"}
      nodes.update(parent);
    });
  }
  public Style_Descendents(descendent_Ids,nodes,edges){
    descendent_Ids.forEach(descendent_Id => {
      var descendent = nodes.get(descendent_Id);
      descendent.color = {background:"green"}
      nodes.update(descendent);
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
      color:{border: "blue"},
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
      color: {border:"red"},
      label: faculty,
      id: id,
      type: Mode.FACULTY,
      size: 25,
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
    node.fixed = true;
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
