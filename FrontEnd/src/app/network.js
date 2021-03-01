
  // create an array with nodes
  var nodes = new vis.DataSet([
    { id: 1, label: "Algorithms 2"},
    { id: 2, label: "Mathematics for Computer Science"},
    { id: 3, label: "Algorithms 1"},
    { id: 4, label: "Imperative Programming"},
    { id: 5, label: "Advanced Algorithms"},
  ]);

  nodes.add({id:7, label:"Computational Neuroscience",color: {background:"cyan"}});
  nodes.add({id:8, label:"Human Computer interaction",color: {background:"orange"}});

  var pres;
  var pos;
  //var courses = new vis.DataSet([]};



  // create an array with edges
  var edges = new vis.DataSet([
    { from: 4, to: 1 },
    { from: 3, to: 1 },
    { from: 2, to: 1 },
    { from: 5, to: 1},
    { from: 6, to: 1 },
    { from: 7, to: 1 },
  ]);

  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    nodes:{shape: "dot", borderWidth: 5, color:{border: "black", background: "green"}}
  };
  var network = new vis.Network(container, data, options);