
class Node {
  constructor(id,label = "NOLABEL",level=0,group = "NOGROUP",){
    this.id = id;
    this.label=label;
    this.group =group;
    this.level = level;
  }
}
//Must be a better way to give ID's than manually typing in
var nodesArray = [
  new Node(0,"Imperative and \nFunctional Programming",0,"Prog"),
  new Node(1,"Computer Architecture",0,"Hardware"),
  new Node(2,"Mathematics for Computer Science A",0,"Maths"),
  new Node(3,"Object-Orientated Programming\n and Algorithms 1",1,"Alg"),
  new Node(4,"Software Tools",1,"Prog"),
  new Node(5,"Mathematics for Computer Science B",1,"Maths"),
  new Node(6,"Software Engineering \nProject",2,"Prog"),
  new Node(7,"Programming Languages and \nComputation",2,"Maths"),
  new Node(8,"Computer Systems A",2,"Prog"),
  new Node(9,"Algorithms 2",2,"Alg"),
  new Node(10,"Interaction and Society",3),
  new Node(11,"Computer Systems B",3),
  new Node(12,"Data-Driven Computer Science",3),
];

var edgesArray = [
  [0,3],[0,4],[0,7],[1,4],[2,5],[2,7],[2,12],[3,6],[12,13],
]