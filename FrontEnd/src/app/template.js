
class Node {
  constructor(id, label = "NOLABEL",level=0,group = "NOGROUP",subject = "Computer Science",school = "SCEEM",faculty = "ENGINEERING",url="https://www.bristol.ac.uk/study/undergraduate/2022/computer-science/meng-comp-sci/"){
    this.id = id;
    this.faculty = faculty
    this.school = school;
    this.subject = subject;
    this.label=label;
    this.url = url;
    this.level = level;
    this.group =group;
  }
}
//Must be a better way to give ID's than manually typing in
var nodesArray = [
  new Node(-2,"Chemical Engineering",-1,undefined,"Chemical Engineering"),
  new Node(-3,"Mechanical Engineering",-1,undefined,"Mechanical Engineering"),
  new Node(-4,"Electrical Engineering",-1,undefined,"Electrical Engineering"),

  new Node(-6,"SAME",-2,undefined,"SAME","SAME"),

  new Node(-7,"ARTS",-3,undefined,"ARTS","ARTS","ARTS"),
  new Node(-8,"SCIENCES",-3,undefined,"ART","ART","ART"),
  new Node(-9,"HEALTH SCIENCES",-3,undefined,"ART","ART","ART"),

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
  new Node(13,"Advanced Algorithms",4,"Alg"),
  new Node(14,"Artificial Inteligence",4),
  new Node(15,"Computational Neuroscience",4),
  new Node(16,"Computer Graphics",4),
  new Node(17,"Advanced Computer Architecture",5),
  
];

var edgesArray = [
  [0,3],[0,15],[0,4],[0,7],[1,4],[2,5],[2,7],[2,12],[3,6],[3,9],[3,14],[4,8],[4,11],[5,6],[5,8],[5,9],
  [5,10],[5,14],[7,11],[8,11],[9,16],[9,17],[9,13],[11,17],[12,14],

]
/*nodesArray.forEach(node => {
  if(node.id != -1){
    edgesArray.push([-1,node.id]);
  }
});*/

console.log(edgesArray);