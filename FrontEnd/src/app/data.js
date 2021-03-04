var nodes = new vis.DataSet([
    { id: 1, label: "Algorithms 2",group:"Alg"},
    { id: 2, label: "Mathematics for Computer Science",group:"Maths"},
    { id: 3, label: "Algorithms 1",group:"Alg"},
    { id: 4, label: "Imperative Programming",group:"Prog"},
    { id: 5, label: "Advanced Algorithms",group:"Alg"},
    { id: 6, label: "Computer Vision",group:"Alg"}
  ]);
  nodes.add({id:7, label:"Computational Neuroscience",group:"Neuro"});
  nodes.add({id:8, label:"Human Computer interaction",color: {background:"orange"}});
  nodes.add({id:9, label:"LEVEL 0 INDICATOR",level:0,group:"IDENT"});
  nodes.add({id:10, label:"LEVEL 1 INDICATOR",level:1,group:"IDENT"});
  nodes.add({id:11, label:"LEVEL -1 INDICATOR",level:-1,group:"IDENT"});

  // create an array with edges
  var edges = new vis.DataSet([
    /*{ from: 4, to: 1, id:"4-1"},
    { from: 3, to: 1, id:"3-1" },
    { from: 2, to: 1, id:"2-1" },
    { from: 1, to: 5, id:"1-5" },
    { from: 5, to: 6, id:"6-1" },
    { from: 1, to: 7, id:"1-7" },*/
  ]);

  console.log(nodes.get(1));

function makeNode(){
    //function to make the nodes in the format desired
}

function makeEdge(fromLabel,toLabel){
    fromNode =nodes.get({
        filter: function (node) {
            return (node.label == fromLabel);
          }
    })
    toNode =nodes.get({
        filter: function (node) {
            return (node.label == toLabel);
          }
    })
    edges.add({from:fromNode.id,to:toNode.id})
}

makeEdge("Algorithms 2","Algorithms 1");
