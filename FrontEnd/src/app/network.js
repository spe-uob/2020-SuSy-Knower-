
  var node_size=10;
  var target_node_id=1;
  var targetRevertLevel=0;
  var initLevelNumber=4;
  var hlsf = 2;
  var bdr_ratio =0.5;
  var should_draw = true;

  var focus_levels = ["UNIT","SUBJECT","SCHOOL","FACULTY"];
  var focus_level = "UNIT";

  var prev_cluster_zoom_level = 0;
  var cluster_factor = 1.5;
  var unit_zoom_level,subject_zoom_level,school_zoom_level,faculty_zoom_level =0;

  var clusterIds = [];
  var subjects = [];
  var schools = [];
  var faculties = [];

  const nodesView = new vis.DataView(nodes);
  const edgesView = new vis.DataView(edges);

  const fadeSelector = document.getElementById("FadeBox");
  const DrawBox = document.getElementById("DrawBox");
  const fitButton = document.getElementById("FitButton");
  const FitButtonWithCondition = document.getElementById("FitButtonWithCondition");
  const ClusterButton = document.getElementById("ClusterButton");
  const UnClusterButton = document.getElementById("UnClusterButton");
  const RedrawButton = document.getElementById("RedrawButton");
  const outBox = document.getElementById("OutBox");

  var changeChosenNodeSize = function (values, id, selected, hovering) {
    values.size = values.size*2;
    values.borderWidth = values.borderWidth*2;
  };

  

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
    interaction:{zoomSpeed:0.1},
    nodes:{shape: "dot", size:node_size,
        borderWidth: node_size/2,
        color:{ border:'black',background:"white",
                highlight: {border: 'black',background: 'white'},},
        font:{face:"tahoma",size:12,strokeWidth: 3,strokeColor: "#ffffff"},
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
        width:node_size/8,
        arrows:{to:{enabled:true,scaleFactor:0.5}},
    },
    physics:
    { enabled: false},
    layout:{
        hierarchical:{enabled:true,direction:"LR"}
    },
    
  };
var network = new vis.Network(container, data, options);
network.setOptions(options);
var canvas = network.canvas.frame.canvas;
/** @type {CanvasRenderingContext2D} */
var c = canvas.getContext('2d');


// finish of network creation



// START OF FUNCTIONS

//transforms style and properties of target node
function styleTarget(node){
    //highlightNode(node,hlsf,bdr_ratio);
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
    target_node_id= newTargetId;
    targetRevertLevel = newTarget.level;
    styleTarget(newTarget);
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
        node.size = node_size;
        node.borderWidth = node_size/2;
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
function lowlightEdges(){
    edges.forEach(edge => {
        lowlightEdge(edge);
    });
}
function lowlightEdge(edge){
    edge.width = node_size/8;
}
function highlightNode(node,sf,ratio){
    highlighted_size = node_size*sf;
    node.size = highlighted_size;
    node.borderWidth = highlighted_size*ratio
    nodes.update(node);
}
function lowlightNode(node){
    node.size = node_size;
    nodes.update(node);
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
        //FadeEdge(edge);
    });
}

const edgesFilter = (edge) => {
    return edgesFilterValues[edge.relation];
  };


function ClusterByFacutly(clusterLabel,faculty){
    Cluster(function (nodeOptions) {
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
    Cluster(function (nodeOptions) {
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
    Cluster(function (nodeOptions) {
        return nodeOptions.subject == subject;
      },{
        level:-1,
        label: clusterLabel,
        id:100,
        school: "SCEEM",
        size: node_size*cluster_factor,
        borderWidth:node_size*cluster_factor*bdr_ratio,
    })
    clusterIds.push()
}

function Cluster(joinCondition,clusterNodeProperties){
    network.cluster({joinCondition: joinCondition,
        clusterNodeProperties:clusterNodeProperties,
      });
    clusters.push();
}
function fitGroup(group){
    fitOnCondition({filter:function(node){
            return node.group = group }})
}

function fitOnCondition(condition){
    nodes_to_fit = nodes.get( {filter: function (item) {
        return item.subject == "Computer Science";
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

function DrawGreyRectangle1(ctx,Viewx,Viewy,width,height){
    var scale_factor = network.getScale();
    var view_port = network.getViewPosition();
    var x = Viewx-view_port.x
    var y = Viewy-view_port.y
    var adjWidth = width/scale_factor;
    var adjHeight = height/scale_factor;
    console.log(scale_factor);
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(x-width/2,y-(adjHeight/2),width,adjHeight);
}

function DrawGreyRectangle(ctx,x,y,width,height){
    ctx.fillStyle = 'rgba(0,0,0,0.1)'
    ctx.fillRect(x-width/2,y-(height/2),width,height);
}

var deficit = -245
var xi = 150
network.on("beforeDrawing", function(ctx) {	

    if(should_draw){
        c.clearRect(0,0,innerWidth,innerHeight);
        ctx.font = "bold italic 10px Arial";
        ctx.fillStyle = 'rgba(0,0,0,0.9)'
        ctx.fillText("Year 3 TB2",xi*2+5,deficit);
        ctx.fillText("Year 3 TB1",xi*1+5,deficit);
        ctx.fillText("Year 2 TB2",xi*0+5,deficit);
        ctx.fillText("Year 2 TB1",xi*-1+5,deficit);
        ctx.fillText("Year 1 TB2",xi*-2+5,deficit);
        ctx.fillText("Year 1 TB1",xi*-3+5,deficit);

        DrawGreyRectangle(ctx,75+3*xi,0,xi,innerHeight*2);
        DrawGreyRectangle(ctx,75+xi,0,xi,innerHeight*2);
        DrawGreyRectangle(ctx,75-xi,0,xi,innerHeight*2);
        DrawGreyRectangle(ctx,75-3*xi,0,xi,innerHeight*2);
        DrawGreyRectangle(ctx,75-5*xi,0,xi,innerHeight*2);
        

        ctx.fillStyle = 'rgba(255,0,0,0.9)'
    }
    
    //DrawGreyRectangle()

    // c.fillStyle = 'rgba(0,0,0,0.05)'
    // c.fillRect(-150,0-(innerHeight/2),150,innerHeight);
    // c.fillStyle = 'rgba(0,0,0,0.05)'
    // c.fillRect(150,0-(innerHeight/2),150,innerHeight);
    // c.fillStyle = 'rgba(0,0,0,0)'
    // c.fillRect(-300,0-(innerHeight/2),150,innerHeight);
    // c.fillStyle = 'rgba(0,0,0,0.05'
    // c.fillRect(-450,0-(innerHeight/2),150,innerHeight);

    //DrawGreyRectangle(ctx,0,0,150,innerHeight);

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
network.on("initRedraw", function(){
    c.beginPath();
    c.moveTo(50,300);
    c.lineTo(300,100);
    c.lineTo(400,300);
    c.strokeStyle = "#fa34a3";
    c.stroke();
    c.beginPath();
    c.arc(0,0,30,0,Math.PI*2,false);
    c.stroke();
})

network.on('doubleClick', function(params){
    if(params.nodes[0]){
        if(network.isCluster(params.nodes[0])){
            clusterId = params.nodes[0]
            nodes_to_fit_IDs = network.getNodesInCluster(clusterId)
            network.openCluster(clusterId)
            spaceNodesVertical(nodes,1.5);
            network.fit({nodes:nodes_to_fit_IDs})
        }
        else{
            console.log("NOT A CLUSTER")
            var node = nodes.get(params.nodes[0]);
            window.open(node.url, "_blank");
        }
    }


});

network.once("initRedraw", function () {
    console.log("SETTING ZOOM LEVELS");
    if (prev_cluster_zoom_level === 0) {
        var s = network.getScale();
        prev_cluster_zoom_level = s;
        faculty_zoom_level = s;
        school_zoom_level = s * cluster_factor;
        subject_zoom_level = s*cluster_factor**2;
        unit_zoom_level = s* cluster_factor**3;
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
            lowlightEdges();
            logConnections(nodes.get(nodeId));
            logLevel(nodes.get(nodeId));
            setTarget(nodeId);
        });
    }

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

network.on("zoom", function (params) {
    outBox.value= params.scale;
    if (params.direction == "-") {
        switch(focus_level){
            case "UNIT":
                console.log("UNIT LEVEL");
                if (params.scale < prev_cluster_zoom_level / cluster_factor) {
                    ClusterBySubject("Computer Science","Computer Science");
                    should_draw = false;
                    //prev_cluster_zoom_level = params.scale;
                    focus_level= "SUBJECT"
                  }
                  break;
            case "SUBJECT":
                console.log("SUBJECT LEVEL");
                if (params.scale < prev_cluster_zoom_level / cluster_factor**2) {
                    ClusterBySchool("SCEEM","SCEEM");
                    should_draw = false;
                    //prev_cluster_zoom_level = params.scale;
                    focus_level= "SCHOOL"
                }
                break;
            case "SCHOOL":
                console.log("SCHOOL LEVEL");
                break;
            case "FACULTY":
                console.log("FACULTY LEVEL");
                break;
        }

    } else {
        switch(focus_level){
            case "UNIT":
                console.log("UNIT LEVEL");
                break;
            case "SUBJECT":
                console.log("SUBJECT LEVEL");
                if (params.scale > prev_cluster_zoom_level) {
                        network.openCluster(100);//Need to include release function
                        spaceNodesVertical(nodes,1.5);
                        should_draw = true;
                    focus_level = "UNIT"
                    //prev_cluster_zoom_level = params.scale;
                  }
                break;
            case "SCHOOL":
                console.log("SCHOOL LEVEL");
                if (params.scale > prev_cluster_zoom_level**2) {
                    //network.openCluster(100);//Need to include release function
                    //spaceNodesVertical(nodes,1.5);
                focus_level = "SUBJECT"
                //prev_cluster_zoom_level = params.scale;
                }
                
                break;
            case "FACULTY":
                console.log("FACULTY LEVEL");
                break;
        }

    }
});
  

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
DrawBox.addEventListener("change", (e) => {
    const { value, checked } = e.target;
    if(checked){
        should_draw = true;
        console.log("HELLO");
        network.redraw();
    }
    else{
        should_draw = false;
        console.log("GOODBYE");
        network.redraw();
    }
  })
fitButton.addEventListener("click",(e) =>{
    network.fit(nodes);
})
FitButtonWithCondition.addEventListener("click",(e) =>{
    fitGroup("Alg");
})
RedrawButton.addEventListener("click",(e) =>{
    DrawGreyRectangle(c,0,0,150,500)
    network.redraw();
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
            console.log(nodes_to_fit_IDs);
            network.openCluster(cluster);//Need to include release function
            spaceNodesVertical(nodes,1.5);
            network.fit({nodes:nodes_to_fit_IDs});
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

function spaceNodesVertical(nodes_to_space,factor){
    nodes_to_space.forEach(node => {
        pos = network.getPosition(node.id);
        network.moveNode(node.id,pos.x,pos.y*factor);
    });
    
}

function TestOnNodes(nodes_to_test){
    nodes_to_test.forEach(node => {
        editLabel(node)
    });
}
function insert(str, index, value) {
    return str.substr(0, index) + value + str.substr(index);
}
function editLabel(node){
    var text = node.label;
    /*var counter = 0;
    for(var i =0; i<text.length; i++){
        if(text[i]=='\n'){
            counter = 0;
        }
        else if(counter == 15){
            n = text.substr(i-14,i).search(" ");
            text = insert(text,n+i,"\n");
        }
    }*/
    if(text.length>15){
        n = text.search(" ");
        text = insert(text,n,"\n");
    }
    node.label = text;
    nodes.update(node);
}
// ClusterBySubject("Computer Science","Computer Science")
// ClusterBySchool("SCEEM","SCEEM")
// ClusterByFacutly("ENGINEERING","ENGINEERING")


spaceNodesVertical(nodes,1.5);
network.fit(nodes)


TestOnNodes(nodes)
console.log(options.groups.Alg.color.border);
//console.log(options.groups);


//FadeAll(nodes);
