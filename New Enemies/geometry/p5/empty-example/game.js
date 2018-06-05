var level = 0;
var enemies = [], playerBullets = [];
var enemiesFired=true;
var play = false;
var started = false;
var boolShoot =0;
var playerHealth = 3;



function setup(){
    createCanvas(500, 500);
    background(0)
    let g = new Game;
    player = new Player(3, 0, 3, 20, 20);
    for(let c = 0; c<10; c++){
      spawnEnemy();
    }

    noLoop();
    clear();
}

function draw(){

    if(play==false){
        background(0);
        stroke(165, 27, 183);
        fill(165, 27, 183);
        if(collidePointRect(mouseX, mouseY, 100, 100, 300, 200)){
          stroke(80, 43, 242);
          fill(80, 43, 242);
          console.log("collided");
        }
        rect(100, 200, 300, 30);
        fill(238, 242, 29);
        textSize(15);
        text('Press spacebar to play', 175, 220);
      }


    if(play==true){
    background(0);
    player.update();
    handleEnemies();
    player.show();
    showBullets();
    handleUi(player.health);

    if(frameCount%2500==0){
      clear();
    }

    if(player.x>500||player.y>500){
      loseGame();
    }

    /*if(enemies.length==0){
      endGame();
    }*/



    if(frameCount%10==0||frameCount%20==0){
        for(let c = 0; c<enemies.length; c++){
          boolShoot = Math.floor(Math.random()*2)+1;
          if(boolShoot>1){
            if(enemies[c].atTargetY)
              enemies[c].shoot();
          }
        }
    }

    if(enemies.length==0&&level==0){      //spawns enemies for level 1
      level++;
      for(let c = 0; c<10; c++){
        spawnEnemy();
      }

      for(let c = 0; c<5; c++){
        spawnAdvancedEnemy()
      }
    }

    if(enemies.length==0&&level==1){  //spawns enemies for level 2
      level++;
      for(let c = 0; c<6; c++){
        spawnAdvancedEnemy()
      }
      for(let c = 0; c<6; c++){
        spawnEnemy();
      }
    }

    if(enemies.length==0&&level==2){  //spawns enemies for level 3
      level++;
      for(let c = 0; c<15; c++){
        spawnEnemy();
      }
      for(let c = 0; c<6; c++){
        spawnAdvancedEnemy()
      }
    }

    if(enemies.length==0&&level==3){ //spawns enemies for level 4
      level++;
      for(let c = 0; c<80; c++){
        spawnEnemy();
      }
    }

    if(enemies.length==0&&level==3){
        endGame();
      }

    }
}
function showBullets(){                                 //this only shows player bullets, enemy bullet display is handled in enemy.update()
  if(player.bullets){
    for(let c = 0; c<player.bullets.length; c++){
      strokeWeight(4);
      stroke(188, 69, 69);
      line(player.bullets[c].x, player.bullets[c].y, player.bullets[c].x, player.bullets[c].y-10);
      stroke(255);
      fill(255);
    }
  }
}

function spawnEnemy(){
  enemies.push(new Enemy(3, Math.floor(Math.random()*400)+10, Math.floor(Math.random()*100)+200, 20, 20));
}

function spawnAdvancedEnemy(){
  enemies.push(new AdvancedEnemy(3, Math.floor(Math.random()*400)+10, Math.floor(Math.random()*100)+10, 20, 20));
}

function handleEnemies(){

    for(let c = 0; c<enemies.length; c++){
      enemies[c].enter();
    }

    for(let c = 0; c<enemies.length; c++){
      enemies[c].update();
    }


    for(let c = 0; c<enemies.length; c++){
      for(let b = 0; b<enemies[c].bullets.length; b++){
          enemies[c].bullets[b].update();
      }
    }
    for(let c = 0; c<enemies.length; c++){            //deletes bullet from array once it hits enemy
      for(let b = 0; b<player.bullets.length; b++){
      if(enemies[c]){
          if(collidePointPoly(player.bullets[b].x, player.bullets[b].y, enemies[c].hitBox)){
              console.log(player.bullets[b].x+","+ player.bullets[b].y+","+enemies[c].hitBox);
            enemies.splice(c, 1);
            player.bullets.splice(b, 1);
          }
        }
      }

    var count = 0;

    for(let c = 0; c<enemies.length; c++){                  //removes bullet from enemy's bullet array once it hits the player
      for(let b = 0; b<enemies[c].bullets.length; b++){     //also adds how many bullets are hitting the player and then subtract that from the player's health
        if(enemies[c].bullets[b].checkHit(player.poly)){
          count++;
          enemies[c].bullets.splice(b, 1);
          b--;
        }
      }
    }

    player.health-=count;
    console.log(player.health);


    for(let c = 0; c<enemies.length; c++){
      enemies[c].show();
    }


  }
}

function mouseReleased(){
    player.shoot();
}

function updateBullets(){                           //this function only updates player bullets
    for(let c = 0; c<player.bullets.length; c++){
      player.bullets[c].update();
    }
  }

function keyPressed(){
  if(keyCode==32&&started==false){
    play=true;
    started=true;
    console.log(keyCode);
    loop();
  }
}

function handleUi(health){
  if(health==3&&started){
    noStroke();
    fill(89, 244, 66);
    ellipse(25, 470, 50, 50);
    stroke(255, 255, 255);
    noFill();
    ellipse(25, 470, 50, 50);
  }else if(health==2&&started){
    noStroke();
    fill(214, 216, 78);
    ellipse(25, 470, 50, 50);
    noStroke();
    fill(0, 0, 0);
    rect(0, 445, 50, 17);
    stroke(255, 255, 255);
    noFill();
    ellipse(25, 470, 50, 50);
  }else{
    noStroke();
    fill(255, 22, 22);
    ellipse(25, 470, 50, 50);
    noStroke();
    fill(0, 0, 0);
    rect(0, 445, 50, 34);
    stroke(255, 255, 255);
    noFill();
    ellipse(25, 470, 50, 50);
  }

  fill(75, 226, 61);
  rect(50, 470, 100, 20);
  fill(0, 0, 0);
  textSize(15);
  fill(255, 255, 255);
  noStroke();
  text('Level '+level, 60, 490);
  noStroke();


  }

function endGame(){
  noLoop();
  fill(75, 226, 61);
  rect(100, 200, 300, 30);
  fill(0, 0, 0);
  textSize(15);
  text('You Win', 175, 220);
}

function loseGame(){
  noLoop();
  stroke(249, 0, 0);
  fill(249, 0, 0);
  rect(100, 200, 300, 30);
  fill(238, 242, 29);
  textSize(15);
  text('You Lose', 175, 220);
}


class Game{

  checkEnemyHit(hitBox){
    var hitCount = 0;
    for(let c = 0; c<enemys.length; c++){
      if(enemys[c].enemyHit(hitBox)){
        hitCount+=1;
      }
    }
    return hitCount;
  }

  removeEnemy(index){
    enemy.splice(index, 1);
  }
}
