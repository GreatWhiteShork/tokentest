var gameStates = ["PlayerSelection", "ResolvePastShips", "BaseMap", "Confirm"]
var gameState = gameStates[0];

var players = 0;
var playerMovers = [];
var targetPlayer = null;

var targetPosition = null;
var tokenInfo = {field:null, lane:null, zone:null};
var lastToken = {field:null, lane:null, zone:null};
var confirm = false;

var offX, offY;
var lastClickPos = null;

var mouse = false;

var allArray = [];


function setup() {
  createCanvas(800, 400);
}

function draw() {
  colorMode(HSB)
  drawPlayerSelection();
  drawBaseMap();
  drawResolvePastShips();
}

function touchStarted() {
  pressBaseMap();  
  pressResolvePastShips();
}

function touchMoved() {
  dragBaseMap();
}

function touchEnded() {
  releasePlayers();  
  releaseBaseMap();  
}
//
//



