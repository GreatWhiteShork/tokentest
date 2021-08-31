function pressResolvePastShips() {
  if ( gameState != "ResolvePastShips" ) return;
  if ( resolveTurn >= allArray.length - 1 ) {
    gameState = "BaseMap";
    resolveTurn = 0;
  };
  resolveTurn++;
}