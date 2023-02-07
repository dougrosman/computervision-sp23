// Rozin Mirror Starter

const cam_w = 640;
const cam_h = 360; // set to 480 for a 4:3 aspect ratio
let capture;

function setup() {
    createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO);
    capture.size(cam_w, cam_h);
    capture.hide();
}

function draw() {
    clear();

    capture.loadPixels();
    
    // ensure we're getting a capture feed before doing any operations on the feed
    if (capture.pixels.length > 0) {

        // scale the canvas up or down depending on the width of the window
        const scaleRatio = windowWidth / capture.width;
        const scaledHeight = capture.height * scaleRatio;

        push();
            translate(0, (windowHeight - scaledHeight) / 2);
            scale(scaleRatio, scaleRatio);
            mirror();
        pop();
    }
}

// Edit the mirror function below
function mirror() {

    const stepSize = 20; // Use an even number

    // y and x are set to stepSize/2 (instead of 0) when drawing ellipses so that they aren't cut off on the top and left sides of the sketch
    for (let y = stepSize/2; y < capture.height; y += stepSize) {
        for (let x = stepSize/2; x < capture.width; x += stepSize) {
            const index = (capture.width - x + y * capture.width) * 4;

            const r = capture.pixels[index];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];
            
            noStroke();
            fill(r, g, b);
            ellipse(x, y, stepSize, stepSize);
        }
    }
}

function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}