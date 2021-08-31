var positions = [[365, 82],[372, 117],[380, 153],[386, 184],[434, 82],[427, 116],[419, 150],[412, 184],[495, 107],[476, 141],[457, 168],[440, 195],[546, 158],[518, 176],[484, 198],[458, 214],[570, 220],[537, 228],[503, 233],[468, 240],[566, 286],[533, 278],[500, 272],[466, 268],[543, 348],[514, 325],[484, 306],[459, 290],[496, 393],[476, 365],[456, 336],[439, 310],[430, 422],[427, 389],[422, 353],[412, 317],[369, 420],[375, 381],[380, 358],[387, 318],[303, 396],[323, 366],[344, 337],[363, 307],[255, 351],[286, 330],[314, 311],[345, 291],[230, 286],[266, 282],[300, 271],[332, 266],[232, 222],[264, 231],[299, 237],[336, 242],[256, 154],[289, 176],[315, 196],[344, 215],[307, 107],[323, 136],[343, 166],[363, 197]];

function drawBaseMap() {
  if ( gameState != "BaseMap" ) return;
  background(220, 50, 70);
  
  if ( targetPlayer != null && confirm == false ) {
    if ( dist ( mouseX, mouseY, targetPlayer.x, targetPlayer.y ) < 50 ) {
      drawPlayMat(targetPlayer);
      return;
    }
  }
  
  
  
  
  var offset = PI / 4;
  fill(255);
  circle(width/2, height/2, width/2 + 20);
  fill(0);
  circle(width/2, height/2, width/2 + 10);
  var start = (-PI/2) - (offset/2);
  for ( var i = 0; i < 8; i++ ) {
    if ( i == 6 ) fill(0, 0, 30)
    else if ( i == 7 ) fill ( 0, 0, 100)
    else fill(i * 60, 50, 100);
    arc(width/2, height/2, width/2, width/2, start, start + offset);
    start += offset;    
  }
  colorMode(RGB);
  fill(255, 100);
  circle(width/2, height/2, width/2 - 20);
  noFill()
  circle(width/2, height/2, width/2 - 20 - 70);
  circle(width/2, height/2, width/2 - 20 - 140);
  circle(width/2, height/2, width/2 - 20 - 210);
  fill(100);
  strokeWeight(2);
  for ( var i = 0; i < 8; i++ ) {
    var sX = sin(start) * (width/4);
    var sY = cos(start) * (width/4);
    var cX = width/2;
    var cY = height/2;
    line(cX + sX, cY + sY, cX - sX, cY - sY);
    start += offset;
  }
  start += offset/2;
  strokeWeight(0.1);
  for ( var i = 0; i < 8; i++ ) {
    var sX = sin(start) * (width/4);
    var sY = cos(start) * (width/4);
    var cX = width/2;
    var cY = height/2;
    line(cX + sX, cY + sY, cX - sX, cY - sY);
    start += offset;
  }
  strokeWeight(0.5);
  circle(width/2, height/2, (width/8));
  
  for ( var p of playerMovers ) p.draw();
  
  if ( mouse == true && targetPlayer != null) {
    snapToPoints();
  }
  
  if ( confirm == true ) {
    confirmToken();
  }
  
  strokeWeight(1);
  stroke("black");
}