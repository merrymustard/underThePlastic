/*jshint esversion: 6 */

class Pirate {
    constructor() {
      this.width = 274;
      this.height = 240;
      this.x = 0;
      this.y = 24;
      this.img = new Image(); // this.hp = 3;
      this.img.src = './imgs/pirateship-07.png';
      this.img.onload = () => {
        this.draw();
      };
    }
    draw() {
      this.x++;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
    navigate() {
      this.x += 20;
    }
  }
  
  function generateBoat() {
    if (frames == 5 || frames % 1000 === 0) {
      const shipsis = new Pirate();
      shipCan.push(shipsis);
    }
  }
  
  function drawBoat() {
    generateBoat();
  
    shipCan.forEach(shipsis => {
      shipsis.draw();
    });
  }
  
  //TRASHHHHHHHHHHHHHHHHHHHH
  //TRASHHHHHHHHHHHHHHHHHHHH
  class Trash {
    constructor(x, y, type) {
      this.x = x;
      this.y = y;
      this.width = 80;
      this.height = 47;
      this.img = new Image();
      if (type == 0) {
        this.img.src = 'imgs/trash-01.png';
      } else if (type == 1) {
        this.img.src = 'imgs/trash-02.png';
      } else if (type == 2) {
        this.img.src = 'imgs/trash-03.png';
      }
  
      //this.img.src = 'imgs/trash-01.png';
    }
    draw() {
      this.y++;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
  
  function generateTrash() {
    if (frames % 100 === 0) {
      shipCan.forEach(eachShip => {
        trashCan.push(new Trash(eachShip.x, eachShip.y + eachShip.height, Math.floor(Math.random() * 3)));
      })
    }
  }
  
  function drawTrash() {
    generateTrash();
    trashCan.forEach(trash => {
      trash.draw();
    });
  }