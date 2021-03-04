
var nodes = new vis.DataSet([
  { id: 0, label: "BUMBACLART"},
  { id: 1, label: "Algorithms 2",group:"Alg"},
  { id: 2, label: "Mathematics for Computer Science",group:"Maths"},
  { id: 3, label: "Algorithms 1",group:"Alg"},
  { id: 4, label: "Imperative Programming",group:"Prog"},
  { id: 5, label: "Advanced Algorithms",group:"Alg"},
  { id: 6, label: "Computer Vision",group:"Alg"},
  { id:7, label:"Computational Neuroscience",group:"Neuro"},
  { id:8, label:"Human Computer interaction",group:"Neuro"},
  { id:-1, label:"LEVEL 0 INDICATOR",level:0,group:"IDENT"},
  { id:-2, label:"LEVEL 1 INDICATOR",level:1,group:"IDENT"},
  { id:-3, label:"LEVEL -1 INDICATOR",level:-1,group:"IDENT"},
]);


// create an array with edges
var edges = new vis.DataSet([
  { from: 4, to: 1, id:"4-1"},
  { from: 3, to: 1, id:"3-1" },
  { from: 2, to: 1, id:"2-1" },
  { from: 1, to: 5, id:"1-5" },
  { from: 5, to: 6, id:"6-1" },
  { from: 1, to: 7, id:"1-7" },
]);

