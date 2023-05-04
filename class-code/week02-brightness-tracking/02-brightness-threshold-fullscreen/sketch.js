// Pixel Access Webcam

const cam_w = 1280;
const cam_h = 720;
let capture;

let slider;
let thresholdDisplay;

function setup() {
    createCanvas(cam_w, cam_h);
    capture = createCapture(VIDEO);
    capture.size(cam_w, cam_h);
    capture.hide();

    // GUI setup
    slider = createSlider(0, 255, 127).style('width', `${width / 2}px`);
    thresholdDisplay = createP("");
}

function draw() {
    const threshold = slider.value()
    thresholdDisplay.html(`Threshold: ${threshold}`)

    capture.loadPixels();
    
    if (capture.pixels.length > 0) {
        for (let y = 0; y < capture.height; y++) {
            for (let x = 0; x < capture.width; x++) {
                const index = (x + y * capture.width) * 4;
                
                const r = capture.pixels[index];
                const g = capture.pixels[index + 1];
                const b = capture.pixels[index + 2];
                
                // calculate the pixel brightness by finding the average of the three channels
                const brightness = (r + g + b) / 3
                
                if (brightness > threshold) {
                    capture.pixels[index] = 255;
                    capture.pixels[index + 1] = 255;
                    capture.pixels[index + 2] = 255;
                } else {
                    capture.pixels[index] = 0;
                    capture.pixels[index + 1] = 0;
                    capture.pixels[index + 2] = 0;
                }
            }
        }
        
        capture.updatePixels();
        image(capture, 0, 0);
    }
}