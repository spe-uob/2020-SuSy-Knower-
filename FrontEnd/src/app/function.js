var strings = ['Algorithm', 'Security', 'Architecture','Mathematical Methods']
var keys = document.getElementById('myInput');
var button = document.getElementById('sb');

function searchfun() {
  console.log(keys.value)
  //change to filter for neatness and efficiency.
  var found = false;
  nodes.forEach(node => {
    if(node.label.toLowerCase().includes(keys.value.toLowerCase())){
      console.log("found!")
      console.log(node)
      found = true;
      highlightNode(node);
      //setTarget(node.id)
    }
  });
  if(found == false){
    console.log("not found!!")
    //document.write(keys.value+'<b> No Such Course Found </b>')
  }

}
button.addEventListener('click', searchfun)