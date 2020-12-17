// create an array with nodes
import * as vis from "./../vis-network"

var nodes = new vis.DataSet([
  { id: 1, label: "F" , color: "red", },
  { id: 2, label: "U" },
  { id: 3, label: "C", color: "green" },
  { id: 4, label: "K" },
  { id: 5, label: "Y", color: "purple" },
]);

nodes.add({id:7, label:"O"});
nodes.add({id:8, label:"U"});

var pres;
var pos;
//var courses = new vis.DataSet([]};



// create an array with edges
var edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 4, to: 4},
  { from: 2, to: 5 },
  { from: 3, to: 3 },
]);

// create a network
var container = document.getElementById("mynetwork");
var data = {
  nodes: nodes,
  edges: edges,
};
var options = {};
var network = new vis.Network(container, data, options);
