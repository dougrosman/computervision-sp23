// Text Rain

const cam_w = 640;
const cam_h = 480;
let capture;
const phrase = "please catch me"
let fallingLetters = [];

function setup() {
    createCanvas(cam_w, cam_h);
    capture = createCapture(VIDEO);
    capture.size(cam_w, cam_h);

    for(let i = 0; i < phrase.length; i++) {
        const letter = phrase[i];
        const position = createVector(i * 14, 0);
        fallingLetters.push(new FallingLetter(letter, position));
    }
}

function draw() {
    clear(); // clear the canvas before drawing content
    const threshold = map(mouseX, 0, width, 0, 255);

    capture.loadPixels();
    
    fallingLetters.forEach(fallingLetter => {

       while(!checkBrightnessAtPixel(fallingLetter.position)) {
        fallingLetter.position.y--;
       }
       fallingLetter.update();
    })
}

// if bright, keeping falling. if dark, go up
// should return true if bright, false if dark
function checkBrightnessAtPixel(position) {

    const threshold = 100;

    const index = (position.x + position.y * cam_w ) * 4;
    const r = capture.pixels[index]
    const g = capture.pixels[index+1]
    const b = capture.pixels[index+2]

    // calculate the pixel brightness by finding the average of the three channels
    const brightness = floor((r + g + b) / 3)

    if(brightness > threshold) {
        return true;
    }

    return false;    
}

class FallingLetter {
    constructor(letter, position) {
        this.letter = letter;
        this.position = position;
    }

    update() {
        this.position.y++;
        if(this.position.y > height) {
            this.position.y = 0;
        }
    }

    draw() {
        text(this.letter, this.position.x, this.position.y);
    }
}