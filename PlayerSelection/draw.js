function drawPlayerSelection() {
  if ( gameState != "PlayerSelection" ) return;
  background(220, 30, 90);
  textSize(50);
  textAlign(CENTER);
  text("How many players?", width/2, 100);
  
  rectMode(CENTER);
  rect(width/8, 300/500*height, width/4, 300/500*height);
  rect(width/8 + width/4, 300/500*height, width/4, 300/500*height);
  rect(width/8 + width/4 + width/4, 300/500*height, width/4, 300/500*height);
  rect(width/8 + width/4 + width/4 + width/4, 300/500*height, width/4, 300/500*height);
  
  textSize(30);
  text("1 Player", width/8, 300/500*height);
  text("2 Players", width/8 + width/4, 300/500*height);
  text("3 Players", width/8 + width/4 + width/4, 300/500*height);
  text("4 Players", width/8 + width/4 + width/4 + width/4, 300/500*height);
}