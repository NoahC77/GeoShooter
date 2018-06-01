
class PlayerBullet{

    constructor(x, y, diameter){
      this.x = x;
      this.y = y;
      this.diameter = diameter;
    }

    checkHit(hitBox){
        if(collidePointPoly(this.x, this.y, hitBox))
          return true;
    }

    update(){
      this.y-=5;
    }
}
