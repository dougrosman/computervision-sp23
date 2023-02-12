let shapePos;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  shapePos = createVector(width/2, height/2);
}

function draw() {
  background(100);

  const mousePos = createVector(mouseX, mouseY);
  const angle = atan2(mousePos.y - shapePos.y, mousePos.x - shapePos.x);

  push()
  translate(shapePos.x, shapePos.y);
  rotate(angle + PI/2);
  triangle(0, -10, -5, 10, 5, 10)
  pop()

  if(mousePos.dist(shapePos) > 60) {

    shapePos = p5.Vector.lerp(shapePos, mousePos, 0.01);
  }
  

}

class Bird {}