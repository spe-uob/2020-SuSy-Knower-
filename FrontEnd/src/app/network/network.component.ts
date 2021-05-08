import { UnitService } from './../services/unit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Unit } from '../unit';
import { Network } from 'vis';

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
  }

  public Load_Vis_Network(network_data,that){
    var net_options = {
      interaction: {
        hover: true,
      },
      manipulation: {
				enabled: true
			}
    }

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
    this.network.setOptions(options);

    var canvas = this.network.canvas.frame.canvas;
    /** @type {CanvasRenderingContext2D} */
    var c = canvas.getContext('2d');
    this.network.on("beforeDrawing", function(ctx) {})
    this.network.on("initRedraw", function(){})

    this.network.on('click', function(params){
      console.log(params);
      var clicked_node_id = params.nodes[0];
      console.log(clicked_node_id);
    })
    this.network.on('doubleClick', function(params){
      var label = that.Resize_Label("hello");
      console.log(label);
      that.Toggle_Physics(this.options);
      console.log(this.options);
    })
    this.network.on("zoom", function (params) {})

  
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
    return ["Computer Science","Aerospace Engineering"]
  }
  public Get_School_List(){
    return ["SCEEM","SAME"]
  }
  public Get_Faculty_List(){
    return ["Engineering"]
  }
  public Find_School(){

  }
  public Find_Faculty(){

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
  public Cluster_One_Subject(network,subject){

  }
  public Cluster_Sujects(network,subjects){
    subjects.forEach(subject => {
      this.Cluster_One_Subject(network,subject);
    });
  }
  public Cluster_One_School(network,school){

  }
  public Cluster_All_School(network,schools){
    schools.forEach(school => {
      this.Cluster_One_School(network,school);
    });
  
  }
  public Toggle_Physics(options){
    options.physics = !options.physics;
    this.network.setOptions(options);
  }
  

  







}
