class Player{

  constructor(h, posX, posY){
      this.x = posX;
      this.y = posY;
      this.health = h;
      this.bullets = [];

      this.poly = [];
      this.poly[0] = createVector(mouseX-20, mouseY-30);
      this.poly[1] = createVector(mouseX+20, mouseY-30);
      this.poly[2] = createVector(mouseX, mouseY+30);
  }

  show(){
      triangle(mouseX-20, mouseY+30, mouseX+20, mouseY+30, mouseX, mouseY-30);
  }

  update(){
    this.x = mouseX;
    this.y = mouseY;

    this.poly[0] = createVector(mouseX-20, mouseY-30);
    this.poly[1] = createVector(mouseX+20, mouseY-30);
    this.poly[2] = createVector(mouseX, mouseY+30);

    for(let c = 0; c<this.bullets.length; c++){     //deletes out of bounds bullets
      if(this.bullets[c].y<0){
        this.bullets.splice(c, 1);
      }
    }

    for(let c = 0; c<this.bullets.length; c++){     //deletes out of bounds bullets
      this.bullets[c].update();
    }

    if(this.health<0){
      noLoop();
      fill(142, 2, 2);
      rect(100, 100, 300, 200);
      fill(255, 255, 255);
      textSize(15);
      text('You Died!', 120, 220);
    }
  }

  hit(){
      h-=1;
  }

  shoot(){
    fill(188, 69, 69);
    this.bullets.push(new PlayerBullet(this.x, this.y-30, 500));
  }

/*  checkPlayerHit(){

}*/

  checkExpiredPlayerBullets(){

    for(let c = 0; c<bullets.length; c++){
      if(bullets[c].checkDeath()){
        bullets.splice(c, 1);
      }
    }
}
}
