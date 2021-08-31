var resolveTurn = -1;

function drawResolvePastShips() {
  if ( gameState != "ResolvePastShips" ) {
    return;
  }
  console.log("YOU");
  background(220, 30, 90);
  
  fill(0);
  textSize(50);
  text("Resolve Past Ships!", width/2, 45);
  
  console.log("HEY:" + allArray.length, resolveTurn)
  var move = allArray[resolveTurn];
  console.log(move);
  
  var player = move.player;
  
  //player.draw();
  
  stroke("black");
  strokeWeight(5);
  colorMode(HSB);
  fill(player.h, player.s, player.b);
  circle(width/4, height/2, 250);
  
  noStroke();
  fill(0, 0, 0);
  textSize(50);
  textAlign(CENTER);
  text("Player " + player.player, width/4, height/2);
  
  
  var x = width*3/4
  var y = height/2;
  var scale = 1.8;
  noStroke();
  fill("white");
  circle(x, y, 160 * scale);
  strokeWeight(2 * scale);
  stroke("black");
  fill(move.token.field);
  circle(x, y, 150 * scale);
  fill("black");
  noStroke();
  if ( move.token.field == "green" || move.token.field == "blue" || move.token.field == "purple" || move.token.field == "black") fill("white");
  textSize(30 * scale);

  text(move.token.field, x, y - 20 * scale);     
  text(move.token.lane, x - 10 * scale, y + 20 * scale);    
  text(move.token.zone, x + 10 * scale, y + 20 * scale);
  
  
}