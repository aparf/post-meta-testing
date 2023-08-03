


// Get the center and left elements
const centerEl = document.getElementById("center");
const leftEl = document.getElementById("left");

// const rootElement = document.getElementById("mobileVersion")
// const viewPortH = rootElement.getBoundingClientRect().height;
// const windowH = window.innerHeight;

// const browserUiBarsH = viewPortH - windowH;
// rootElement.style.height = `calc(100vh - ${browserUiBarsH}px)`;
// document.getElementById("left").style.height = `calc(100vh - ${browserUiBarsH}px)`;
// document.getElementById("right").style.height = `calc(100vh - ${browserUiBarsH}px)`;

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


alert("VERSION 3")
var hammer = new Hammer(document.getElementById('mydiv'));
console.log(hammer)

hammer.on('tap', function(e) {
  alert('hello!');
  document.getElementById('mydiv').style.background = "blue";
});

hammer.on('pinchin', function(e) {
  alert('hello!');
  document.getElementById('mydiv').style.background = "blue";
});



function hammerIt(elm) {
    hammertime = new Hammer(elm, {});
    hammertime.get('pinch').set({
        enable: true
    });
    var posX = 0,
        posY = 0,
        scale = 1,
        last_scale = 1,
        last_posX = 0,
        last_posY = 0,
        max_pos_x = 0,
        max_pos_y = 0,
        transform = "",
        el = elm;

    hammertime.on('doubletap pan pinch panend pinchend', function(ev) {
        if (ev.type == "doubletap") {
            transform =
                "translate3d(0, 0, 0) " +
                "scale3d(2, 2, 1) ";
            scale = 2;
            last_scale = 2;
            try {
                if (window.getComputedStyle(el, null).getPropertyValue('-webkit-transform').toString() != "matrix(1, 0, 0, 1, 0, 0)") {
                    transform =
                        "translate3d(0, 0, 0) " +
                        "scale3d(1, 1, 1) ";
                    scale = 1;
                    last_scale = 1;
                }
            } catch (err) {}
            el.style.webkitTransform = transform;
            transform = "";
        }

        //pan    
        if (scale != 1) {
            posX = last_posX + ev.deltaX;
            posY = last_posY + ev.deltaY;
            max_pos_x = Math.ceil((scale - 1) * el.clientWidth / 2);
            max_pos_y = Math.ceil((scale - 1) * el.clientHeight / 2);
            if (posX > max_pos_x) {
                posX = max_pos_x;
            }
            if (posX < -max_pos_x) {
                posX = -max_pos_x;
            }
            if (posY > max_pos_y) {
                posY = max_pos_y;
            }
            if (posY < -max_pos_y) {
                posY = -max_pos_y;
            }
        }


        //pinch
        if (ev.type == "pinch") {
            scale = Math.max(.999, Math.min(last_scale * (ev.scale), 4));
        }
        if(ev.type == "pinchend"){last_scale = scale;}

        //panend
        if(ev.type == "panend"){
            last_posX = posX < max_pos_x ? posX : max_pos_x;
            last_posY = posY < max_pos_y ? posY : max_pos_y;
        }

        if (scale != 1) {
            transform =
                "translate3d(" + posX + "px," + posY + "px, 0) " +
                "scale3d(" + scale + ", " + scale + ", 1)";
        }

        if (transform) {
            el.style.webkitTransform = transform;
        }
    });
}

hammerIt(document.getElementById('mydiv'))


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