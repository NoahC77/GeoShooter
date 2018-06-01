var level = 0;
var enemies = [], playerBullets = [];
var enemiesFired=true;
var play = false;
var started = false;


function setup(){
    createCanvas(500, 500);
    background(0)
    let g = new Game;
    player = new Player(3, 0, 3);
    //player.show();

    //showBullets();

    for(let c = 0; c<10; c++){
      enemies.push(new Enemy(3, Math.floor(Math.random()*400)+10, Math.floor(Math.random()*100)+10, 20, 20));
    }

    noLoop();
    clear();
}

function draw(){

    if(play==false){
        background(0);
        stroke(132, 242, 255);
        fill(132, 242, 255);
        if(collidePointRect(mouseX, mouseY, 100, 100, 300, 200)){
          stroke(80, 43, 242);
          fill(80, 43, 242);
          console.log("collided");
        }
        rect(100, 100, 300, 200);
        fill(255, 255, 255);
        textSize(15);
        text('Press spacebar to play', 120, 220);
      }


    if(play==true){
    background(0);
    player.update();
    handleEnemies();
    player.show();
    showBullets();

    if(frameCount%2500==0){
      clear();
    }

    if(enemies.length==0){
      endGame();
    }


    if(frameCount%100==0){
        for(let c = 0; c<enemies.length; c++){
            enemies[c].shoot();
        }
    }

    }
}
function showBullets(){
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

function handleEnemies(){

  if(enemies.length>0){
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
    for(let c = 0; c<enemies.length; c++){
      for(let b = 0; b<player.bullets.length; b++){
      if(enemies[c]){
          if(collidePointPoly(player.bullets[b].x, player.bullets[b].y, enemies[c].hitBox)){
              console.log(player.bullets[b].x+","+ player.bullets[b].y+","+enemies[c].hitBox);
            enemies.splice(c, 1);
            player.bullets.splice(b, 1);
          }
        }
      }
    }

    var count = 0;

    for(let c = 0; c<enemies.length; c++){
      for(let b = 0; b<enemies[c].bullets.length; b++){
        if(enemies[c].bullets[b].checkHit(player.poly)){
          count++;
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

function updateBullets(){
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

function endGame(){
  noLoop();
  rect(100, 100, 300, 200);
  fill(255, 255, 255);
  textSize(15);
  stroke(255, 26, 30);
  text('You won', 120, 220);
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
