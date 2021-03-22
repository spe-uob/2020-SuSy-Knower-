
  var nodeSize=6;
  var targetNodeId=1;
  var targetRevertLevel=0;
  var initLevelNumber=4;

  const fadeSelector = document.getElementById("FadeBox");
  const fitButton = document.getElementById("FitButton");
  const newFunction = document.getElementById("ClusterBox");

  console.log(fadeSelector);

  

  class colour{
      constructor(r = 255,g =255, b= 255,a =1){
          this.r =r;
          this.g =g;
          this.b =b;
          this.a =a;
          this.c = "rgba("+r+","+g+","+b+","+a+")";
      }
      setColour(){
          this.c = "rgba("+r+","+g+","+b+","+a+")";
      }
  }
  var testColour = new colour(50,68,187,1);
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
        borderWidth: nodeSize/3,
        color:{ border:'black',
                background:"white",
                highlight: {
                    border: 'black',
                    background: 'white'
                  },},
        font:{face:"tahoma",size:7,strokeWidth: 2,
        strokeColor: "#ffffff"},
        level:0,
        chosen:true,
    },
    groups:{
        Alg:{color:{border:"crimson"}},
        Prog:{color:{border:"orange"}},
        Maths:{color:{border:"forestgreen"}},
        Neuro:{color:{border:"purple"}},
        IDENT:{color:"grey",opacity:0.5},
        NOGROUP:{opacity:0}
    },
    edges:{
        width:nodeSize/4,
        arrows:{to:{enabled:true,scaleFactor:0.25}},
        //color:{inherit:"both"},
    },
    physics:
    { enabled: false
        /*xhierarchicalRepulsion: {
            centralGravity: 0.5,
            springLength: 200,
            springConstant: 0.01,
            nodeDistance: 200,
            damping: 0.2,
            avoidOverlap: 0.7
      }*/
    },
    layout:{
        hierarchical:{enabled:true,direction:"LR"}
    }
  };
var network = new vis.Network(container, data, options);
// finish of network creation



// START OF FUNCTIONS

//transforms style and properties of target node
function styleTarget(){
            nodes.update({id:targetNodeId,fixed:true});
            //setLevel(targetNodeId,0);
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
function displayLevels(nodes){
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
    edges.update({id:edge.id});
    nodes.update({id:node.id,/*level:level+1,*/color:{background:"red"}});
    makeParents(nodes.get(node.id));
}
function styleChild(edge,level){
    edges.update({id:edge.id});
    node = nodes.get(edge.from);
    nodes.update({id:node.id,/*level:level-1, */color:{background:"green"}});
    makeChildren(nodes.get(node.id));
}
//Perhaps make a default setting
function resetNodeStyles(nodes){
    nodes.forEach(node => {
        nodes.update({id:node.id,color:{background:"white"},size:nodeSize,borderWidth:nodeSize/2});
    });
}

function highlightEdges(edges){
    edges.forEach(edge => {
        highlightEdge(edge);
    });
}
function highlightEdge(edge){
    edges.update({id:edge.id,width:3});
}
function lowlightEdges(edges){
    edges.forEach(edge => {
        lowlightEdge(edge);
    });
}
function lowlightEdge(edge){
    edges.update({id:edge.id,width:1});
}
function highlightNode(node){
    bigSize = nodeSize*2
    nodes.update({id:node.id,size:bigSize,borderWidth:bigSize/2})
}
function lowlightNode(node){
    nodes.update({id:node.id,size:nodeSize})
}
function lowlightNodes(nodes){
    nodes.forEach(node => {
        lowlightNode(node);
    });
}

function FadeNode(fnode){
    nodes.update({id:fnode.id,color:"lightgrey"});
    nodes.forEach(node => {
        //console.log("opacity of "+node.label+" is: "+node.opacity);
    });
}
function FadeEdge(fedge){
    edges.update({id:fedge.id,color:"lightgrey"});
}
function FadeAll(nodes){
    nodes.forEach(node => {
        FadeNode(node);
    });
    edges.forEach(edge =>{
        FadeEdge(edge);
    });
}

const edgesFilter = (edge) => {
    return edgesFilterValues[edge.relation];
  };

/*var topicEdges = edges.get({
  filter: function (edge) {
    return (edge.label == 2);
  }
});*/



//EVENT FUNCTIONS. PLACE ANY FUNCTION WHICH RELIES ON USER INPUT
network.on('doubleClick', function(params){
    network.fit(nodes);
    var node = nodes.get(params.nodes[0]);
  //window.open(node.url, "_blank");
});
network.on('click', function(params){
    console.log(params)
    resetNodeStyles(nodes);
    //console.log(node);
    params.nodes.forEach(nodeId => {
        console.log(nodes.get(nodeId));
        lowlightEdges(edges);
        logConnections(nodes.get(nodeId));
        logLevel(nodes.get(nodeId));
        setTarget(nodeId);
    });
});
network.on("selectEdge", function(params) {
    //highlightEdges(edges);
    /*if (params.nodes.length == 1) {
      var nodeId = params.nodes[0];
      if (nodes.get(nodeId).url != null) {
        window.open(nodes.get(nodeId).url, '_blank');
      }

    } else if ((params.edges.length == 1) && (params.nodes.length == 0)) {
      var edgeId = params.edges[0];
      window.open(edges.get(edgeId).url, '_blank');
    }*/


  });

  fadeSelector.addEventListener("change", (e) => {
    const { value, checked } = e.target;
    if(checked){
        console.log("Fading Nodes")
        FadeAll(nodes);
    }
    else{
        console.log("Ready to Unfade");
    }
  })
  fitButton.addEventListener("click",(e) =>{
      network.fit(nodes);
    })

//LOG FUNCTIONS. USED FOR DEBUGGING.
function logLevel(node){
    console.log("Level of this node: "+node.level);
}
function logConnections(node){
    console.log(network.getConnectedEdges(node.id))
}


function setLevelForAll(nodes,levels){
    nodes.forEach(node => {
        if(node.group!="IDENT"){
            console.log(node.id% levels)
            setLevel(node.id,(node.id % levels)-Math.floor(levels/2));
        }
    });
}





//FadeAll(nodes);


//hello