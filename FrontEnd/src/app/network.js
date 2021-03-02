
  // create an array with nodes
  var nodes = new vis.DataSet([
    { id: 1, label: "Algorithms 2", level:-2},
    { id: 2, label: "Mathematics for Computer Science",target:true,level:2},
    { id: 3, label: "Algorithms 1",level:1},
    { id: 4, label: "Imperative Programming",level:3},
    { id: 5, label: "Advanced Algorithms",level:4},
  ]);

  


  nodes.add({id:7, label:"Computational Neuroscience",color: {background:"cyan"}});
  nodes.add({id:8, label:"Human Computer interaction",color: {background:"orange"}});

  var pres;
  var pos;




  // create an array with edges
  var edges = new vis.DataSet([
    { from: 4, to: 1 },
    { from: 3, to: 1 },
    { from: 2, to: 1 },
    { from: 5, to: 1 },
    { from: 6, to: 1 },
    { from: 7, to: 1 },
    { from: 9, to: 1 },
  ]);

  var nodeSize=15;


  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    nodes:{shape: "dot",
        size:nodeSize,
        borderWidth: 5,
        color:{border:"black"},
        font:{face:"tahoma"},
        level:0,
    },
    edges:{
        width:nodeSize/2,
    },
    physics:false,
    layout:{
        hierarchical:{enabled:true}
    }
  };


  var network = new vis.Network(container, data, options);

function helloTarget(){
    nodes.forEach(node => {
        if (node.target == true){
            console.log(node.id+" : "+node.target)
            nodes.update({id:node.id,label:"Target",color:"rgba(11, 200, 234, 0.6)"})
            setLevel(node.id,0);
        }
    });
}

function Levels(){
    nodes.forEach(node =>{
        //nodes.update({id:node.id,level:node.id})
        console.log(node.level)
    });
}

function setLevel(Nid,Nlev){
    nodes.update({id:Nid,level:Nlev})
}


var edgeWidth= options.nodes.size;
console.log(options.edges.width)
  console.log(edgeWidth)

helloTarget();
Levels();