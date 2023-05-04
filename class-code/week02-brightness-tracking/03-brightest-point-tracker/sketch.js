// Pixel Access Webcam

const cam_w = 640;
const cam_h = 480;
let capture;

function setup() {
    createCanvas(cam_w, cam_h);
    capture = createCapture(VIDEO);
    capture.size(cam_w, cam_h);
}

function draw() {
    clear();
    
    let currentBrightestValue = 0;
    let brightestPoint = createVector(0, 0);
    
    capture.loadPixels();
    if (capture.pixels.length > 0) {


        for (let y = 0; y < capture.height; y++) {
            for (let x = 0; x < capture.width; x++) {
                const index = (x + y * width) * 4;

                const r = capture.pixels[index];
                const g = capture.pixels[index + 1];
                const b = capture.pixels[index + 2];

                // calculate the pixel brightness by finding the average of the three channels
                const brightness = floor((r + g + b) / 3);

                if (brightness > currentBrightestValue) {
                    currentBrightestValue = brightness;
                    brightestPoint.set(x, y);
                }
            }
        }
        stroke(0, 255, 0);
        strokeWeight(20);
        point(brightestPoint.x, brightestPoint.y);
    }
}