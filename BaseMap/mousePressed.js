function pressBaseMap() {  
  if ( gameState != "BaseMap" ) return;
  
  if ( confirm ) {
    var breakIt = false;
    if ( mouseX < 90/800*width || mouseX > 708/800*width ) breakIt = true;
    if ( mouseY < 370/500*height || mouseY > 435/500*height ) breakIt = true;
    if ( breakIt == false ) {
      if ( mouseX < 372/800*width ) {
        confirm = false;
        targetPlayer = null;
        tokenInfo.field = null;
        tokenInfo.lane = null;
        tokenInfo.zone = null;
        lastClickPos = null;
      } else if ( mouseX > 428/800*width ) {
        allArray.push({
          player: targetPlayer,
          token: {
            field: lastToken.field,
            lane: lastToken.lane,
            zone: lastToken.zone
          }
        });       
        
        targetPlayer.turnsPlayed++;
        
        confirm = false;
        targetPlayer = null;
        tokenInfo.field = null;
        tokenInfo.lane = null;
        tokenInfo.zone = null;
        lastClickPos = null;
        
        if ( allArray.length % (playerMovers.length * 6) == 0 ) {
          gameState = "ResolvePastShips";
        }
      }
    }
  } else {
    for ( var player of playerMovers ) {
      if ( mouseX < player.tl[0]/800*width || mouseX > player.br[0]/800*width ) continue;
      if ( mouseY < player.tl[1]/500*height || mouseY > player.br[1]/500*height ) continue;
      if ( player.waiting) continue;
      targetPlayer = player;
      break;
    }
    if ( targetPlayer == null ) return;
  }
}

function dragBaseMap() {
  if ( targetPlayer == null ) return;
  if ( confirm ) return;
  mouse = true;
}

function releaseBaseMap() {  
  if ( gameState != "BaseMap" ) return;
  mouse = false;
  if ( targetPosition == null ) {
    confirm = false;
    targetPlayer = null;
    tokenInfo.field = null;
    tokenInfo.lane = null;
    tokenInfo.zone = null;
    lastClickPos = null;
  }
  if ( targetPlayer != null && tokenInfo.field == null ) {
    confirm = false;
    targetPlayer = null;
    tokenInfo.field = null;
    tokenInfo.lane = null;
    tokenInfo.zone = null;
    lastClickPos = null;
  }
  
  if ( targetPlayer != null && tokenInfo.field != null ) {
    confirm = true;
    lastClickPos = [offX, offY];
  } else {
    confirm = false;
    targetPlayer = null;
    tokenInfo.field = null;
    tokenInfo.lane = null;
    tokenInfo.zone = null;
    lastClickPos = null;
  }
}

//

function snapToPoints() {  // The script to run for when, while dragging, the cursor is close to an established position
  var thresh = 50;
  targetPosition = null;
  var candidates = [];
  for ( var p = 0; p < positions.length; p++ ) {
    var pos = positions[p];
    if ( abs(mouseX - pos[0]/800*width) > thresh ) continue;
    if ( abs(mouseY - pos[1]/500*height) > thresh ) continue;
    var length = dist(mouseX, mouseY, pos[0]/800*width, pos[1]/500*height);
    if ( length > thresh ) continue;
    candidates.push([length, pos, p]);
  }
  if ( candidates.length == 0 ) {
    targetPosition = null;
    return;
  }
  candidates.sort(function(a, b) { return a[0] - b[0]})
  targetPosition = candidates[0];
  
  stroke("white");
  strokeWeight(8);
  colorMode(RGB);
  fill(255, 255, 255, 128);
  circle(targetPosition[1][0]/800*width, targetPosition[1][1]/500*height, 100/800*width);
  stroke("black");
  strokeWeight(2);
  noFill();
  circle(targetPosition[1][0]/800*width, targetPosition[1][1]/500*height, 100/800*width);
  line(targetPosition[1][0]/800*width, 0, targetPosition[1][0]/800*width, width);
  line(0, targetPosition[1][1]/500*height, height, targetPosition[1][1]/500*height);
  
  drawDemo(targetPosition);
}

function drawDemo(pos) {
  // Just wanted to break the functions apart a bit
  
  
  offX = width/2 + width/2 - mouseX;
  offY = height/2 + height/2 - mouseY;
  
  noStroke();
  fill("white");
  circle(offX, offY, 160/800*width);
  
  stroke(2);
  if ( pos[2] < 8 ) execute("red")
  else if ( pos[2] < 16 ) execute("yellow")
  else if ( pos[2] < 24 ) execute("green")
  else if ( pos[2] < 32 ) execute("aqua")
  else if ( pos[2] < 40 ) execute("blue")
  else if ( pos[2] < 48 ) execute("purple")
  else if ( pos[2] < 56 ) execute("black")
  else execute("white")
  
  function execute(col) {
    fill(col);
    circle(offX, offY, 150/800*width);
    fill("black");
    if ( col == "green" || col == "blue" || col == "purple" || col == "black") fill("white");
    noStroke();
    textSize(30/800*width);
    text(col, offX, offY - 20/800*width);
    
    var lane = "o";
    var posModulus = pos[2] % 8;
    if ( posModulus == 0 || posModulus == 1 || posModulus == 2 || posModulus == 3 ) lane = "+";    
    text(lane, offX - 10/800*width, offY + 20/500*height);
    
    var zone = "0";
    var zoneModulus = pos[2] % 4;
    if ( zoneModulus == 0 ) zone = "0" 
    else if ( zoneModulus == 1 ) zone = "1" 
    else if ( zoneModulus == 2 ) zone = "2" 
    else if ( zoneModulus == 3 ) zone = "3"    
    text(zone, offX + 10/800*width, offY + 20/500*height);
    
    tokenInfo.field = col;
    tokenInfo.lane = lane;
    tokenInfo.zone = zone;
  }
}

function confirmToken() {
  
  if ( lastClickPos == null ) {
    confirm = false;
    targetPlayer = null;
    tokenInfo.field = null;
    tokenInfo.lane = null;
    tokenInfo.zone = null;
    lastClickPos = null;
  }
  
  createToken(tokenInfo.field, tokenInfo.lane, tokenInfo.zone, width/2, height/2, 2.5/800*width)
  lastToken = {field: tokenInfo.field, lane: tokenInfo.lane, zone: tokenInfo.zone}
}

function createToken(field, lane, zone, x, y, scale) {  
  noStroke();
  fill("white");
  circle(x, y, 160 * scale);
  strokeWeight(2 * scale);
  stroke("black");
  fill(field);
  circle(x, y, 150 * scale);
  fill("black");
  noStroke();
  if ( field == "green" || field == "blue" || field == "purple" || field == "black") fill("white");
  textSize(30 * scale);
  
  text(field, x, y - 20 * scale);     
  text(lane, x - 10 * scale, y + 20 * scale);    
  text(zone, x + 10 * scale, y + 20 * scale);
  
  makeButton("Confirm >", 170/800*width);
  makeButton("< Cancel", -170/800*width);
  
}

function makeButton(txt, offX) {  
  rectMode(CENTER);
  stroke("white");
  strokeWeight(10);
  rect(width/2 + offX, height/2 + 150/500*height, 300, 80);
  stroke("black");
  strokeWeight(2);
  fill("white");
  rect(width/2 + offX, height/2 + 150/500*height, 300, 80);
  fill("black");
  noStroke();
  textSize(30/500*height);
  text(txt, width/2 + offX, height/2 + 160/500*height);
}

function drawPlayMat(player) {
  player.draw();
  var playersMoves = [];
  for ( var move of allArray ) {
    if ( move.player == player ) playersMoves.push(move);
  }
  var circSize = 70;
  var offsetX = (width - (circSize * 7)) / 2;
  var offsetY = (height - (circSize/height*500 * 6)) / 2;
  
  var totalMovesChecked = 1;
  
  for ( var loop = 1; loop <= 5; loop++ ) {
    for ( var turn = 1; turn <= 6; turn++ ) {
      totalMovesChecked = ((loop - 1) * 6) + turn;
      var pos = [(turn * circSize) + offsetX, height + (loop * -circSize/height*500) + 100];
      move = playersMoves[totalMovesChecked-1];
      
      if ( playersMoves.length >= totalMovesChecked ) {
        //createToken(move.token.field, move.token.lane, move.token.zone, pos[0], pos[1], 0.45);
         
        var x = pos[0]/800*width;
        var y = pos[1]/500*height;
        var scale = 0.45/1;
        
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
        
      } else {      
        colorMode(RGB);
        stroke("white");
        strokeWeight(2);
        fill(255, 255, 255, 60);

        circle(pos[0]/800*width, pos[1]/500*height, circSize);
      }
    }
  }
}