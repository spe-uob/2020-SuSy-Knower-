
  // create an array with nodes
  var nodes = new vis.DataSet([
    { id: 1, label: "Algorithms 2", level:-1},
    { id: 2, label: "Mathematics for Computer Science",target:true,level:-2},
    { id: 3, label: "Algorithms 1",level:-3},
    { id: 4, label: "Imperative Programming",level:1},
    { id: 5, label: "Advanced Algorithms",level:2},
    { id: 6, label: "Computer Vision", level:0}
  ]);
  nodes.add({id:7, label:"Computational Neuroscience",color: {background:"cyan"}});
  nodes.add({id:8, label:"Human Computer interaction",color: {background:"orange"}});

  // create an array with edges
  var edges = new vis.DataSet([
    { from: 4, to: 1, id:"4-1"},
    { from: 3, to: 1, id:"3-1" },
    { from: 1, to: 2, id:"1-2" },
    { from: 1, to: 5, id:"1-5" },
    { from: 5, to: 6, id:"6-1" },
    { from: 7, to: 1, id:"7-1" },
    { from: 9, to: 1, id:"9-1" },
  ]);

  var nodeSize=15;
  var targetNodeId=1;
  var targetRevertLevel=0;

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
        chosen:true,
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
            nodes.update({id:targetNodeId,fixed:true});
            setLevel(targetNodeId,0);
}
//turn previous target to regular node
function revertFromTarget(prevId,prevLevel){
    nodes.update({id:prevId,fixed:false});
    setLevel(prevId,prevLevel) //TODO: Change from '1' to previous level.
}
//assigns new target, styles it and reverts old target.
function setTarget(newTargetId){
    var newTarget = nodes.get(newTargetId);
    nodes.update({id:newTargetId,target:true});
    revertFromTarget(targetNodeId,targetRevertLevel);//revert old target node;
    targetNodeId= newTargetId;
    targetRevertLevel = newTarget.level;
    styleTarget();
    makeParentsAndChildren(nodes.get(newTargetId));
}
//sets level of specific node
function setLevel(nodeId,Nlev){
    nodes.update({id:nodeId,level:Nlev})
}
//logs levels of all nodes
function displayLevels(){
    nodes.forEach(node =>{
        //nodes.update({id:node.id,level:node.id})
        console.log(node.label+" is at level "+node.level)
    });
}

function makeParentsAndChildren(node){
    var edgeIds = network.getConnectedEdges(node.id);
    edgeIds.forEach(edgeId => {
        var edge = edges.get(edgeId);
        console.log("this is the edge id:"+edge.id)
        if(edge.from == node.id){
            styleParent(edge,node.level);
        }
        else{
            styleChild(edge,node.level);
        }
    });
}

//COULD change to array of ids. aim is to work recursively.
function makeParents(node){
    var edgeIds = network.getConnectedEdges(node.id);
    edgeIds.forEach(edgeId => {
        var edge = edges.get(edgeId);
        console.log("this is the edge id:"+edge.id)
        if(edge.from == node.id){
            styleParent(edge,node.level);
        }
    });
}
function makeChildren(node){
    var edgeIds = network.getConnectedEdges(node.id);
    edgeIds.forEach(edgeId => {
        var edge = edges.get(edgeId);
        console.log("this is the edge id:"+edge.id)
        if(edge.to == node.id){
            styleChild(edge,node.level);
        }
    });
}


function styleParent(edge,level){
    console.log("making edge PARENT with TO:"+edge.to);
    edges.update({id:edge.id,label:"POST"});
    node = nodes.get(edge.to);
    nodes.update({id:node.id,level:level-1});
    makeParents(node);
}
function styleChild(edge,level){
    console.log("making edge CHILD with FROM:"+edge.from);
    edges.update({id:edge.id,label:"PRE"});
    node = nodes.get(edge.from);
    nodes.update({id:node.id,level:level+1});
    makeChildren(node);
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

displayLevels();