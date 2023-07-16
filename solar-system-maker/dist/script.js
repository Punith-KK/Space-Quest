/**
 * Create the animation request.
 */
if (!window.requestAnimationFrame) {
	window.requestAnimationFrame = (function() {
    return window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (callback, element) {
      // 60 FPS
      window.setTimeout(callback, 1000 / 60);
    };
	})();
}

/**
 * Add event listeners to reactive to input.
 */
window.addEventListener("resize", prepareCanvas);
window.addEventListener("mousedown", msdn);
window.addEventListener("touchstart", msdn);
window.addEventListener("mousemove", msmv);

/**
 * Create the ball object.
 */
function Ball(sun) {
  this.sun = sun;
  this.ring = randomNumber(1, 5);
  this.color = randomColor();
  this.radius = randomNumber(1, 5);
  this.angle = 0;
  this.translate = translate;

  if (this.ring == 5) {
    this.radius *= 2;
    this.translate += this.radius;
    translate += (this.radius);
  }
  
  if (sun) {
    this.translate = 0;
  }
  
  // Set the position of the rotating object.
  var negativeX = randomNumber(1, 2) == 1 ? 1 : -1;
  var negativeY = randomNumber(1, 2) == 1 ? 1 : -1;
  var posX = randomNumber(1, this.translate);
  var posY = Math.abs(posX - this.translate);
  var radians = Math.atan(posY/posX);
  this.newX = (this.translate * Math.cos(radians)) * negativeX;
  this.newY = (this.translate * Math.sin(radians)) * negativeY;
}

/**
 * Declare Ball member functions.
 */
Ball.prototype = {
  draw: function() {
    ctx.beginPath();
    if (this.sun) {
      ctx.fillStyle = "#ff0";   
      ctx.arc(0, 0, 20, 0, 2 * Math.PI);
      ctx.shadowColor = "#f90";
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    }
    else {
      if (this.ring == 5) {
        ctx.fill();
        ctx.beginPath();
        ctx.arc(0, 0, this.radius + 4, 0, 2 * Math.PI);
        ctx.strokeStyle = this.color;
        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
      }
      ctx.fillStyle = this.color;   
      ctx.arc(0, 0, this.radius, 0, 2 * Math.PI);
    }

    ctx.closePath();
    ctx.fill();
  },
  update: function() {
    // Rotate the ball around the mouse.
    ctx.save();

    // Set the rotation origin.
    ctx.translate(width/2, height/2);

    // Create an orbit path.
    ctx.beginPath();
    ctx.arc(0, 0, this.translate, 0, 2 * Math.PI);
    ctx.strokeStyle = "#333";
    ctx.stroke();
    ctx.closePath();
    
    // Rotate the canvas.
    ctx.rotate(40 * (this.angle / this.translate) / 100);
    
    // Set the position of the planet.
    ctx.translate(this.newX, this.newY);

    this.draw();

    ctx.restore();
    this.angle += 5;
  },
};

/**
 * Create the star object.
 */
var Star = function() {
  this.x = randomNumber(1, width);
  this.y = randomNumber(1, height);
  this.radius = 1;
  this.color = starColor();
}

/**
 * Declare Ball member functions.
 */
Star.prototype = {
  draw: function() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    ctx.shadowColor = '#fff';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  },
};

/**
 * Set initial variables.
 */
var width = window.innerWidth,
    height = window.innerHeight,
    cnv = document.getElementById("canvas"),
    ctx = cnv.getContext("2d"),
    balls = [],
    stars = [],
    mX = 0,
    mY = 0,
    translate = 0,
    count = 500;

// Generate stars.
for (var i = 0; i < count; i++) {
  stars.push(new Star());
}

/**
 * Prepare the canvas for drawing.
 */
function prepareCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  cnv.width = width;
  cnv.height = height;
}

/**
 * Animate the canvas so we can see movement.
 */
function animate() {
  draw();

  requestAnimationFrame(animate);
}

/**
 * Draw the objects to the screen.
 */
function draw() {
  clearCanvas();
  for (var x = 0, star; star = stars[x]; x++) {
    star.draw();
  }  
  for (var x = 0, ball; ball = balls[x]; x++) {
    ball.update();
  }
}

/**
 * Clear the canvas.
 */
function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

/**
 * Called when a click or touch occurs.
 */
function msdn(e) {  
  // Create a ball.
  if (translate == 0) {;
    var ball = new Ball(true);
    translate = 60;
  } else {
    var ball = new Ball(false);
    translate += ball.radius * 4;
  }
  balls.push(ball);
}

/**
 * Track mouse movements.
 */
function msmv(e) {
  // Set global variables to mouse positions.
  mX = e.x;
  mY = e.y;
}

/**
 * Generate a random number.
 *
 * @param int start
 *   The minimum number to start at.
 * @param int end
 *   The maximum number that can be generated.
 */
function randomNumber(start, end) {
  return Math.floor((Math.random() * end) + start);
}

function starColor() {
  var starColor = {
    1: "#ccc",
    2: "#fbb",
    3: "#bbf",
  };
  return starColor[randomNumber(1, 3)];
}

/**
 * Generate a random color in hex.
 */
function randomColor() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

/**
 * Reset canvas if button is clicked.
 */
var button = document.getElementById("button");
var oldMousedown = button.onmousedown;
button.onmousedown = function () {
  balls = [];
  translate = 0;
  clearCanvas();
};

/**
 * Draw the canvas and animate it.
 */
prepareCanvas();
animate();