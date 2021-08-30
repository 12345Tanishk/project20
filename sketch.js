var rocket;
var asteroid;
var space;
var gameState;
var stars;
var starGroup;
var asteroidGroup;
var star;

function preload(){
  asteroidimg = loadImage("asteroid.png");
  rocketimg = loadAnimation("rocket.png");
  spaceimg = loadImage("space.jpg");
  starimage = loadAnimation("star.jpg");
  gameoverimg = loadImage("gameover.png");
}

function setup() {
  createCanvas(600,600);
  stars = 0;
  gameState = "Play";
  ///Create background
  space =createSprite(200,200,3,3);
  space.addImage("spaceimage",spaceimg);
  space.scale=3;
  space.velocityY=2;
  ///Create Rocket
  rocket = createSprite(200,550,3,3);
  rocket.addAnimation("rocketimage",rocketimg);
  rocket.scale=0.1;
  ///Create asteroids and stars
  starGroup = new Group();
  asteroidGroup = new Group();
}

function draw() {
  background(0);
  drawSprites();
  textSize(20);
  fill(255);
  text("Stars: "+stars,10,30);
  if (gameState == "Play") {
    spawnStars();
    spawnAsteroids();
    move();
    if(rocket.isTouching(starGroup)) {
      score();
    }
  }
  if(rocket.isTouching(asteroidGroup)) {
    over();
  }
}


function spawnStars (){
  if (frameCount % 200 === 0) {
    star = createSprite(300,300,3,3);
    star.addAnimation("starimage",starimage);
    star.scale=0.05;
    star.velocityY=2;
    star.x = Math.round(random(120,400));
    star.lifetime=800;
    starGroup.add(star);
  }
}

function spawnAsteroids (){
  if (frameCount % 250 === 0) {
    asteroid = createSprite(100,100);
    asteroid.addImage("asteroidimage",asteroidimg);
    asteroid.scale=0.09;
    asteroid.velocityY=2;
    asteroid.x = Math.round(random(120,400));
    asteroid.lifetime=800;
    asteroidGroup.add(asteroid);
  }
}

function score(){
  stars=stars+1;
  starGroup.destroyEach();
}

function move() {
  if(keyDown("LEFT_ARROW")) {
    rocket.x=rocket.x-5;  
  }
  if(keyDown("RIGHT_ARROW")) {
    rocket.x=rocket.x+5;  
  }
  if(space.y > 412){
    space.y = 312;
  }
}

function over() {
  var gameover=createSprite(300,300,3,3);
  gameover.addImage("gameoverimage",gameoverimg);
  gameover.scale=0.3;
  space.velocityY=0;
  starGroup.destroyEach();
  asteroidGroup.destroyEach();
  starGroup.visible=false;
  asteroidGroup.visible=false;
  gameState = "Over"
}