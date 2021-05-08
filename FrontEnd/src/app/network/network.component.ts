import { UnitService } from './../services/unit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Unit } from '../unit';
import { Network } from 'vis';
import { option } from 'vis-util/esnext';

declare var vis:any;

enum Mode {
  UNIT = 1,
  SUBJECT,
  SCHOOL,
  FACULTY,
}
var temp_sceem_subjects = ["Computer Science (BSc)","Aerospace Engingeering (BEng)"]
var temp_engineering_schools= ["SCEEM","SAME"];
var subject_properties = {};


@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  @ViewChild("siteConfigNetwork") networkContainer: ElementRef;
  @ViewChild("pop") popOver: any;


  public network: any;

  public units: Unit[];
  public tester: number;
  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.getUnits();
  }
  public getUnits(): void {
    this.unitService.getUnits().subscribe(
      (response: Unit[]) => {
          this.units = response;
          var network_data = this.Get_Network_Data(response);
          this.Load_Vis_Network(network_data,this);},

      (error: HttpErrorResponse) => {alert(error.message); }
    );
    console.log("Getting units")
  }

  public Load_Vis_Network(network_data,that){
    var toggle = true;
    var node_size =10
    
    var options = {

      interaction:{/*zoomSpeed: 0.2*/},

      nodes:{shape: "dot", size:node_size, borderWidth: node_size/2,
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
              { enabled: false},
      layout:{
              hierarchical:{enabled:true,direction:"LR"}
            }
    };

    var container = document.getElementById("mynetwork");
    this.network = new vis.Network(container, network_data, options);
    var nodes = this.network.body.nodes;
    var edges = this.network.body.edges;
    var cluster_ids = [];
    console.log(this.network);
    this.network.setOptions(options);

    var subject_list = that.Get_Subject_List();
    var school_list = that.Get_School_List();
    var faculty_list = that.Get_Faculty_List();

    that.Cluster_All(subject_list,school_list,faculty_list);

    var canvas = this.network.canvas.frame.canvas;
    /** @type {CanvasRenderingContext2D} */
    var c = canvas.getContext('2d');
    this.network.on("beforeDrawing", function(ctx) {})
    this.network.on("initRedraw", function(){})
    
    this.network.on('click', function(params){

      console.log(params);
      var clicked_node_id = params.nodes[0];
      console.log(nodes);
      if(that.network.isCluster(params.nodes[0]))
      {
        console.log("this is selected_node:"+params.nodes[0])
        console.log("Selected node is a cluster")
      }
    })
    this.network.on('doubleClick', function(params){
      
      var selected_node = params.nodes[0];

      
      console.log(this.options);


      if(that.network.isCluster(params.nodes[0]))
      {
        that.Uncluster(selected_node);
      }

      that.Turn_Off_Hierarchical(this.options);
      that.Turn_On_Physics(this.options);
      console.log(this.options);
      that.Turn_On_Hierarchical(this.options);
      console.log(this.options);
      
    })

    this.network.on("zoom", function (params) {})
    console.log("Loading Network");
  }

  public Get_Network_Data(units: Unit[]){
  var nodes =[];
  var edges = [];

  console.log(units);

  units.forEach(unit => {
    nodes.push({id:unit.id, label: unit.name, subject:unit.programme, topic: unit.topic, level: this.Find_Level(unit)})
    var prerequisites = this.Find_Prerequisites(unit);
    prerequisites.forEach(prereq => {
      edges.push({from: prereq ,to: unit.id})
    });
  });

  var network_data = {
    nodes: nodes,
    edges: edges
  };
    console.log("Turning data into nodes and edges")
    return network_data;
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
    return ["Aerospace Engineering (BEng)","Computer Science (BSc)"];
  }
  public Get_School_List(){
    return ["SCEEM","SAME"]
  }
  public Get_Faculty_List(){
    return ["Engineering"]
  }
  public Find_School(subject):String{
    return "SCEEM";
  }
  public Find_Faculty(school):String{
    return "Engineering";
  }
  public Get_Parents(node){

  }
  public Get_Children(node){

  }
  public Style_Parents(parents){
    
  }
  public Style_Children(children){

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
      size: 20,
      borderWidth:10,
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
      Faculty: this.Find_Faculty(school),
      size: 20,
      borderWidth:10,
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
    console.log("Clustering One School");
    var joinCon = function (nodeOptions) {
      return nodeOptions.faculty == faculty;
    };
    var properties = {
      level:0,
      label: faculty,
      id: id,
      size: 20,
      borderWidth:10,
      font:{size:12}
    };
    this.network.cluster({joinCondition: joinCon, clusterNodeProperties: properties});

  }
  public Cluster_Faculties(faculties){
    console.log("Clustering Many Schools");
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
    console.log(options.layout.hierarchical);
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
  }
  

  







}
