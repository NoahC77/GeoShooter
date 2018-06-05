

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
    this.y+=2;
  }

  show(){
    line(this.x, this.y, this.x, this.y+10);
  }

}
