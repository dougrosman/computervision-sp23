// Rozin Mirror Fullscreen Starter

const cam_w = 640;
const cam_h = 480; // set to 480 for a 4:3 aspect ratio
let capture;

function setup() {
    createCanvas(cam_w, cam_h);
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

    // tip: if your sketch is running slowly, try increasing stepSize.
    const stepSize = 20;

    for (let y = 0; y < capture.height; y += stepSize) {
        for (let x = 0; x < capture.width; x += stepSize) {
            // capture.width - x is an efficient way to mirror your webcam feed
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