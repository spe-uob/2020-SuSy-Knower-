
  var nodeSize=10;
  var targetNodeId=1;
  var targetRevertLevel=0;
  var initLevelNumber=4;

  const nodesView = new vis.DataView(nodes);
  const edgesView = new vis.DataView(edges);

  const fadeSelector = document.getElementById("FadeBox");
  const fitButton = document.getElementById("FitButton");
  const FitButtonWithCondition = document.getElementById("FitButtonWithCondition");
  const ClusterButton = document.getElementById("ClusterButton");
  const UnClusterButton = document.getElementById("UnClusterButton");
  const outBox = document.getElementById("OutBox");

<<<<<<< Front-End-Main

=======
  var changeChosenNodeSize = function (values, id, selected, hovering) {
    values.size = values.size*2;
    values.borderWidth = values.borderWidth*2;
  };

  
>>>>>>> Front-End-Clustering

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
        borderWidth: nodeSize/2,
        color:{ border:'black',
                background:"white",
                highlight: {
                    border: 'black',
                    background: 'white'
                  },},
        font:{face:"tahoma",size:10,strokeWidth: 3,
        strokeColor: "#ffffff"},
        level:0,
        chosen:{label: false, node: changeChosenNodeSize},
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
<<<<<<< Front-End-Main
        width:nodeSize/8,
        arrows:{to:{enabled:true,scaleFactor:0.5}},
=======
        width:nodeSize/4,
        arrows:{to:{enabled:true,scaleFactor:0.25}},
        chosen:false
>>>>>>> Front-End-Clustering
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
    },
    interaction:{
        //hover:true,
    }
    //joinC
    
  };
var network = new vis.Network(container, data, options);
var canvas = network.canvas.frame.canvas;
/** @type {CanvasRenderingContext2D} */
var c = canvas.getContext('2d');


// finish of network creation



// START OF FUNCTIONS

//transforms style and properties of target node
function styleTarget(){
            nodes.update({id:targetNodeId,fixed:true});
            //setLevel(targetNodeId,0);
}
//turn previous target to regular node
// function revertFromTarget(prevId,prevLevel){
//     nodes.update({id:prevId,fixed:false});
//     setLevel(prevId,prevLevel); //TODO: Change from '1' to previous level.
// }
//assigns new target, styles it and reverts old target.
function setTarget(newTargetId){
    var newTarget = nodes.get(newTargetId);
    //nodes.update({id:newTargetId,target:true});
    //revertFromTarget(targetNodeId,targetRevertLevel);//revert old target node;
    targetNodeId= newTargetId;
    targetRevertLevel = newTarget.level;
    //styleTarget();
    makeParentsAndChildren(nodes.get(newTargetId));
}
//sets level of specific node
function setLevel(nodeId,Nlev){
    nodes.update({id:nodeId,level:Nlev});
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
    node.color = {background:"red"}
    nodes.update(node);
    makeParents(nodes.get(node.id));
}
function styleChild(edge,level){
    edges.update({id:edge.id});
    node = nodes.get(edge.from);
    node.color = {background:"green"}
    nodes.update(node);
    makeChildren(nodes.get(node.id));
}
//Perhaps make a default setting
function resetNodeStyles(nodes){
    nodes.forEach(node => {
        node.size = nodeSize;
        node.borderWidth = nodeSize/2;
        node.color = {background: 'white'} //pass a color object!
        nodes.update(node);
    });
}

function highlightEdges(edges){
    edges.forEach(edge => {
        highlightEdge(edge);
    });
}
function highlightEdge(edge){
    edge.width = 3
    edges.update(edge);
}
function lowlightEdges(edges){
    edges.forEach(edge => {
        lowlightEdge(edge);
    });
}
function lowlightEdge(edge){
    edge.width = 1
    edges.update(edge);
}
function highlightNode(node,sf,ratio){
    highlighted_size = nodeSize*sf;
    node.size = highlighted_size;
    node.borderWidth = highlighted_size*ratio
    nodes.update(node);
}
function lowlightNode(node){
    nodes.update({id:node.id,size:nodeSize});
}
function lowlightNodes(nodes){
    nodes.forEach(node => {
        lowlightNode(node);
    });
}

function FadeNode(node){
    node.color={background: 'white',border:"lightgrey"}
    nodes.update(node)
    nodes.forEach(node => {
        //console.log("opacity of "+node.label+" is: "+node.opacity);
    });
}
function UnfadeNode(node){
    //node.color = node.group.color
}


function FadeEdge(edge){
    edge.color = "lightgrey"
    edges.update(edge);
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


function ClusterByFacutly(clusterLabel,faculty){
    Cluster(clusterLabel,function (nodeOptions) {
        return nodeOptions.faculty == faculty;
      },{
        level:-3,
        label: clusterLabel,
        faculty: "ENGINEERING",
        size: 15,
        borderWidth:7.5,
    })
}

function ClusterBySchool(clusterLabel,school){
    Cluster(clusterLabel,function (nodeOptions) {
        return nodeOptions.school == school;
      },{
        level:-2,
        label: clusterLabel,
        faculty: "ENGINEERING",
        size: 15,
        borderWidth:7.5,
    })
}

function ClusterBySubject(clusterLabel,subject){
    Cluster(clusterLabel,function (nodeOptions) {
        return nodeOptions.subject == subject;
      },{
        level:-1,
        label: clusterLabel,
        school: "SCEEM",
        size: 15,
        borderWidth:7.5,
    })
}

function Cluster(clusterLabel,joinCondition,clusterNodeProperties){
    network.cluster({joinCondition: joinCondition,
        clusterNodeProperties:clusterNodeProperties,
      });
}
function fitGroup(group){
    fitOnCondition({filter:function(node){
            return node.group = group }})
}

function fitOnCondition(condition){
    nodes_to_fit = nodes.get( {filter: function (item) {
        return item.group == "Alg";
      }})
    console.log(nodes_to_fit);
    nodes_to_fit_IDs = []
    nodes_to_fit.forEach(node => {
        nodes_to_fit_IDs.push(node.id)
    });
    network.fit({nodes:nodes_to_fit_IDs});
}



/*var topicEdges = edges.get({
  filter: function (edge) {
    return (edge.label == 2);
  }
});*/



//EVENT FUNCTIONS. PLACE ANY FUNCTION WHICH RELIES ON USER INPUT

<<<<<<< Front-End-Main
network.on("beforeDrawing", function(ctx) {		
    c.fillStyle = 'rgba(0,0,0,0)'
    c.fillRect(0,0-(innerHeight/2),150,innerHeight);
    c.fillStyle = 'rgba(0,0,0,0.05)'
    c.fillRect(-150,0-(innerHeight/2),150,innerHeight);
    c.fillStyle = 'rgba(0,0,0,0.05)'
    c.fillRect(150,0-(innerHeight/2),150,innerHeight);
    c.fillStyle = 'rgba(0,0,0,0)'
    c.fillRect(-300,0-(innerHeight/2),150,innerHeight);
    c.fillStyle = 'rgba(0,0,0,0.05'
    c.fillRect(-450,0-(innerHeight/2),150,innerHeight);

    // c.beginPath();
    // c.moveTo(50,300);
    // c.lineTo(300,100);
    // c.lineTo(400,300);
    // c.strokeStyle = "#fa34a3";
    // c.stroke();
    // c.beginPath();
    // c.arc(0,0,30,0,Math.PI*2,false);
    // c.stroke();
});

network.on('doubleClick', function(params){
    network.fit(nodes);
    var node = nodes.get(params.nodes[0]);
  window.open(node.url, "_blank");
});
network.on('click', function(params){
    console.log(params);
    resetNodeStyles(nodes);
    //console.log(node);
    params.nodes.forEach(nodeId => {
        console.log(nodes.get(nodeId));
        lowlightEdges(edges);
        logConnections(nodes.get(nodeId));
        logLevel(nodes.get(nodeId));
        setTarget(nodeId);
    });
=======
network.on('doubleClick', function(params){
    if(network.isCluster(params.nodes[0])){
        clusterId = params.nodes[0]
        nodes_to_fit_IDs = network.getNodesInCluster(clusterId)
        network.openCluster(clusterId)
        network.fit({nodes:nodes_to_fit_IDs})
    }
    else{
        var node = nodes.get(params.nodes[0]);
        window.open(node.url, "_blank");
    }


});
network.on('click', function(params){
    console.log(params)
    if(network.isCluster(params.nodes[0])){

    }
    else{
        resetNodeStyles(nodes);
    
        //console.log(node);
        
        params.nodes.forEach(nodeId => {
            logLevel(nodeId);
            console.log(nodes.get(nodeId));
            lowlightEdges(edges);
            logConnections(nodes.get(nodeId));
            logLevel(nodes.get(nodeId));
            setTarget(nodeId);
        });
    }

>>>>>>> Front-End-Clustering
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
  network.on("zoom",function(params){
    outBox.value= params.scale;
  })

  fadeSelector.addEventListener("change", (e) => {
    const { value, checked } = e.target;
    if(checked){
        console.log("Fading Nodes");
        FadeAll(nodes);
    }
    else{
        console.log("Ready to Unfade");
    }
  })
fitButton.addEventListener("click",(e) =>{
    network.fit(nodes);
})
FitButtonWithCondition.addEventListener("click",(e) =>{
    fitGroup("Alg");
})



ClusterButton.addEventListener("click", (e) => {
        console.log("Clustering Nodes")
        ClusterBySubject("Computer Science","Computer Science")
        ClusterBySchool("SCEEM","SCEEM")
        ClusterByFacutly("ENGINEERING","ENGINEERING")
        network.fit(nodes);
})

UnClusterButton.addEventListener("click", (e) => {
    selNodes = network.getSelectedNodes();

        console.log("Ready to Uncluster");
        selNodes.forEach(cluster => {
            nodes_to_fit_IDs = network.getNodesInCluster(cluster)
            nodes_to_fit = nodes_to_fit_IDs.forEach(Id => {nodes.get(Id) });
            console.log(nodes_to_fit_IDs);
            network.openCluster(cluster);//Need to include release function
            network.fit(nodes_to_fit)
    })
    //network.fit(nodes);
})

//LOG FUNCTIONS. USED FOR DEBUGGING.
function logLevel(node){console.log("Level of this node: "+node.level);}

function logConnections(node){console.log(network.getConnectedEdges(node.id));}


function setLevelForAll(nodes,levels){
    nodes.forEach(node => {
        if(node.group!="IDENT"){
            console.log(node.id% levels);
            setLevel(node.id,(node.id % levels)-Math.floor(levels/2));
        }
    });
}

<<<<<<< Front-End-Main
function spaceNodesVertical(nodes_to_space,factor){
    nodes_to_space.forEach(node => {
        pos = network.getPosition(node.id);
        network.moveNode(node.id,pos.x,pos.y*factor);
    });
    
}

function TestOnNodes(nodes_to_test){
    nodes_to_test.forEach(node => {
        console.log(node.group);
    });
}
=======
ClusterBySubject("Computer Science","Computer Science")
ClusterBySchool("SCEEM","SCEEM")
ClusterByFacutly("ENGINEERING","ENGINEERING")
network.fit(nodes)
>>>>>>> Front-End-Clustering

spaceNodesVertical(nodes,1.5);
//TestOnNodes(nodes)
console.log(options.groups.Alg.color.border);
//console.log(options.groups);


//FadeAll(nodes);
<<<<<<< Front-End-Main
=======

//hello
>>>>>>> Front-End-Clustering
