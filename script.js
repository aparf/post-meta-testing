
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
1
// Make the DIV element draggable:
dragElement(document.getElementById("mydiv"));


// window.onload = function() {
//   // find the element that you want to drag.
//   var box = document.getElementById('mydiv');
  
//   var delta = { x: 0, y: 0 }; // how much we've moved

//   box.addEventListener('touchstart', function(e) {
//     // record the initial touch point
//     var touch = e.targetTouches[0];
//     delta.x = touch.pageX - box.offsetLeft;
//     delta.y = touch.pageY - box.offsetTop;
//   });

//   box.addEventListener('touchmove', function(e) {
//     if (e.targetTouches.length === 1) { 
//       // grab the location of touch
//       var touchLocation = e.targetTouches[0];
      
//       // assign box new coordinates based on the touch.
//       box.style.left = touchLocation.pageX - delta.x + 'px';
//       box.style.top = touchLocation.pageY - delta.y + 'px';

//       // prevent page scrolling
//       e.preventDefault();
//     }
//   });

//   /* record the position of the touch
//   when released using touchend event.
//   This will be the drop position. */
  
//   box.addEventListener('touchend', function(e) {
//     // current box position.
//     var x = parseInt(box.style.left);
//     var y = parseInt(box.style.top);
//   });
// }


alert("VERSION 23")





var mydiv = document.getElementById('mydiv');
mydiv.style.transformOrigin = 'center center';

var initialPos = { left: mydiv.offsetLeft, top: mydiv.offsetTop };
console.log(initialPos)





var mydiv = document.getElementById('mydiv');
var initScale = 1; // You should initialize the scale to 1, which stands for 100% (the original size)


console.log(mydiv.style.left)

new AlloyFinger(mydiv, {
    multipointStart: function () {
        // Fetch the current scale of the div if it's already been scaled
        // var style = window.getComputedStyle(mydiv);

        initScale = parseFloat(window.getComputedStyle(document.getElementById("mydiv")).transform.match(/^matrix\(([^,]*)/)[1]); 


    },

    pinch: function (evt) {
        // Scale the div
        // var initScale = parseFloat(window.getComputedStyle(document.getElementById("mydiv")).transform.match(/^matrix\(([^,]*)/)[1]); 
        var scale = initScale;

        if(evt.zoom >= 1){
          scale += 0.25
      
        } else{
          scale -= 0.25
  
        }

       mydiv.style.transform = 'scale(' + scale + ')';

    },


    // pressMove: function(evt){
    //   console.log(mydiv.style.left)
    //   if (!(mydiv.style.left)){
    //     var x = evt.deltaX;
    //     var y = evt.deltaY;
    //   } else {
    //     var x = parseInt(mydiv.style.left) + evt.deltaX;
    //     var y = parseInt(mydiv.style.top) + evt.deltaY;
    //   }
      
    //   mydiv.style.left = x + 'px';
    //   mydiv.style.top = y + 'px';
    // }


    pressMove: function(evt){
      var rect = mydiv.getBoundingClientRect();
      
      // If left and top are not set, use the initial position of the div
      var x = (mydiv.style.left) ? parseInt(mydiv.style.left) + evt.deltaX : rect.left + evt.deltaX;
      var y = (mydiv.style.top) ? parseInt(mydiv.style.top) + evt.deltaY : rect.top + evt.deltaY;
      
      mydiv.style.left = x + 'px';
      mydiv.style.top = y + 'px';
      mydiv.style.position = 'absolute';  // you also need to set the position to absolute to make left and top work
    }


});












// new AlloyFinger(mydiv, {
//     multipointStart: function () {
//         // save initial size and position
//         this.initialWidth = mydiv.offsetWidth;
//         this.initialHeight = mydiv.offsetHeight;
//     },

//     pinch: function (evt) {

//         // scale the div
//         var scale = evt.zoom;

//         // let scale = parseFloat(window.getComputedStyle(document.getElementById("mydiv")).transform.match(/^matrix\(([^,]*)/)[1]); 
//         // scale += 0.1;
//         mydiv.style.width = this.initialWidth * scale  + 'px';
//         mydiv.style.height = this.initialHeight * scale + 'px';
//         // adjust position to scale from the center
//         mydiv.style.left = (initialPos.left - (mydiv.offsetWidth - this.initialWidth) / 2) + 'px';
//         mydiv.style.top = (initialPos.top - (mydiv.offsetHeight - this.initialHeight) / 2) + 'px';
//     }
// });


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


var button = document.getElementById("button"); 

button.addEventListener("click", () => {
  alert("CLICK")
})