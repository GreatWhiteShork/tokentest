function setupBaseMap() {
  
  new playerMover(1, 60, 60, 0, 70, 255, [17,16]);
  if ( players >= 2 ) { new playerMover(2, width - 60, height - 60, 180, 70, 255, [699, 396]); }
  if ( players >= 3 ) { new playerMover(3, 60, height - 60, 55, 70, 255, [17, 396]); }
  if ( players >= 4 ) { new playerMover(4, width - 60, 60, 300, 70, 255, [701, 15]); }
}

function playerMover(player, x, y, h, s, b, tl) {
  playerMovers.push(this);
  
  this.player = player;
  
  this.x = x;
  this.y = y;
  this.tl = tl;  // Top left
  this.br = [tl[0] + 90, tl[1] + 90];  // Bottom right
  
  this.h = h;
  this.s = s;
  this.b = b;
  
  this.turnsPlayed = 0;
  this.waiting = false;
}

playerMover.prototype.draw = function() {
  if ( targetPlayer != null && targetPlayer != this ) return;
  
  for ( var player of playerMovers ) {
    if ( player.turnsPlayed < this.turnsPlayed ) {
      this.waiting = true;
      break;
    }
    this.waiting = false;
  }
  
  if ( this.waiting ) {
    stroke("black");
    colorMode(RGB);
    fill(0,0,0,100);    
    circle(this.x, this.y, 100/800*width);
    
    fill("black");
    noStroke();
    textAlign(CENTER);
    textSize(20);
    text("Waiting", this.x, this.y + 5/500*height);
    textSize(10);
    text("for others", this.x, this.y + 12/500*height);
    
    return;
  }
  
  stroke("black");
  strokeWeight(1);
  colorMode(HSB);
  fill(this.h, this.s, this.b);
  circle(this.x, this.y, 100/800*width);
  if ( targetPlayer == this ) circle(this.x, this.y, 150/800*width);
  noStroke();
  fill(0, 0, 0);
  textSize(20/500*height);
  textAlign(CENTER);
  text("Player " + this.player, this.x, this.y + 5/800*width);
}