var Gun = Gun || function(gameEngine){
  this.gameEngine = gameEngine;
  this.bullets = undefined;
  this.fireRate = 100;
  this.nextFire = 0;
}

Gun.prototype.turnOn = function(){
}

Gun.prototype.addBullets = function(bullets){
  this.bullets = bullets;
}

Gun.prototype.fire = function(params){
  if (this.gameEngine.time.now > this.nextFire && this.bullets.countDead() > 0)
    {
        this.nextFire = this.gameEngine.time.now + this.fireRate;

        var bullet = this.bullets.getFirstDead();

        bullet.reset(params.playerPosition.x, params.playerPosition.y);

        this.gameEngine.physics.arcade.moveToXY(bullet,
                                                params.playerPosition.x,
                                                params.playerPosition.y + 20,
                                                300);
    }
}
