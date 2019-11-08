/*jshint esversion: 6 */

function crabAnimation() {
    if (frames % 7 === 0) {
      if (crab.animate === 3) {
        crab.animate = 0;
      } else {
        crab.animate++;
      }
    }
  }

  function sharkAnimation() {
    if (frames % 10 === 0) {
      if (shark.animate === 3) {
        shark.animate = 0;
      } else {
        shark.animate++;
      }
    }
  }

  function disposeElements(arr){
    for(let i=0; i < arr.length; i++){
      if(arr[i].x < -arr[i].width){
          arr.splice(i,1);
          i--; //corregit contador de la i
      } 
      if(arr[i].y > canvas.height){
        arr.splice(i,1);
        i--; //corregit contador de la i
    } 
  }
}


function checkColitions(collides, character) {
    collides.forEach((elem, i) => {
      if (character.isTouching(elem)) {
          collides.splice(i, 1);
          if (elem instanceof Trash) {
            console.log("menos vida-----");
            character.hp--;
          } else if(elem instanceof FishFood) {
            console.log("mas vida+++++");
            if(character.hp < 5){
              character.hp++;
            }
          }
      }
    });
  }

  function printLives(){
    for(let i = 0; i < crab.hp; i++){
      ctx.drawImage(lifeCrabby.img, lifeCrabby.x + heartSpace, lifeCrabby.y, lifeCrabby.width, lifeCrabby.height);
      heartSpace += 34;
    }
  }

  function printLivesShark(){
    for(let i = 0; i < shark.hp; i++){
      ctx.drawImage(lifeSharky.img, lifeSharky.x + heartSpace2, lifeSharky.y, lifeSharky.width, lifeSharky.height);
      heartSpace2 += 34;
    }
  }

  function moveBackground(character){
    if (character.x + character.width + 50 >= canvas.width){
      ocean.x -= 3;
    } else if (character.x <= 100) {
      ocean.x += 3;
    }
    if (ocean.x >= 0) ocean.x = 0;
    if (ocean.x <= -(ocean.width - canvas.width)) ocean.x = -(ocean.width - canvas.width);
  }


  function gameOver(hero) {
    if (hero.hp === 0) {
      clearInterval(interval)
      ctx.font = '200px Poppins';
      ctx.fillStyle = 'white';
      ctx.fillText('Game Over', canvas.width / 5 , canvas.height / 2 );
    }
  }

  const sound = new Audio('audio/SpongeBob.mp3');

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  ///////////////////////////////////
//START GAME FUNCTION
function startGame() {
    if (interval) return;
    interval = setInterval(update, 1000 / 60);
    sound.play();
  }// end function start game

    function update(){
        frames++;
        clearCanvas();
        //backgrouns
        ocean.draw();
        renderShape();
        //sharky
        sharkAnimation();
        shark.draw();
        shark.x += shark.vx;
        shark.y += shark.vy;

        //Crabby
        crabAnimation();
        crab.draw();
        crab.x += crab.vx;
        crab.y += crab.vy;
        crab.y += gravity;
        
        //pirate ship
        drawBoat();

        trash.draw();
        drawTrash();
        //fish food
        drawFish();
        iconShark.draw();
        iconCrab.draw();

        printLives();
        printLivesShark();
        heartSpace = 34;
        heartSpace2 = 34;

        moveBackground(shark);
        checkColitions(trashCan, shark);
        checkColitions(fishCan, shark);
        checkColitions(trashCan, crab);
        checkColitions(fishCan, crab);


        disposeElements(trashCan);
        disposeElements(fishCan);
        disposeElements(shipCan);


        gameOver(shark);
        gameOver(crab);
        //moving commands
        crab.moveLeft();
        crab.moveRight();
        crab.jump();
        shark.moveRight();
        shark.moveLeft();
        shark.moveUp();
        shark.moveDown();

      }



      document.body.addEventListener('keydown', (e) => {   
        keys[e.keyCode] = true;
      });

      document.body.addEventListener('keyup', (e) => {
        keys[e.keyCode] = false;
        crab.vx = 0;
        crab.position = 0;
        shark.vx = 0;
        shark.vy =0;
        shark.position = shark.position;
      });

     

    //   document.onkeydown = e => {
    //     switch (e.keyCode) {
    //       case 65:
    //         crab.moveLeft();
    //         return;
    //       case 83:
    //         crab.moveRight();
    //         if(crab.x + crab.width + 50 >= canvas.width){
    //             crab.vx = 0;
    //         }
    //         return;
    //       case 90:
    //         crab.jump();
    //         return;
    //       case 37:
    //         shark.moveLeft();
    //         return;
    //       case 39:
    //         shark.moveRight();
    //         if (shark.x + shark.width + 50 >= canvas.width){
    //             shark.vx = 0;
    //         }
            
    //         return;
    //       case 38:
    //         shark.moveUp();
    //         return;
    //       case 40:
    //         shark.moveDown();
    //         return;
    //     }
    //   };
      
    //   document.onkeyup = e => {
    //     crab.vx = 0;
    //     crab.position = 0;
    //     shark.vx = 0;
    //     shark.vy =0;
    //     shark.position = shark.position;
    //   };

    // //   document.onkeypress = e =>{
    // //     shark.vy += 0;
    // //   };



  
  
  
  
  
