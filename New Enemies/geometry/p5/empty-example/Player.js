class Player{

  constructor(h, posX, posY, width, height){
      this.x = posX;
      this.y = posY;
      this.health = h;
      this.bullets = [];
      this.width = width;
      this.height = height;
      this.poly = [];

  }

  show(){
      fill(59, 204, 57);
      triangle(mouseX+this.width/2, mouseY+this.height/2, mouseX-this.width/2, mouseY+this.height/2, mouseX, mouseY-this.height/2);
      fill(204, 96, 57);
  }

  generateHitBox(){
    this.poly[0] = createVector(mouseX+this.width/2, mouseY+this.height/2);
    this.poly[1] = createVector(mouseX-this.width/2, mouseY+this.height/2);
    this.poly[2] = createVector(mouseX, mouseY-this.height/2);
  }

  update(){
    this.x = mouseX;                                //updates player's hitbox based on mouse (x, y) position
    this.y = mouseY;
    this.generateHitBox();
    for(let c = 0; c<this.bullets.length; c++){     //deletes out of bounds bullets
      if(this.bullets[c].y<0){
        this.bullets.splice(c, 1);
      }
    }

    for(let c = 0; c<this.bullets.length; c++){     //deletes out of bounds bullets
      this.bullets[c].update();
    }

    if(this.health<0||(this.x>500&&this.y>500)){
      noLoop();
      stroke(249, 0, 0);
      fill(249, 0, 0);
      rect(100, 200, 300, 30);
      fill(238, 242, 29);
      textSize(15);
      text('You Lose', 175, 220);
    }
  }

  hit(){
      h-=1;
  }

  shoot(){
    fill(188, 69, 69);
    this.bullets.push(new PlayerBullet(this.x, this.y-30, 500));
    noStroke();
  }

  checkExpiredPlayerBullets(){

    for(let c = 0; c<bullets.length; c++){
      if(bullets[c].checkDeath()){
        bullets.splice(c, 1);
      }
    }
  }
}
