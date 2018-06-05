
class PlayerBullet{

    constructor(x, y){
      this.x = x;
      this.y = y;
    }

    checkHit(hitBox){
        if(collidePointPoly(this.x, this.y, hitBox))
          return true;
    }

    update(){
      this.y-=5;
    }
}
