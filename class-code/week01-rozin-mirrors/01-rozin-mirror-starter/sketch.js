// Rozin Mirror Starter

const cam_w = 640;
const cam_h = 480;
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
        mirror();
    }
}

// Edit the mirror function below
function mirror() {

    // tip: choose a number that divides evenly into your capture width (640)
    const stepSize = 20;

    // y and x are set to stepSize/2 (instead of 0) when drawing ellipses so that they aren't cut off on the top and left sides of the sketch
    for (let y = 0; y < capture.height; y += stepSize) {
        for (let x = 0; x < capture.width; x += stepSize) {
            // capture.width - x is an efficient way to mirror your webcam feed horizontally
            const index = (capture.width - x + y * capture.width) * 4;

            const r = capture.pixels[index];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];

            noStroke();
            fill(r, g, b);
            rect(x, y, stepSize, stepSize);
        }
    }
}