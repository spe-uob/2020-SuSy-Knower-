
var nodes = new vis.DataSet([]);
var edges = new vis.DataSet([
    { from: 4, to: 1, id:"4-1"},
    { from: 2, to: 1, id:"2-1" },
    { from: 1, to: 5, id:"1-5" },
    { from: 5, to: 6, id:"5-6" },
    { from: 1, to: 7, id:"1-7" },
]); // sample edges as have yet to make edge creation function. Need to discuss how edges will be passed over from back end

function makeNode(node){
    nodes.update({id:node.id,label:node.label,group:node.group});
}
nodesArray.forEach(node => {
    makeNode(node);
});
console.log(nodes.max('id'));
console.log("node 0: "+nodes.get(0).label);

function makeEdgeFromLabels(fromLabel,toLabel){
    fromNodeArr =nodes.get({ filter: function (node) {return (node.label == fromLabel);} });// returns array
    console.log(fromNodeArr);
    toNodeArr =  nodes.get({ filter: function (node) {return (node.label == toLabel); }});//returns array
    console.log(toNodeArr);
    edges.add({from:fromNodeArr[0].id,to:toNodeArr[0].id,id:fromNodeArr[0].id+"-"+toNodeArr[0].id,})
}

makeEdgeFromLabels("Algorithms 1","Algorithms 2");
