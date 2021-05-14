import { logging } from 'protractor';
import { UnitService } from './../services/unit.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Unit } from '../unit';
import { Network, Node, Edge } from 'vis-network';
import { DataSet} from 'vis-data';
import { option } from 'vis-util/esnext';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { useAnimation } from '@angular/animations';

declare var vis:any;

enum Mode {
  UNIT = 1,
  SUBJECT,
  SCHOOL,
  FACULTY,
  CLUSTERCENTRE,
}

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['./network.component.css']
})
export class NetworkComponent implements OnInit {
  @ViewChild("siteConfigNetwork") networkContainer: ElementRef;
  @ViewChild("pop") popOver: any;

  public nodes: any = new DataSet([]);
  public edges: any = new DataSet([]);
  public network: any;
  public mode: Mode;
  public current_Subject: String;
  public current_subject_nodes: any;
  public current_pre_reqs: number[];
  public current_post_reqs: number[];
  public current_max_tb: number;
  public current_max_units_per_tb:number;

  public unit_width:number;
  public unit_height:number;
  public unit_block_width:number;
  public unit_block_height:number;

  public units: Unit[];
  public subjects: String[];
  public schools: String[];
  public faculties: String[];
  public done: number;
  public tester: number;
  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.current_max_tb=0;
    this.current_max_units_per_tb=0;
    this.unit_width=150;
    this.unit_height=100;
    this.done = 0;
    this.mode = Mode.FACULTY;
    this.current_Subject= "No Subject";
    this.current_pre_reqs=[];
    this.current_post_reqs=[];
    var data = {
    nodes: this.nodes,
    edges: this.edges
    };

    this.Get_Subject_List();
    this.Get_School_List();
    this.Get_Faculty_List();
    this.getUnits(data);


    // create an array with edges
  }
  //Observer of the unitservice to recieve units from database
  public getUnits(data): void {
    this.unitService.getUnits().subscribe(
      (response: Unit[]) => {
          this.units = response;
          data = this.Get_Network_Data(response,data.nodes,data.edges);
          this.done++;
          this.All_Data_Loaded_Check();
        },
      (error: HttpErrorResponse) => {alert(error.message); }
    );
    console.log("Getting units");
  }
  public All_Data_Loaded_Check(){
    if(this.done>=4){
      this.Load_Vis_Network();
      this.Format_Loaded_Data(this.nodes,this.edges);

    }
  }
  //Create the network itself
  public Load_Vis_Network(){
    var data = {
      nodes: this.nodes,
      edges: this.edges,
      };
    console.log("Loading Network");
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
            fixed:true,
            },
      edges:{
              width:node_size/8,
              arrows:{to:{enabled:true,scaleFactor:0.5}},
              smooth:false,
              selectionWidth: node_size/3, //function (width) {return width*2;}
            },
      physics:
              { enabled: true,repulsion:{nodeDistance:300},maxVelocity:2,

              //wind:{x:1,y:0},
             },
      layout:{
              hierarchical:{enabled:false,direction:"LR"}
            },
          };
    this.network = new Network(container,data, options);
    this.network.setOptions(options);
    // nodes.add({id: 255, label: 'Node 255'});
    // nodes.add({id: 256, label: 'Node 256'});
    // var node255 = nodes.get(255);
    // var node256 = nodes.get(256);
    // this.Set_Node_Position(node255,nodes,5,5);
    // this.Style_Descendents([255,256],nodes,edges);



  }
  public Get_Network_Data(units: Unit[],nodes,edges){
    units.forEach(unit => {

      var prerequisites = this.Find_Prerequisites(unit);
      nodes.add({id:unit.id, label: this.Resize_Label(unit.name), subject:unit.programme,
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
  public Format_Loaded_Data(nodes,edges){
    this.Run_Network_Events(nodes,edges);
    this.Cluster_All(this.subjects,this.schools,this.faculties,nodes,edges);//

  }



  //Handles click zoom and drawing events
  public Run_Network_Events(nodes,edges){
    var that = this;
    var canvas = this.network.canvas.frame.canvas;
    this.network.on("beforeDrawing", function(ctx) {
      //that.Draw_Title("SuSy- Knower Knowlege Maps",ctx,0,-canvas.height/6);
      //that.Draw_Sub_Title("Computer Science BSc",ctx,0,-40);
    })
    this.network.on("afterDrawing", function(ctx) {
      that.Draw_Title("University of Bristol: Knowlege Map",ctx,0,-canvas.height/6);
      that.Draw_Body("Double click to navigate",ctx,0,-canvas.height/6+50);
      if(that.mode == Mode.UNIT){

        for (let i = 0; i < that.current_max_tb; i++) {
          console.log(that.current_max_units_per_tb)
          if(i % 2 == 0){
            that.Draw_Teaching_Block(ctx,-225+i*that.unit_width,20-that.unit_height/2,that.unit_width,that.unit_height*that.current_max_units_per_tb)

          }
          that.Draw_TB_Title(ctx,-225+that.unit_width*i,0,Math.ceil((i+1)/2),(i%2)+1);
        }

        that.Draw_Sub_Title(that.current_Subject,ctx,0,-130);
        that.Draw_Body("Click to a unit to see requirements, Double click to open its webpage",ctx,0,-80);
      }
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

//CANVAS DRAWING

  public Draw_Title(title,ctx,x,y){
    ctx.font = "bold 40px Tahoma";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 30;
    ctx.strokeText(title, x, y);
    ctx.fillStyle = 'rgba(200,0,0,1)';
    ctx.fillText(title,x,y);
  }
  public Draw_Sub_Title(title,ctx,x,y){
    ctx.font = "30px Tahoma";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 20;
    ctx.strokeText(title, x, y);
    ctx.fillStyle = 'rgba(0,0,0,1)'
    ctx.fillText(title,x,y);
  }
  public Draw_Body(title,ctx,x,y){
    ctx.font = "10px Tahoma";
    ctx.textAlign = "center";
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 10;
    ctx.strokeText(title, x, y);
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.fillText(title,x,y);
  }
  public Draw_Teaching_Block(ctx,x,y,width,height){
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(x-width/2,y,width,height);
  }
  public Draw_TB_Title(ctx,x,y,year,tb){
    var defecit = 50
    ctx.font = "bold italic 10px Arial";
    ctx.fillStyle = 'rgba(0,0,0,0.3)'
    ctx.textAlign = "center";

    ctx.fillText(`Year ${year} TB${tb}`,x,y-defecit);
  }

//EVENTS
  public Double_click(params,nodes,edges){
    if(params.nodes.length){
      var selected_node_id = params.nodes[0];

      if(this.network.isCluster(selected_node_id)){
          this.Uncluster(selected_node_id);
      }
      else{
        console.log("node is NOT a cluster")
        var unit = nodes.get(selected_node_id);

        window.open(unit.url, "_blank");
      }
  }


  }
  public Click(params,nodes,edges){
  //console.log(nodes[0]);
  if(this.mode == Mode.UNIT){
      this.current_subject_nodes.forEach(id => {
        node = nodes.get(id);
        this.Reset_Style(node.topic,nodes,node.id)
      });
    }
  var clicked_node_id = params.nodes[0];
  if(clicked_node_id){
      console.log(nodes.get(clicked_node_id));
    }
    if(params.nodes.length){

      if(this.network.isCluster(params.nodes[0]))
      {
        console.log("Selected node is a cluster")
        console.log(this.network.getNodesInCluster(params.nodes[0]))
      }
      else{
        var node = nodes.get(clicked_node_id);
        if(node.type == Mode.UNIT){
          var ancestors_Ids = this.Get_Ancestors_Ids(clicked_node_id,edges);
          this.Style_Ancestors(ancestors_Ids,nodes);
          var descendents_Ids = this.Get_Descendents_Ids(clicked_node_id,edges);
          this.Style_Descendents(descendents_Ids,nodes);
          var relatives = ancestors_Ids.concat(descendents_Ids);
          var non_relatives =[];
          this.current_subject_nodes.forEach(id => {
            if(!(relatives.includes(id)) && id != clicked_node_id){
              non_relatives.push(id);
            }
          });
          console.log(non_relatives)
          this.Fade_Nodes(non_relatives,nodes);
        }
      }
  }
  else{
    console.log("No node clicked");
  }

  }


  public Unit_View(){

  }

//FINDING DATA

  public Find_Prerequisites(unit: Unit): number[]{
    var prereqStr= unit.prerequisites;
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
  public Find_Node_Id_From_Label(label):number{
    console.log(label);
    var node_id = -1
    this.nodes.forEach(node => {
      if(node.label.toLowerCase().includes(label.toLowerCase()) ){
        node_id = node.id;
      }
    });
    return node_id;
  }
  public Search($event){
    var searched_id = this.Find_Node_Id_From_Label($event);
    if(searched_id!= -1){
      var pathway = this.network.findNode(searched_id);
      for (let i = 0; i < pathway.length-1; i++) {
      const cluster = pathway[i];
      //this.network.selectNodes([pathway[i]]);
      this.Uncluster(cluster);
      }
      this.network.selectNodes([searched_id]);
    }
    else{
      console.log("No such Unit");
    }
  }
  public Get_Subject_List(){
  this.unitService.getSubjects().subscribe(
    (response: String[]) => {
        this.subjects = response;
        this.done ++;
        this.All_Data_Loaded_Check();
      },
    (error: HttpErrorResponse) => {alert(error.message); }
  );
  }
  public Get_School_List(){
    this.unitService.getSchools().subscribe(
      (response: String[]) => {
          this.schools = response;
          this.done ++;
          this.All_Data_Loaded_Check();

        },
      (error: HttpErrorResponse) => {alert(error.message); }
    );
  }
  public Get_Faculty_List(){
    this.unitService.getFaculties().subscribe(
      (response: String[]) => {
          this.faculties = response;
          this.done ++;
          if(this.done >= 4){
            this.Format_Loaded_Data(this.nodes,this.edges);
          }
        },
      (error: HttpErrorResponse) => {alert(error.message); }
    );
  }
  public Find_School(subject):String{
    if(subject == "Computer Science (BSc)"|| subject == "Electrical and Electronic Engineering (BEng)")
    {
      return "School of Computer Science";
    }
    else if (subject == "Aerospace Engineering (BEng)"|| subject == "Civil Engineering (BEng)"){
      return "School of Aerospace Engineering";
    }
    else if(subject == "Physics (BSc)"|| subject == "Chemical Physics (BSc)"){
      return "School of Physics";
    }
    else if(subject == "Anthropology (BA)"){
      return "School of Anthropology and Archaeology";
    }
    else if(subject == "Philosophy (BA)" ){
      return "School of Philosophy";
    }
    else if(subject == "Psychology (BSc)"){
      return "School of Psychological Science";
    }
    else if(subject == "Mathematics (MSci)"|| subject == "Data Science (BSc)"){
      return "School of Mathematics";
    }
    else if(subject == "Honours Law (LLB)"){
      return "University of Bristol Law School";
    }
    else if(subject == "Management (BSc)"){
      return "School of Management";
    }
    else if(subject == "English (BA)"){
      return "School of English";
    }
    else if(subject == "Zoology (BSc)"){
      return "School of Biological Sciences";
    }
    else{
      return "Error";
    }

  }
  public Find_Faculty(school):String{

    //return "WRITE FUNCTION";
    if(school == "School of Computer Science"||school == "School of Aerospace Engineering"){
      return "Engineering";
    }
    else if (school == "School of Mathematics"|| school == "School of Physics"){
      return "Science"
    }
    else if (school == "University of Bristol Law School"|| school == "School of Management"){
      return "Social Sciences and Law"
    }
    else if (school == "School of Philosophy"|| school == "School of Anthropology and Archaeology"|| school == "School of English"){
      return "Arts"
    }
    else if (school == "School of Psychological Science"|| school == "School of Biological Sciences"){
      return "Life Sciences"
    }
    else{
      return "Faculty of Engineering";
    }
  }




//GETTING PRE/POST REQUITSITE IDS

  public Get_Parents_Ids(node_Id,edges){
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
  public Get_Ancestors_Ids(node_Id,edges){
    var ancestors_Ids =[];
    ancestors_Ids = ancestors_Ids.concat(this.Get_Parents_Ids(node_Id,edges))
    ancestors_Ids.forEach(ancestor => {
      this.Get_Ancestors_Ids(ancestor,edges);
    });
    this.current_post_reqs = ancestors_Ids;
    return ancestors_Ids
  }
  public Get_Children_Ids(node_Id,edges){
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
  public Get_Descendents_Ids(node_Id,edges){
    var descendents_Ids =[];
    descendents_Ids = descendents_Ids.concat(this.Get_Children_Ids(node_Id,edges))
    descendents_Ids.forEach(descendent => {
      this.Get_Descendents_Ids(descendent,edges);
    });
    this.current_pre_reqs = descendents_Ids;
    return descendents_Ids
  }
  public Style_Ancestors(ancestor_Ids,nodes){
    ancestor_Ids.forEach(ancestor_Id => {
      var parent = nodes.get(ancestor_Id);
      parent.color = {background:"red"}
      nodes.update(parent);
    });
  }
  public Style_Descendents(descendent_Ids,nodes){
    descendent_Ids.forEach(descendent_Id => {
      var descendent = nodes.get(descendent_Id);
      descendent.color = {background:"lightgreen"}
      nodes.update(descendent);
    });
  }

//STYLING
  public Style_Node(node,style){

  }
  public Fade_Node(node_id,nodes){
    var node = nodes.get(node_id)
    node.color = 'rgba(100,100,100,0.1)';
    nodes.update(node);
  }
  public Fade_Nodes(node_ids,nodes){
    node_ids.forEach(id => {
      this.Fade_Node(id,nodes);
    });
  }
  public Reset_Style(topic,nodes,node_id){
    if(topic == null){
      topic = 1;
    }
    var gr = this.network.groups._defaultGroups[topic];
    gr.id = node_id;
    nodes.update(gr);
    console.log(gr);
  }
  public Resize_Label(label): String{
    if(label.length < 17){
      return label;
    }
    else{
      label =label.split(' ').join('\n');
      return label;
    }

  }



  public Reset_Nodes(nodes,edges){
    this.Cluster_All(this.subjects,this.schools,this.faculties,nodes,edges);
  }



  public Cluster_One_Subject(subject,id){
    console.log("Clustering One Subject");
    var joinCon = function (nodeOptions) {
      return nodeOptions.subject == subject;
    };
    var cluster_properties = {
      level:0,
      label: subject,
      id: id,
      school: this.Find_School(subject),
      type: Mode.SUBJECT,
      size: 14,
      borderWidth:7,
      font:{size:12},
      allowSingleNodeCluster: true,
      fixed:false
    };

    this.network.cluster({joinCondition: joinCon, clusterNodeProperties: cluster_properties});
  }
  public Cluster_Sujects(subjects: String[]){
    console.log("Clustering Many Subjects");
    var id = 1000;
    subjects.forEach(subject => {
      this.Cluster_One_Subject(subject,id);
      id++;
    });

  }
  public Cluster_One_School(school,id,nodes,edges){
    console.log("Clustering One School");
    var joinCon = function (nodeOptions) {
      return nodeOptions.school == school;
    };
    var cluster_properties = {
      level:0,
      label: school,
      color:{border: 'red'},
      id: id,
      faculty: this.Find_Faculty(school),
      type: Mode.SCHOOL,
      size: 17,
      borderWidth:8,
      font:{size:12},
      allowSingleNodeCluster: true,
      fixed:false,
    };
    this.network.cluster({joinCondition: joinCon, clusterNodeProperties: cluster_properties});

  }
  public Add_Centre_Node(id,faculty,nodes,edges){
    nodes.add({id:id,color:"green",faculty:faculty,type:Mode.CLUSTERCENTRE});
  }
  public Add_Centre_Nodes(id,faculty,nodes,edges,faculties){
    faculties.forEach(element => {

    });
  }
  public Cluster_Schools(schools,nodes,edges){
    console.log("Clustering Many Schools");
    var id = 2000;
    schools.forEach(school => {
      this.Cluster_One_School(school,id,nodes,edges);
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
      color: {border:'rgba(0,0,200,1)'},
      label: faculty,
      id: id,
      type: Mode.FACULTY,
      size: 25,
      borderWidth:10,
      font:{size:12},
      allowSingleNodeCluster: true,
      fixed:false,
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
  public Uncluster(cluster_id){
    console.log("Unclustering cluster")
    var cluster = this.network.body.nodes[cluster_id].options;
    if(cluster.type == Mode.SUBJECT){
        var nodes_in_cluster = this.network.getNodesInCluster(cluster_id);
        this.current_Subject = cluster.label;
        this.current_subject_nodes = nodes_in_cluster;
        this.network.openCluster(cluster_id);
        this.Set_Unit_Positions(nodes_in_cluster,this.nodes);
        this.Fit_To_Selection(nodes_in_cluster);
        this.mode = Mode.UNIT;
        this.Turn_On_Physics(this.network.options);
    }
    else if(cluster.type == Mode.FACULTY){
      this.mode = Mode.SCHOOL;
      var nodes_in_cluster = this.network.getNodesInCluster(cluster_id);
      this.network.openCluster(cluster_id);
      //this.Fit_To_Selection(nodes_in_cluster)
    }
    else if(cluster.type == Mode.SCHOOL){
      this.mode = Mode.SUBJECT;
      var nodes_in_cluster = this.network.getNodesInCluster(cluster_id);
      this.network.openCluster(cluster_id);
      //this.Fit_To_Selection(nodes_in_cluster)
    }

  }
  public Cluster_All(subjects,schools,faculties,nodes,edges){
    this.Cluster_Sujects(subjects);
    this.Cluster_Schools(schools,nodes,edges);
    this.Cluster_Faculties(faculties);
  }





  public Turn_On_Physics(options){
    console.log("Turning Physics On");
    options.physics = {wind: { x: 0, y: 1 }};
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

  public Test_Routine(){

  }


  public Fit_To_Selection(node_Ids){
    console.log(node_Ids)
    this.network.fit({nodes:node_Ids,animation:true});
    //this.network.options.
  }
  public Set_Node_Position(node,nodes,x:number,y:number){
    node.x = x;
    node.y = y;
    nodes.update(node);
  }
  public Set_Unit_Positions(units,nodes){
    var y = 0;
    var currentLevel =-1;
    var xOffset = -375; // should be number of levels+1/2 *150
    var yValues = [];

    units.forEach(unit => {
      var node = nodes.get(unit);
      console.log(node.level)


      if(node.level > this.current_max_tb){
        this.current_max_tb= node.level;

      }

      if(!(node.level == currentLevel)){
        if(yValues[node.level]){
          yValues[node.level] += 1;
        }
        else{
          yValues[node.level]=0;
        }
        y = 0//yValues[node.level];
        currentLevel = node.level;
        
        console.log(yValues)
      }
      else{
        yValues[node.level] += 1;
      }
      if(yValues[node.level]+1>(this.current_max_units_per_tb)){
        this.current_max_units_per_tb = yValues[node.level]+1;
      }
      this.Set_Node_Position(node,nodes,this.unit_width*node.level+xOffset,yValues[node.level]*this.unit_height);
      y++;

    });
  }
  public Position_Subjects(){}//Or a general one for clusters
  public Clean_Up_Unseleected(){};











}
