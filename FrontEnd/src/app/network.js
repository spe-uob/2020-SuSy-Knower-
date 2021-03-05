
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
    interaction:{zoomSpeed:0.2},
    nodes:{shape: "dot",
        size:nodeSize,
        borderWidth: nodeSize/4,
        color:{ border:"black",
                background:"white",
                highlight: {
                    border: 'black',
                    background: 'white'
                  },},
        font:{face:"tahoma"},
        level:0,
        chosen:true,
    },
    groups:{
        Alg:{color:{border:"red"}},
        Prog:{color:{border:"orange"}},
        Maths:{color:{border:"green"}},
        Neuro:{color:{border:"purple"}},
        IDENT:{color:"grey"},
        NOGROUP:{color:{border:"black"}}
    },
    edges:{
        width:nodeSize/2,
        //color:{inherit:"both"},
    },
    physics:
    {
        hierarchicalRepulsion: {
            centralGravity: 0.5,
            springLength: 200,
            springConstant: 0.01,
            nodeDistance: 200,
            damping: 0.2,
            avoidOverlap: 0.7
      }
    },
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
        console.log(node.label+" is at level "+node.level)
    });
}

function makeParentsAndChildren(node){
    var edgeIds = network.getConnectedEdges(node.id);
    edgeIds.forEach(edgeId => {
        var edge = edges.get(edgeId);
        if(edge.from == node.id){
            styleParent(edge,node.level);
        }
        else if(edge.to==node.id){
            styleChild(edge,node.level);
        }
    });
}

//COULD change to array of ids. aim is to work recursively.
function makeParents(node){
    var edgeIds = network.getConnectedEdges(node.id);
    edgeIds.forEach(edgeId => {
        var edge = edges.get(edgeId);
        if(edge.from == node.id){
            styleParent(edge,node.level);
        }
    });
}
function makeChildren(node){
    var edgeIds = network.getConnectedEdges(node.id);
    edgeIds.forEach(edgeId => {
        var edge = edges.get(edgeId);
        if(edge.to == node.id){
            styleChild(edge,node.level);
        }
    });
}


function styleParent(edge,level){
    node = nodes.get(edge.to);
    edges.update({id:edge.id,label:"POST"});
    nodes.update({id:node.id,level:level-1});
    makeParents(nodes.get(node.id));
}
function styleChild(edge,level){
    edges.update({id:edge.id,label:"PRE"});
    node = nodes.get(edge.from);
    nodes.update({id:node.id,level:level+1});
    makeChildren(nodes.get(node.id));
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
        //console.log(network.getConnectedEdges(nodeId));
    });
});

nodes.forEach(node => {
    if(node.group!="IDENT"){
        setLevel(node.id,0);
    }
});

function FadeNode(fnode){
    nodes.update({id:fnode.id,opacity:0.5});
    nodes.forEach(node => {
        //console.log("opacity of "+node.label+" is: "+node.opacity);
    });
}
function FadeEdge(fedge){
    edges.update({id:fedge.id,opacity:0});
}
function FadeAll(){
    nodes.forEach(node => {
        FadeNode(node);
    });
    edges.forEach(edge =>{
        FadeEdge(edge);
    });
}
console.log(nodes.get(1))
//displayLevels();
FadeAll();