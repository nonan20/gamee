var database, wall, bow1, bow2, target1, target2;
var wallImg, bow1Img, bow2Img;
var arrow1img, arrow2img;
var arrow1, arrow2;
var p1Score = 0;
var p2Score = 0;
var arrow1Group, arrow2Group;
var p1, p1Sprite;
var p2, p2Sprite
var state = 1;
var noise;
var button;
var reset;

function preload() {
  wallImg = loadImage("wall.png");
  bow1Img = loadImage("bow1.png");
  bow2Img = loadImage("bow2.png");
  arrow1img = loadImage("arrow1.png");
  arrow2img = loadImage("arrow2.png");
  p1 = loadImage("p1.jpg");
  p2 = loadImage("p2.jpg");

  noise = loadSound("swoos.mp3");

  reset = loadImage("reset.png")

}

function setup() {
  database = firebase.database()
  createCanvas(800,400);

  wall = createSprite(400, 200, 25, 400);
  wall.addImage(wallImg);
  wall.scale = 2;

  bow1 = createSprite(25, 200, 25, 25);
  bow1.addImage(bow1Img);
  bow2 = createSprite(775, 200, 25, 25);
  bow2.addImage(bow2Img);
  bow1.scale = 2;
  bow2.scale = 2;

  target1 = createSprite(300, 200, 50, 50);
  target2 = createSprite(500, 200, 50, 50);
  target1.height = Math.round(random(10, 70));
  target2.height = target1.height;
  target1.velocityY = 15;
  target2.velocityY = 15;

  textSize(25)

  arrow1Group = new Group();
  arrow2Group = new Group();

  button = createSprite(400, 50, 25, 25);
  button.visible = false;
  button.addImage(reset)
}

function draw() {
  background("white");
  if(state === 1){
      if (target1.y <= 0){
      target1.velocityY = 15
    }
    if (target1.y >= 400){
      target1.velocityY = 0;
      target1.velocityY = -15
    }

    if (target2.y <= 0){
      target2.velocityY = 15
    }
    if (target2.y >= 400){
      target2.velocityY = -15
    }

    if (keyDown("UP_ARROW")){
        spawnArrow1();
        noise.play();
    }

    if (arrow1Group.isTouching(target1)){
      arrow1Group.destroyEach();
      p1Score = p1Score + 1;
    }

    if (keyDown("DOWN_ARROW")){
      spawnArrow2();
      noise.play();
    }

    if (arrow2Group.isTouching(target2)){
      arrow2Group.destroyEach();
      p2Score = p2Score + 1;
    }

    if(p1Score === 5){
      console.log(p1Score)
      p1Sprite = createSprite(400, 200, 20, 20)
      p1Sprite.addImage(p1)
      state = 2
    }

    if(p2Score === 5){
      p2Sprite = createSprite(400, 200, 20, 20)
      p2Sprite.addImage(p2)
      state = 2
    }
  }
  else if(state === 2){
    button.visible = true
  }

  text(p1Score, 25, 100);
  text(p2Score, 775, 100);



  drawSprites();
}

function spawnArrow1(){
    arrow1 = createSprite(50, 200, 25, 25);
    arrow1.addImage(arrow1img);
    arrow1.scale = 0.15;
    arrow1.visible = true
    arrow1.x = 50
    arrow1.velocityX = 17
    arrow1Group.add(arrow1);
}

function spawnArrow2(){
  arrow2 = createSprite(750, 200, 25, 25);
  arrow2.addImage(arrow2img);
  arrow2.scale = 0.15;
  arrow2.visible = true
  arrow2.x = 750
  arrow2.velocityX = -17
  arrow2Group.add(arrow2);
}