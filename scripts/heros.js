/*jshint esversion: 6 */

class Shark {
    constructor() {
      this.width = 292.78;
      this.height = 149.2;
      this.y = 400; // canvas.height - this.height
      this.x = 800;
      this.vx = 0;
      this.vy = 0;
      this.animate = 0;
      this.position = 0;
      this.hp = 5;
      this.img = new Image();
      this.img.src = 'imgs/sharky-03.png';
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      //dont fall infinitly
      if (this.y > canvas.height - this.height) {
        this.y = canvas.height - this.height;
      }
      //dont hit the sky
      else if (this.y <= 300) {
        this.y = 300;
      } //left
      else if (this.x <= 0) {
        this.x = 0;
      }
      ctx.drawImage(
        this.img,
        (this.animate * 2635.13) / 9,
        (this.position * 298.32) / 2,
        2635.13 / 9,
        298.32 / 2,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    isTouching(trash) {
      return (
        this.x < trash.x + trash.width &&
        this.x + this.width > trash.x &&
        this.y < trash.y + trash.height &&
        this.y + this.height > trash.y
      );
    }
    moveLeft() {
      if (keys[37]) {
        this.vx -= 1;
        this.position = 1;
      }
    }
    moveRight() {
      if (keys[39]) {
        this.vx += 1;
        this.position = 0;
        if (shark.x + shark.width + 50 >= canvas.width) {
          shark.vx = 0;
        }
      }
    }
    moveUp() {
      if (keys[38]) {
        this.y -= -1;
        this.vy -= 1;
      }
    }
    moveDown() {
      if (keys[40]) {
        this.y += 1;
        this.vy += 1;
      }
  
    }
  } //end of shark class
  
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  
  class Crabby {
    constructor() {
      this.width = 211.5;
      this.height = 180;
      this.y = 500; 
      this.x = 500;
      this.vx = 0;
      this.vy = 0;
      this.hp = 5;
      this.animate = 0;
      this.position = 0;
      this.jumpStrenght = 18;
      //   this.hp = 3;
      this.img = new Image();
      this.img.src = 'imgs/crabby.png';
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      if (this.y > canvas.height - this.height) {
        this.y = canvas.height - this.height;
      }
  
      else {
        this.vy++;
      }
      ctx.drawImage(
        this.img,
        (this.animate * 1904) / 9,
        (this.position),
        1904 / 9,
        170,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }
    moveLeft() {
      if (this.x <= 0) {
        this.x = 0;
      } else if (keys[65]) {
        this.vx -= 1;
        this.position = 4;
      }
    }
    moveRight() {
      if (keys[83]) {
        this.vx += 1;
        this.position = 2;
        if (crab.x + crab.width + 50 >= canvas.width) {
          crab.vx = 0;
        }
      }
    }
    jump() {
      if (keys[90]) {
        this.vy = -this.jumpStrenght * 1.2;
      }
    }
    isTouching(trash) {
      return (
        this.x < trash.x + trash.width &&
        this.x + this.width > trash.x &&
        this.y < trash.y + trash.height &&
        this.y + this.height > trash.y
      );
    }
  } //end of crab class