var strings = ['Algorithm', 'Security', 'Architecture','Mathematical Methods']
var keys = document.getElementById('myInput');
var button = document.getElementById('sb');

function searchfun() {
  if(strings.includes(keys.value)){
    document.write(keys.value)
    document.write('hello')
  }
  else{
    document.write(keys.value+'<b> No Such Course Found </b>')
  }
}
button.addEventListener('click', searchfun)