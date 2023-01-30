// Text Rain

const cam_w = 640;
const cam_h = 480;
let capture;
const phrase = "please catch me, i'm falling down!"
let fallingLetters = [];

function setup() {
    createCanvas(cam_w, cam_h);
    capture = createCapture(VIDEO);
    capture.size(cam_w, cam_h);

    // fill an array with FallingLetters
    for(let i = 0; i < phrase.length; i++) {
        const fontSize = 20;
        const letter = phrase[i];
        const position = createVector(i * fontSize, 0);
        fallingLetters.push(new FallingLetter(letter, position, fontSize));
    }
}

function draw() {
    clear(); // clear the canvas before drawing content

    capture.loadPixels();

    // for each of the falling letters
    fallingLetters.forEach(fallingLetter => {

       while(fallingLetter.position.y > 0 &&
            fallingLetter.position.y < height &&
            !checkBrightnessAtPixel(fallingLetter)) {
        fallingLetter.position.y--;
       }
       fallingLetter.update();

       fallingLetter.draw();
    })
}

// if bright, keeping falling. if dark, go up
// should return true if bright, false if dark
function checkBrightnessAtPixel(fl) {

    const threshold = 80;
    const mirrorX = width-fl.position.x

    const index = (mirrorX + fl.position.y * cam_w) * 4;
    const r = capture.pixels[index]
    const g = capture.pixels[index+1]
    const b = capture.pixels[index+2]

    // calculate the pixel brightness by finding the average of the three channels
    const brightness = floor((r + g + b) / 3)

    // keep falling
    if(brightness > threshold) {
        return true;
    }
    // stop falling
    return false;    
}

// A FallingLetter is an object that contains a letter, a position, a fallRate and a fontSize

class FallingLetter {
    constructor(letter, position, fontSize) {
        this.letter = letter;
        this.position = position;
        this.fallRate = 2;
        this.fontSize = fontSize;
    }

    // update the position of the falling letter on the screen
    update() {
        // if the letter has reached the bottom of the window, bring it back to the top
        if(this.position.y > height+this.fontSize) {
            this.position.y = 0;
        }

        // make the letter fall by increase its y-value
        this.position.y+=this.fallRate;
    }

    // draw the falling letter to the canvas
    draw() {
        fill(255);
        textSize(this.fontSize);
        text(this.letter, this.position.x, this.position.y);
    }
}