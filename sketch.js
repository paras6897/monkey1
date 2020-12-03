//var backgroundMusic;
var ground,groundImage;
var monkey , monkey_running, monkey_collided;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var PLAY=1;
var END=0;
var gameState = PLAY;
var score = 0;
var survivaltime = 0;

function preload(){
  
  //To load the images of monkey moving
 monkey_running=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  //monkey_collided = loadImage ("Monkey_01.png")
  
 // To load the image of banana
  bananaImage = loadImage("banana.png");
  
  //To load the image of obstacle
  obstacleImage = loadImage("stone.png");
 
  //loading ground image
  //groundImage = loadImage("ground.jpg");
  
 // backgroundMusic = loadSound("Dance Monkey.mp3")
}

function setup() {
  
  createCanvas(400,400);
  
  //To add the images of monkey running
  monkey = createSprite(30,330,0,0);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.1;

  //creating the ground
  ground = createSprite(200,380,300,10);
  ground.velocityX=-3;
  ground.shapeColor="brown";
  //ground.addImage("g",groundImage);
  ground.scale = 4.9;
  
  //creating the groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
 
 // backgroundMusic.play();
}


function draw() {
  background("lightblue");
  
  //adding the survival time
  stroke ("darkblue");
  textSize (20);
  fill ("darkblue")
  textFont ("Comic Sans MS")
  text("Survival Time : " + survivaltime,30,50)
  
  if(gameState===PLAY){
     
     //survival time
  survivaltime = Math.ceil(frameCount/frameRate());
  
  //moving the ground
  ground.velocityX = -4;
  
  if (ground.x < 0){
      ground.x = ground.width/2;
   }
  
  //making the monkey jump
    if (keyDown("space") && monkey.y >= 200){
      monkey.velocityY = -10;
    }
  
  //adding gravity to the monkey
    monkey.velocityY = monkey.velocityY + 0.3;
  //stop monkey from falling
  monkey.collide(ground);
    
    
    //creating the functions
    spawnBananas();
    spawnObstacles();
    
    //making the bananas disappear when the monkey touches it
    if (monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
      score = score + 5;
    }
    
    //changing the game state to end
   if (monkey.isTouching(obstacleGroup)){
     gameState=END;
   }
  drawSprites();
    
  }
if(gameState===END){
     
  textSize(30);
  text("GAME OVER",130,200);
}
}

function spawnBananas(){
  if (frameCount % 80 === 0){
  //creating the bananas
 var banana = createSprite (400,Math.round(random (100,250)) ,10,10 );
 banana.addImage("b",bananaImage);
  banana.scale = 0.05;
    
    //moving the banana
  banana.velocityX = -4;
    
    //giving the banana a lifetime
banana.lifetime = 250;
    
    //adding banana in its group
    bananaGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount % 140 === 0){
    //creating the obstacles
    var obstacle = createSprite (400,323,10,10);
    obstacle.addImage("o",obstacleImage);
    obstacle.scale= 0.1;
    
    //moving the obstacles
    obstacle.velocityX = -4;
    
    //giving the obstacles a lifetime
    obstacle.lifetime = 250;
    
    //adding obstacle in its group
    obstacleGroup.add(obstacle);
  }
}
