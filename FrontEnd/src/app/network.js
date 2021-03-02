
  // create an array with nodes
  var nodes = new vis.DataSet([
    { id: 1, label: "Algorithms 2", level:-1},
    { id: 2, label: "Mathematics for Computer Science",target:true,level:-2},
    { id: 3, label: "Algorithms 1",level:-3},
    { id: 4, label: "Imperative Programming",level:1},
    { id: 5, label: "Advanced Algorithms",level:2},
  ]);
  nodes.add({id:7, label:"Computational Neuroscience",color: {background:"cyan"}});
  nodes.add({id:8, label:"Human Computer interaction",color: {background:"orange"}});

  // create an array with edges
  var edges = new vis.DataSet([
    { from: 4, to: 1, id:"4-1"},
    { from: 1, to: 3, id:"1-3" },
    { from: 1, to: 2, id:"1-2" },
    { from: 5, to: 1, id:"5-1" },
    { from: 6, to: 1, id:"6-1" },
    { from: 7, to: 1, id:"7-1" },
    { from: 9, to: 1, id: "9-1" },
  ]);

  var nodeSize=15;
  var targetNodeId=1;
  var targetNodeLevel=0;

  // create a network
  var container = document.getElementById("mynetwork");
  var data = {
    nodes: nodes,
    edges: edges,
  };
  var options = {
    nodes:{shape: "dot",
        size:nodeSize,
        borderWidth: nodeSize/4,
        color:{border:"black",background:"white"},
        font:{face:"tahoma"},
        level:0,
    },
    edges:{
        width:nodeSize/2,
    },
    physics:true,
    layout:{
        hierarchical:{enabled:true}
    }
  };

var network = new vis.Network(container, data, options);
// finished network creation


// START OF FUNCTIONS

//transforms style and properties of target node
function styleTarget(){
            nodes.update({id:targetNodeId,color:{border:'red'},fixed:true});
            setLevel(targetNodeId,0);
}
//turn previous target to regular node
function revertFromTarget(prevId){
    nodes.update({id:prevId,color:{border:'black'},fixed:false});
    setLevel(prevId,1)
}
//assigns new target, styles it and reverts old target.
function setTarget(newTargetId){
    nodes.update({id:newTargetId,target:true});
    revertFromTarget(targetNodeId);//revert old target node;
    targetNodeId= newTargetId;
    styleTarget();
}
//sets level of specific node
function setLevel(nodeId,Nlev){
    nodes.update({id:nodeId,level:Nlev})
}
//logs levels of all nodes
function displayLevels(){
    nodes.forEach(node =>{
        //nodes.update({id:node.id,level:node.id})
        console.log(node.level)
    });
}

//returns node object from given Id 
function getNodeFromId(nodeId){
    nodes.forEach(node => {
        if(node.id == nodeId){
            return node;
        }
    });
    return console.error("no node found");
}

function makeParentsAndChildren(nodeId){
    var edgeIds = network.getConnectedEdges(nodeId);
    edgeIds.forEach(edgeId => {
        var edge = edges.get(edgeId);
        console.log("this is the edge id:"+edge.id)
        if(edge.from == nodeId){
            makeParentEdge(edge);
        }
        else{
            makeChildEdge(edge);
        }
    });
}

function makeParentEdge(edge){
    console.log("making edge parent with id:"+edge.id);
    nodes.update({id:edge.to,level:-1});
}
function makeChildEdge(edge){
    console.log("making edge child with id:"+edge.id);
    nodes.update({id:edge.to,level:1});
}

//on double click sets the selected node to be target node
network.on('doubleClick', function(params){
    selectedNodes = network.getSelectedNodes();
    console.log(selectedNodes);
    selectedNodes.forEach(nodeId => {
        setTarget(nodeId);
    });
});
network.on('click', function(params){
    selectedNodes = network.getSelectedNodes();
    selectedNodes.forEach(nodeId => {
        console.log(network.getConnectedEdges(nodeId));
    });
});


makeParentsAndChildren(1);

//helloTarget();
displayLevels();