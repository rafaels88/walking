var Ledge = Ledge || function(){ }

Ledge.prototype.turnOn = function(){
  //  This stops it from falling away when you jump on it
  this.body.immovable = true;
}
