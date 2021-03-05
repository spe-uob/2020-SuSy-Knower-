
class Node {
  constructor(id,label = "NOLABEL",group = "NOGROUP"){
    this.id = id;
    this.label=label;
    this.group =group;
  }
}
//Must be a better way to give ID's than manually typing in
var nodesArray = [
    new Node(0,"CELESTIAL","Alg"),
    new Node(1,"Algorithms 2","Alg"),
    new Node(2,"Mathematics for Computer Science","Maths"),
    new Node(3,"Algorithms 1","Alg"),
    new Node(4,"Imperative Programming","Prog"),
    new Node(5,"Advanced Algorithms","Alg"),
    new Node(6,"Computer Vision","Alg"),
    new Node(6,"Computational Neuroscience","Neuro"),
    new Node(7,"Human Computer interaction","Neuro"),
    new Node(8),
    new Node(9),
    new Node(10),
    new Node(11),
    new Node(12),
    new Node(13),
    //new Node(-1,"LEVEL 0 INDICATOR"),
    //new Node(-2,"LEVEL 1 INDICATOR"),
    //new Node(-3,"LEVEL -1 INDICATOR"),
];