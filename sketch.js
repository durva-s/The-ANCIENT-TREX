var trex, anitrex, ground, aniground, inground, anicloud,o1,o2,o3,o4,o5,o6,obstaclesGroup,cloudsGroup,PLAY,END,gameState,gameover, restart, goi,ri;

function preload() {
  anitrex = loadAnimation("trex1.png","trex3.png","trex4.png");
  aniground = loadImage("ground2.png");
  anicloud = loadImage("cloud.png");
  o1 = loadImage("obstacle1.png");
  o2 = loadImage("obstacle2.png");
  o3 = loadImage("obstacle3.png");
  o4 = loadImage("obstacle4.png");
  o5 = loadImage("obstacle5.png");
  o6 = loadImage("obstacle6.png");
  goi = loadImage("gameOver.png");
  ri = loadImage("restart.png");
}


function setup() {
  createCanvas(400, 400);
  trex = createSprite(50,358,20,25);
  ground = createSprite(200,375,400,20);
  inground = createSprite(200,385,400,10);
  trex.addAnimation("tr",anitrex);
  trex.scale = 0.5;
  ground.addImage("gr",aniground);
  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  PLAY = 1;
  END = 0;
  gameState = PLAY;
  gameover = createSprite(200,300,40,40);
  restart = createSprite(200, 340,25,27);
  gameover.addImage("gi",goi);
  restart.addImage("tri",ri);
  gameover.scale = 0.5;
  restart.scale = 0.4;
}

function draw() {
  background(170);
 
  
  if(gameState === PLAY){
   if (keyDown("space") && trex.y > 342) {
    trex.velocityY = -14;
  } 
     ground.velocityX = -6;
    trex.velocityY = trex.velocityY + 0.8;
    if (ground.x<0){
    ground.x = ground.width/2;
  }
    spawnClouds();
  spawnObstacles();
    gameover.visible = false;
    restart.visible = false;
  if(obstaclesGroup.isTouching(trex)){
    gameState = END;
  }
  }
  else if(gameState === END){
    ground.velocityX = 0;
    
    obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     gameover.visible = true;
    restart.visible = true;
    
  }
  
  trex.collide(inground);
  inground.visible = false;
  
  drawSprites();
}

function spawnClouds() {
  if(frameCount % 60 === 0) {
 var clouds = createSprite(400, random(240,350),40,15);
  clouds.addImage("cl",anicloud);
  clouds.velocityX = -3;
    clouds.scale = 0.5;
    clouds.lifetime = 134;
    cloudsGroup.add(clouds);
  }
}
function spawnObstacles() {
  if(frameCount % 100 === 0) {
   var obstacles = createSprite(400,358,20,40);
    obstacles.velocityX = -6;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1: obstacles.addImage("s",o1);
        break;
        case 2: obstacles.addImage("d",o2);
        break;
        case 3: obstacles.addImage("c",o3);
        break;
        case 4: obstacles.addImage("a",o4);
        break;
        case 5: obstacles.addImage("b",o5);
        break;
        case 6: obstacles.addImage("f",o6);
        break;
        default:
        break;
    }
    obstacles.lifetime = 400/6;
    console.log(rand);
    obstacles.scale=0.5;
    obstaclesGroup.add(obstacles);
  }
  
}