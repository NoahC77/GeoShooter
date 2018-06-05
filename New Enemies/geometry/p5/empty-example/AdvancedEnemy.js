class SpreadBullet{
  constructor(x, y, direction){
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  checkHit(hitBox){
      if(collidePointPoly(this.x, this.y, hitBox))
        return true;
  }

  update(){

    if(this.direction=="right"){
      this.y+=2;
      this.x+=1;
    }else if(this.direction=="left"){
      this.y+=2;
      this.x-=1;
    }else{
      this.y+=2;
    }

  }

  show(){
    line(this.x, this.y, this.x, this.y+10);
  }
}


class AdvancedEnemy{
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


  }

  show(){
    strokeWeight(1);
    fill(249, 0, 232);
    rect(this.x, this.y, this.width, this.height);
  }

  generateHitBox(){
    this.hitBox[0] = createVector(this.x, this.y);
    this.hitBox[1] = createVector(this.x+this.width, this.y);
    this.hitBox[2] = createVector(this.x+this.width, this.y-this.height);
    this.hitBox[3] = createVector(this.x, this.y-this.height);
  }

  damage(b){
    health-=1;
  }

  shoot(){                                                          //beause the advanced enemy shoots in a spray pattern, it spawns a left, right and center shot
    if(this.atTargetY==true){
      this.bullets.push(new SpreadBullet(this.x, this.y, "left"));
      this.bullets.push(new SpreadBullet(this.x, this.y, "right"));
      this.bullets.push(new SpreadBullet(this.x, this.y, "straight"));
      console.log("enemy shot");
    }
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


    this.generateHitBox();
  }
    this.generateHitBox();
  }

}
