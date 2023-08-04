
//check whether mobile browser is used 
if (window.navigator.maxTouchPoints > 0) {
  alert("MOBILE DEVICE")
        var meta = document.createElement('meta');
        meta.name = "viewport";
        meta.content = "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no";
        document.getElementsByTagName('head')[0].appendChild(meta);
      }

// Get the center and left elements
const centerEl = document.getElementById("center");
const leftEl = document.getElementById("left");


// adjust the height based
const rootElement = document.getElementById("container");
const viewPortH = rootElement.getBoundingClientRect().height;
const windowH = window.innerHeight;

const browserUiBarsH = viewPortH - windowH;
rootElement.style.height = `calc(100vh - ${browserUiBarsH}px)`;
document.getElementById("container").style.height = `calc(100vh - ${browserUiBarsH}px)`;





// Function to calculate the width
function calculateVerticalWidth() {
  const desktopWidth = document.getElementById("afterWindow").getBoundingClientRect().width;
  const mobileWidth = document.getElementById("mobileVersion").getBoundingClientRect().width;
  let constWidth = 0
  if (mobileWidth == 0){
    centerWidth = desktopWidth
  } else {
    centerWidth = mobileWidth
  }

  let width = ((window.innerWidth - centerWidth) / 2);
  document.getElementById("left").style.width = width + "px";
  document.getElementById("right").style.width = width + "px";
}

// Call the function initially 
calculateVerticalWidth();

// Add resize listener to recalculate on resize
window.addEventListener("resize", calculateVerticalWidth);



function dragElement(elmnt) {
  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null; 
  }

  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;
}

// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));


window.onload = function() {
  // find the element that you want to drag.
  var box = document.getElementById('mydiv');
  
  var delta = { x: 0, y: 0 }; // how much we've moved

  box.addEventListener('touchstart', function(e) {
    // record the initial touch point
    var touch = e.targetTouches[0];
    delta.x = touch.pageX - box.offsetLeft;
    delta.y = touch.pageY - box.offsetTop;
  });

  box.addEventListener('touchmove', function(e) {
    // grab the location of touch
    var touchLocation = e.targetTouches[0];
    
    // assign box new coordinates based on the touch.
    box.style.left = touchLocation.pageX - delta.x + 'px';
    box.style.top = touchLocation.pageY - delta.y + 'px';

    // prevent page scrolling
    e.preventDefault();
  });

  /* record the position of the touch
  when released using touchend event.
  This will be the drop position. */
  
  box.addEventListener('touchend', function(e) {
    // current box position.
    var x = parseInt(box.style.left);
    var y = parseInt(box.style.top);
  });
}


alert("VERSION 13")





var mydiv = document.getElementById('mydiv');
var initialPos = { left: mydiv.offsetLeft, top: mydiv.offsetTop };

new AlloyFinger(mydiv, {
    multipointStart: function () {
        // save initial size and position
        this.initialWidth = mydiv.offsetWidth;
        this.initialHeight = mydiv.offsetHeight;
    },

    pinch: function (evt) {
        // scale the div
        var scale = evt.zoom;
        // mydiv.style.width = this.initialWidth * scale * 0.25 + 'px';
        // mydiv.style.height = this.initialHeight * scale * 0.25 + 'px';
        // // adjust position to scale from the center
        // mydiv.style.left = (initialPos.left - (mydiv.offsetWidth - this.initialWidth) / 2) + 'px';
        // mydiv.style.top = (initialPos.top - (mydiv.offsetHeight - this.initialHeight) / 2) + 'px';

        mydiv.style.transform = "scale(" + scale + ")";
    }
});


document.addEventListener("keydown", function(event) {
  event.preventDefault()

  if ((event.metaKey && event.keyCode == 186) || (event.metaKey && event.shiftKey && event.keyCode == 187)) {
    let scale = parseFloat(window.getComputedStyle(document.getElementById("mydiv")).transform.match(/^matrix\(([^,]*)/)[1]); 
    scale += 0.1;

    document.getElementById("mydiv").style.transform = "scale(" + scale + ")";
  } 

  if (event.metaKey && event.keyCode == 189) {
    let scale = parseFloat(window.getComputedStyle(document.getElementById("mydiv")).transform.match(/^matrix\(([^,]*)/)[1]); 
    scale -= 0.1;

    document.getElementById("mydiv").style.transform = "scale(" + scale + ")";
  } 

})