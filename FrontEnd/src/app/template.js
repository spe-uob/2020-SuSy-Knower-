
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
    new Node(8,"Intro to Philosophy A"),
    new Node(9,"Intro to Philosophy B"),
    new Node(10,"Intro to Formal Logic"),
    new Node(11,"Logic and Critical Thinking"),
    new Node(12,"Knowledge and Reality"),
    new Node(13,"Readings in Value Theory"),
    new Node(-1,"LEVEL 0 INDICATOR"),
    //new Node(-2,"LEVEL 1 INDICATOR"),
    //new Node(-3,"LEVEL -1 INDICATOR"),
];

var edgesArray = [
  [8,9],[9,10],[11,12],[12,13]
]