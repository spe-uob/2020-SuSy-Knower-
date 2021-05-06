import { Observable } from 'rxjs';
import { Label } from './../../../../vis-network/lib/network/modules/components/edges/util/types';

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ElementRef, Renderer2 } from '@angular/core';
import { Unit } from '../unit';
import { UnitService } from '../unit.service';

declare var vis:any;

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
          console.log(this.units);
          var network_data = this.Get_Network_Data(response);
          this.Load_Vis_Network(network_data);},

      (error: HttpErrorResponse) => {alert(error.message); }
    );
  }

  Load_Vis_Network(network_data){
    var net_options = {
      interaction: {
        hover: true,
      },
      manipulation: {
				enabled: true
			}
    }
    var node_size =15
    

    var options = {

      interaction:{zoomSpeed: 0.1},

      nodes:{shape: "dot", size:node_size, borderWidth: node_size/2,
            color:{ border:'green',background:"white",
                  highlight: {border: 'black',background: 'white'},},
            font:{face:"tahoma",size:12,strokeWidth: 3,strokeColor: "#ffffff"},
            level:0,
            },
      edges:{
              width:node_size/8,
              arrows:{to:{enabled:true,scaleFactor:0.5}},
            },
      physics:
              { enabled: true},
      layout:{
              hierarchical:{enabled:false,direction:"LR"}
            }
    };

    var container = document.getElementById("mynetwork");
    this.network = new vis.Network(container, network_data, options);
    this.network.setOptions(options);

    var canvas = this.network.canvas.frame.canvas;
    /** @type {CanvasRenderingContext2D} */
    var c = canvas.getContext('2d');

    var that = this;
    this.network.on("hoverNode", function (params) {      
      //popOver.nativeElement.show();
      that.popOver.show();
      console.log('hoverNode Event:', params);
    });
    this.network.on("blurNode", function(params){
      console.log('blurNode event:', params);
      that.popOver.hide();
    });

  }

  public Get_Network_Data(units: Unit[]){


  var nodes =[
      // {id: 1, label: 'Node 1', title: 'I am node 1!'},
      // {id: 2, label: 'Node 2', title: 'I am node 2!'},
      // {id: 3, label: 'Node 3'},
      // {id: 4, label: 'Node 4'},
      // {id: 5, label: 'Node 5'}
  ];

  console.log(units);

  units.forEach(unit => {
    nodes.push({id:unit.id, label: unit.name, subject:unit.programme})
  });
      

    

  var edges = [
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5}
  ];
  var network_data = {
    nodes: nodes,
    edges: edges
  };
    return network_data;
  }

}
