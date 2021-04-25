
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([
    /*{ from: 0, to: 3, id:"0-3"},
    { from: 0, to: 4, id:"0-4" },
    { from: 0, to: 7, id:"0-7" },
    { from: 1, to: 4, id:"1-4" },
    { from: 2, to: 5, id:"2-5" },
    { from: 2, to: 7, id:"2-7" },
    { from: 2, to: 12, id:"2-12" },
    { from: 3, to: 6, id:"3-6" },
    { from: 4, to: 8, id:"4-8" },
    { from: 4, to: 11, id:"4-11" },
    { from: 5, to: 6, id:"5-6" },
    { from: 5, to: 8, id:"5-8" },
    { from: 5, to: 9, id:"5-9" },
    { from: 5, to: 10, id:"5-10" },*/
    //{ from: 8, to: 9, id:"8-9", url:"http://projects.flowingdata.com/tut/interactive_network_demo/" },
]); // sample edges as have yet to make edge creation function. Need to discuss how edges will be passed over from back end

function makeNode(node){
    nodes.update({id:node.id,subject:node.subject,school:node.school,faculty:node.faculty,label:node.label,level:node.level,group:node.group,url:node.url});
}
function makeEdgeFromLabels(fromLabel,toLabel){
    fromNodeArr =nodes.get({ filter: function (node) {return (node.label == fromLabel);} });// returns array
    console.log(fromNodeArr);
    toNodeArr =  nodes.get({ filter: function (node) {return (node.label == toLabel); }});//returns array
    console.log(toNodeArr);
    edges.add({from:fromNodeArr[0].id,to:toNodeArr[0].id,id:fromNodeArr[0].id+"-"+toNodeArr[0].id,})
}
function makeEdgeFromIds(fromId,toId){
    //given 2 Ids make edge and appropriate label
    edges.add({from:fromId,to:toId,id:fromId+"-"+toId});
}
function makeEdgeFromIdsArray(edgeArr){
    console.log("MAKING EDGES")
    edgeArr.forEach(edge => {
        makeEdgeFromIds(edge[0],edge[1]);
    });
}



nodesArray.forEach(node => {
    makeNode(node);
});
makeEdgeFromIdsArray(edgesArray);
