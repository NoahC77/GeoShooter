

class Enemy{

  constructor(health, x, y, w, h){
    this.health = health;
    this.x = x;
    this.y = 0;
    this.ty = y;
    this.width = w;
    this.height = h;
    this.bullets = [];
    this.bounce = false;
    this.atTargetY = false;


    this.hitBox = [];
    this.hitBox[0] = createVector(this.x, this.y);
    this.hitBox[1] = createVector(this.x+this.width, this.y);
    this.hitBox[2] = createVector(this.x+this.width, this.y-this.height);
    this.hitBox[3] = createVector(this.x, this.y-this.height);

  }

  show(){
    strokeWeight(1);
    fill(255);
    rect(this.x, this.y, this.width, this.height);
  }

  damage(b){
    health-=1;
  }

  shoot(){
    this.bullets.push(new Bullet(this.x, this.y));
  }

  checkExpiredBullets(){

  }

  enemyHit(hitBox){                                 //this is checking if the enemy shot a bullet that hit the player
    for(let c = 0; c<bullets.length; c++){
       if(this.bullets[c].checkHit(hitBox)){
         return true;
       }

    }
  }

  enter(){
    if(this.y<this.ty)
      this.y++;
    else {
      this.atTargetY=true;
    }
  }

  update(){

  if(this.atTargetY){
    if(this.bounce==false){
      this.x+=1;
    }else{
      this.x-=1;
    }

    if(this.x==500){
      this.bounce=true;
    }

    if(this.x==0){
      this.bounce=false;
    }

    for(let c = 0; c<this.bullets.length; c++){
        this.bullets[c].update();
        this.bullets[c].show();
    }


    this.hitBox[0] = createVector(this.x, this.y);
    this.hitBox[1] = createVector(this.x+this.width, this.y);
    this.hitBox[2] = createVector(this.x+this.width, this.y-this.height);
    this.hitBox[3] = createVector(this.x, this.y-this.height);
  }




    this.hitBox[0] = createVector(this.x, this.y);
    this.hitBox[1] = createVector(this.x+this.width, this.y);
    this.hitBox[2] = createVector(this.x+this.width, this.y-this.height);
    this.hitBox[3] = createVector(this.x, this.y-this.height);
  }

}

class Bullet{

  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  checkHit(hitBox){
      if(collidePointPoly(this.x, this.y, hitBox))
        return true;
  }

  update(){
    this.y+=5;
  }

  show(){
    strokeWeight(4);
    stroke(255, 26, 26);
    line(this.x, this.y, this.x, this.y+10);
    stroke(255, 255, 255);
  }

}
