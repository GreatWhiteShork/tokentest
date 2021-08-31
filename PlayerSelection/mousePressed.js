function releasePlayers() {
  if ( gameState != "PlayerSelection" ) return;
  if ( mouseY < 166 || mouseY > 440 ) return;
  if ( mouseX < 0 || mouseX > 800 ) return;
  
  if ( mouseX > 12 && mouseX < 188 ) players = 1;
  if ( mouseX > 216 && mouseX < 384 ) players = 2;
  if ( mouseX > 415 && mouseX < 585 ) players = 3;
  if ( mouseX > 618 && mouseX < 787 ) players = 4;
  
  gameState = "BaseMap";
  
  setupBaseMap();
}