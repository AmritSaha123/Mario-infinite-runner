var PLAY = 1
var END = 0
var gameState = PLAY

var jumpSound, deadSound

var marioImg,mariojumpImg  
var donkeykongImg,donkeykong
var invisibleGround
var backgroundImg, bg
var score = 0
var barrel,barrelGroup,barrelImg
var gameoverImg,gameover,restartImg,restart

function preload(){
  marioImg = loadAnimation("mario.png")
  mariojumpImg = loadAnimation("mariojump.png")
  donkeykongImg = loadImage("donkeykong.png")
  backgroundImg = loadImage("background.jpg")
  gameoverImg = loadImage("gameover.png")
  restartImg = loadImage("restart.png")
  barrelImg = loadImage("barrel.png")
}

function setup(){
  
createCanvas(600,360);
  invisibleGround = createSprite(100,270,600,20)
  invisibleGround.visible = false
  invisibleGround.velocityX = -(6 + 3*score/100);

  

  bg = createSprite(300,180)
  bg.addImage("background",backgroundImg)
  
  mario = createSprite(50,150)
  
  mario.addAnimation("running",marioImg)
  mario.addAnimation("jump",mariojumpImg)
  mario.scale = 0.2
  mario.debug = false

  

  gameover = createSprite(300,180)
  gameover.addImage("gameover",gameoverImg)
  gameover.scale = 0.5

  restart = createSprite(300,100)
  restart.addImage("restart",restartImg)
  restart.scale = 0.5

  donkeykong = createSprite(500,220)
  donkeykong.addImage("donkeykong",donkeykongImg)
  donkeykong.scale = 0.2

  barrelGroup = createGroup()
  
}

function draw(){


  mario.collide(invisibleGround)
if(gameState === PLAY){

  gameover.visible = false;
  restart.visible = false;
  
  invisibleGround.velocityX = -(4 + 3* score/100)

  score = score + Math.round(getFrameRate()/40);

 
  
  if (invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }
  
  
  if(keyDown("SPACE")) {
      console.log("working")
      mario.velocityY = -12;
      jumpSound.play();
  }
  
  mario.velocityY = mario.velocityY + 0.8
 
  spawnBarrels()

  if(barrelGroup.isTouching(mario)){
    gameState = END;
    dieSound.play()
}
}

 else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
   
  
    gameOver.depth = mario.depth
   
    invisibleground.velocityX = 0;
    mario.velocityY = 0
 }


  drawSprites()

  textSize(20)
text("Score"+score,500,120)
}



function spawnBarrels(){
if (frameCount % 70 === 0){
  var barrel = createSprite(500,230)
  barrel.addImage(barrelImg)
  barrel.scale = 0.1
  barrel.velocityX = -5
  barrel.lifetime = 300
  barrel.debug = true
  barrel.setCollider("rectangle",0,0,40,40)

  
  barrel.depth = background.depth
  barrel.depth = barrel.depth +1
  barrel.depth = mario.depth
  mario.depth  = mario.depth +1

  barrelGroup.add(barrel)
}
}

function reset(){
  gameState = PLAY;
  gameover.visible = false;
  restart.visible = false;
  
  barrelGroup.destroyEach();
  
  score = 0;
  
}
 
