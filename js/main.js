var g_interacted = false;
var g_prevMouseOver = null;
function mouseOver(_who){
// resetMouseOverInterval(1000);
  if(window.g_interacted && window.g_prevMouseOver === _who)return;
  removeLines();
  window.g_prevMouseOver = _who;
  window.g_interacted = true;
  var bbox = $(_who)[0].getBoundingClientRect();
  console.log("lineOffset: ",$(_who).data("offset").x);
  const center = {
    x: Math.round(bbox.left + bbox.width / 2),
    y: Math.round(bbox.top  - bbox.height / 2)
  };
  console.table(center);
  // var moveTo = '"M' + center.x + ' ' + center.y;
  // console.log(moveTo);
  // var elem = '<path class="hadi" clip-rule="evenodd" fill="#69735e" fill-rule="evenodd" d=' + moveTo + ' L500 100 "' + ' stroke="red" stroke-width="3" fill="none" />';
  // console.log("elem", elem);
  var newLine = createLine(center.x,center.y,center.x+100,center.y-100,"#f00",3);
  // var newLine = createLine(246.846 , 79.963,center.x+100,center.y+200,"#f00",3);
  console.log(newLine);
  $(_who).after(newLine);
  startMouseInterval(5000);
  // var svg = container.select(".svg-container").selectAll('svg').data([0]);
  // setTimeout(removeLines,1000);
}
//this function calculates where to start drawing the disease name.
function getNextPosition(){

}
function createLine  (x1, y1, x2, y2, color, w) {
  var aLine = document.createElementNS('http://www.w3.org/2000/svg', 'line');
  aLine.setAttribute('x1', x1);
  aLine.setAttribute('y1', y1);
  aLine.setAttribute('x2', x2);
  aLine.setAttribute('y2', y2);
  aLine.setAttribute('stroke', color);
  aLine.setAttribute('stroke-width', w);
  aLine.setAttribute('class','diseaseLine show');
  return aLine;
}

// removes the lines and its children after timeout of mouseover
function removeLines(){
  $('.diseaseLine').each(function() {
    $(this).fadeOut(300, function(){ $(this).remove();});
  });
  removeInterval();
  window.g_interacted = false;
  window.g_prevMouseOver = null;
}

function resetMouseOverInterval(){
  removeInterval();
  startMouseInterval();
}
function removeInterval(){
  window.clearInterval(window.g_lineInterval);
  window.g_lineInterval = null;
}
function startMouseInterval(_delay=5000){
  console.log("initiatingInterval!");
  window.setInterval(removeLines,_delay);
}
