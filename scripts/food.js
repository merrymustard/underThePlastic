/*jshint esversion: 6 */

class FishFood {
    constructor(y, type) {
      this.x = canvas.width;
      this.y = y;
      this.width = 80;
      this.height = 43;
      this.img = new Image();
      if (type == 1) {
        this.img.src = 'imgs/fish-13.png';
      } else if (type == 2) {
        this.img.src = 'imgs/fish-13.png';
      } else if (type == 3) {
        this.img.src = 'imgs/fish-13.png';
      }
    }
    draw() {
      this.x--;
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  }
  
  function generateFish() {
    if (frames % 80 === 0) {
      const randomPosition = Math.floor(Math.random() * canvas.height + 260) + 50;
      const randomType = Math.floor(Math.random() * 4);
      const fishess = new FishFood(randomPosition, randomType);
      fishCan.push(fishess);
      console.log(fishCan);
    }
  }
  
  function drawFish() {
    generateFish();
    fishCan.forEach(fish => {
      fish.draw();
    });
  }