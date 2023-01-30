// Rozin Mirror

const cam_w = 640;
const cam_h = 480;
let capture;
let mode = 0;
const numModes = 3;
let autoToggle = false;
let toggleSpeed = 60;

function setup() {
    createCanvas(cam_w, cam_h);
    capture = createCapture(VIDEO);
    capture.size(cam_w, cam_h);
    capture.hide();
}

function draw() {
    clear();

    capture.loadPixels();

    if(autoToggle) {
        if(frameCount % toggleSpeed == 0) {
            mode = (mode + 1) % numModes;
            console.log(mode)
        }
    }

    if (capture.pixels.length > 0) {
        switch (mode) {
            case 0:
                mirrorDoug1();
                break;
            case 1:
                mirrorDoug2();
                break;
            case 2:
                mirrorDoug3();
                break;
        }
    }
}


function keyPressed() {
    switch (keyCode) {
        case RIGHT_ARROW:
            mode++;
            if (mode >= numModes) {
                mode = 0;
            }
            break;
        case LEFT_ARROW:
            mode--;
            if (mode < 0) {
                mode = numModes - 1;
            }
            break;
        case 32:
            autoToggle = !autoToggle;
            console.log(autoToggle)
            break;
        case 49:
            mode = 0;
            break;
        case 50:
            mode = 1;
            break;
        case 51:
            mode = 2;
            break;
        case UP_ARROW:
            toggleSpeed+=4;
            break;
        case DOWN_ARROW:
            if(toggleSpeed > 8) toggleSpeed-=4;
            break;
    }

    console.log(mode);
    console.log(toggleSpeed);
}

function mirrorDoug1() {
    const stepSize = floor(map(mouseX, 0, width, 8, 80));
    for (let y = 0; y < height; y += stepSize) {
        for (let x = 0; x < width; x += stepSize) {
            const index = (x + y * width) * 4;

            const r = capture.pixels[index];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];
            const brightness = (r + g + b) / 3

            const size = map(brightness * brightness, 0, 255 * 255, 0, stepSize * 8);

            fill(r, g, b);
            noStroke();
            ellipse(x, y, size, size);
        }
    }
}

function mirrorDoug2() {
    const stepSize = floor(map(mouseX, 0, width, 8, 80));
    for (let y = 0; y < height; y += stepSize) {
        for (let x = 0; x < width; x += stepSize) {
            const index = (x + y * width) * 4;

            const r = capture.pixels[index];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];
            const brightness = (r + g + b) / 3

            const size = map(brightness * brightness, 0, 255 * 255, 0, stepSize * 8);

            fill(r, g, b);
            noStroke();
            rect(x, y, size, size);
        }
    }
}

function mirrorDoug3() {
    background(255, 0, 0);
    const stepSize = floor(map(mouseX, 0, width, 8, 80));
    for (let y = 0; y < height; y += stepSize) {
        for (let x = 0; x < width; x += stepSize) {
            const index = (x + y * width) * 4;

            const r = capture.pixels[index];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];
            const brightness = (r + g + b) / 3

            const size = map(brightness * brightness, 0, 255 * 255, 0, stepSize * 8);

            fill(r, g, b);
            noStroke();
            rect(x, y, size, size);
        }
    }
}
