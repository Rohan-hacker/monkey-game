var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running , monkey_jumping
var back
var win
var restart
var banana ,bananaImage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, obstacleImage,groundImage

var FoodGroup, obstacleGroup

var score

function preload(){
  
  
  //monkey_running =            loadAnimation("monkey1.png","monkey2.png","monkey3.png","monkey4.png","monkey5.png","monkey6.png","monkey7.png")
  
  monkey_running=loadAnimation("kong1.png","kong2.png","kong3.png","kong4.png","kong5.png")
  
  monkey_jumping = loadAnimation("kong_jump4.png","kong_jump4.png","kong_jump4.png")
  
  monkeyDie = loadAnimation("kong_die2.png")
  
  winImage = loadImage("win.png")
  
  resetImage = loadImage("reset.png")
  
  groundImage = loadImage("ground.png");
  
  backImage = loadImage("back.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  bananaImage = loadImage("banana.png");
 
}

function setup() {
  createCanvas(600, 400);
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.addAnimation("jumping",monkey_jumping);
  monkey.addAnimation("dying", monkeyDie);
  // monkey.addImage(bananaImage)
  monkey.scale=0.7;
  
  back=createSprite(300,200);
  back.scale=0.4;
  back.visible=false;
  
  restart=createSprite(300,325);
  restart.addImage(resetImage);
  restart.scale=0.3;
  restart.visible=false;
  
  win=createSprite(300,200);
  win.visible=true
  win.addImage(winImage);
  win.scale=1.5;
  win.depth=win.depth-20;
  win.velocityX=-4;
  win.x=win.width/2;
  console.log(win.x)
  
  ground = createSprite(400,355,900,10);
  ground.addImage(groundImage);
  ground.velocityX=-4;
  ground.x=ground.width/4;
  console.log(ground.x)

  FoodGroup = new Group();
  obstaclesGroup = new Group();

  score = 0;
 
  
}


function draw() {
  
  background(255);

  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  
  if(win.x<0) {
    win.x=win.width/2;
  }  
   
    if(keyDown("space") && monkey.y>275) {
      monkey.changeAnimation("jumping", monkey_jumping);
      monkey.velocityY = -12;
    }else if(monkey.y>275){
      monkey.changeAnimation("moving", monkey_running);
    }
    monkey.velocityY = monkey.velocityY + 0.7;
  
    monkey.collide(ground);   
    spawnFood();
    spawnObstacles();
 
  drawSprites();
  stroke("white");
  textSize(20);
  fill("black");
  text("Score: "+ score, 475,40);        
  
  if(monkey.isTouching(FoodGroup)){
    score=score+1;
    FoodGroup.destroyEach();
  }
  
   if(obstaclesGroup.isTouching(monkey)){
      monkey.changeAnimation("dying", monkeyDie);
      ground.velocityX = 0;
      monkey.velocityY = 0;
      obstaclesGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);
      obstaclesGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);
      FoodGroup.destroyEach();
      back.visible=true;
      back.addImage(backImage);
      back.depth=back.depth+20;
      stroke("white");
      textSize(25);
      fill("white");
      text(score, 300,270);
      restart.visible=true;
      restart.depth=restart.depth+20
      if(mousePressedOver(restart)){
      console.log("Trying to Restart the game")
      restart.visible=false;
      reset();
      }
   }
}

function spawnFood() {
  //write code here to spawn the Food
  if (frameCount % 120 === 0) {
    banana = createSprite(600,250,40,10);
    banana.y = random(200,250);    
    banana.velocityX = -(6+score/10);
    
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add image of banana
     banana.addImage(bananaImage);
     banana.scale=0.05;
    
    //add each banana to the group
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(800,320,10,40);
    obstacle.velocityX = -(6+score/10);
    
    //add image to the obstacle 
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    obstacle.scale=0.5;
    
    //lifetime to the obstacle     
    obstacle.lifetime = 300;
    
    obstacle.depth=ground.depth-1
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function reset(){
  back.visible=false;
  obstaclesGroup.destroyEach();
  FoodGroup.destroyEach();
  monkey.changeAnimation("moving", monkey_running);
  ground.velocityX=-4;
  score=0;
}
