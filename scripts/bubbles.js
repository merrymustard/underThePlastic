/*jshint esversion: 6 */

class Bubbles {
    constructor(x, y, dx, dy, radius) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.radius = radius;
      //method to draw anonymous function
    } //end constructor
    draw() {
      ctx.beginPath();
      ctx.fillStyle = 'rgba(181,204,230,0.6)';
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  
    update() {
      if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
        this.dx = -this.dx;
      }
      if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
        this.dy = -this.dy;
      }
      this.x += this.dx;
      this.y -= 1;
  
      this.draw();
    }
  } //end of class
  
  //After instanciating circles store then in an array
  var bubbleArray = [];
  
  for (var i = 0; i < 100; i++) {
    let radius = Math.random() * 9;
    let x = Math.random() * (innerWidth - radius * 2) + radius;
    let y = Math.random() * (innerHeight - radius * 2) + radius;
    let dx = (Math.random() - 0.5); //x velocity 
    let dy = 4;
    bubbleArray.push(new Bubbles(x, y, dx, dy, radius));
    //instanciate a circle creating an object variable
    // let circle = new Bubbles(200, 200, 3, 3, 30);
  }
  
  //create a loop to animate the bubbles
  function animateBubbles() {
    requestAnimationFrame(animateBubbles);
    // ctx.clearRect(0,0,innerWidth,innerHeight);
    //draw them on the screen
    for (let i = 0; i < bubbleArray.length; i++) {
      bubbleArray[i].update();
    }
  }
  animateBubbles();
  
  console.log(bubbleArray);