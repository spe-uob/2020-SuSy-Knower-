var strings = ['Algorithm', 'Security', 'Architecture','Mathematical Methods']
var keys = document.getElementById('myInput');
var button = document.getElementById('sb');

function searchfun() {
  if(strings.includes(keys.value)){
    document.write(keys.value)
    document.write(' <b> Description </b>' +
      'This unit and its companion, COMS10013 “Mathematics for Computer Science B”, provide the mathematical foundations for the rest of the programme.' +
      '' +
      'It assumes an A* in A-level mathematics or equivalent knowledge as a prerequisite, which is part of our entry requirements.' +
      '' +
      'This unit introduces students to two main areas of mathematics:' +
      '' +
      'Discrete Mathematics, which is often called “the Mathematics of Computer Science”.' +
      'Probability Theory, the area of mathematics that deals with uncertainty and that is essential for scientific modelling. A particular application of this in computing is the field of Machine Learning.' +
      'Cutting across all these topics, students will be introduced to principles of mathematical reasoning, for example: creating a mathematical model of a problem, being precise and formal where necessary (and knowing when this is necessary), using abstraction to focus on the important aspects of a problem, dealing with uncertainty, employing mathematical methods of reasoning (for example, inductive and deductive arguments).' +
      '' +
      'Intended learning outcomes' +
      'After completing this unit, a student will be able to:' +
      '' +
      'Perform the calculations, algorithms and other techniques taught in the unit.' +
      'Recognise and apply mathematical precision and abstraction.' +
      'Select appropriate mathematical tools and methods of reasoning to create models and solve problems.' +
      'Recognise a correct mathematical proof.' +
      'Solve problems in the areas of logic, set theory, combinatorics, and probability theory.' +
      '' +
      'Teaching details' +
      'Teaching will be delivered through a combination of synchronous and asynchronous sessions, including lectures, practical activities supported by drop-in sessions, problem sheets and self-directed exercises.' +
      '' +
      '' +
      'Assessment Details' +
      '100% January Timed Assessment.' +
      '' +
      'In addition to the assessment, this unit has a “must pass” hurdle: students are required to attend and sign in to at least 75% of the workshop classes.' +
      '' +
      'Reading and References' +
      'This unit covers topics that are not found in this particular configuration in any one textbook, so the list below gives examples of books that cover different sections of the unit. Students are highly recommended to not buy any textbooks up front, and certainly not all of the books on the list – rather, they should use them as reference material as and when needed, and only to spend money on a book if it has repeatedly proved useful to them.' +
      '' +
      'Nissanke, Nimal, Introductory Logic and Sets for Computer Science (Addison Wesley, 1998) ISBN: 978-0201179576' +
      'James, Glyn et al, Modern Engineering Mathematics (Pearson, 2015) ISBN: 978-1292080826' +
      'Rosen, Kenneth, Discrete Mathematics and Applications (McGraw-Hill, 2019) ISBN: 978-1259676512' +
      'Lehman, Eric et al, Mathematics for Computer Science – free PDF available online from MIT. (Rather than buy copies from the library, this is the book for students who want a free PDF of something on their tablet.)')
  }
  else{
    document.write(keys.value+'<b> No Such Course Found </b>')
  }
}
button.addEventListener('click', searchfun)
