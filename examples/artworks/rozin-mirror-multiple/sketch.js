// Rozin Mirror

const cam_w = 640;
const cam_h = 360;
let displayScaler;
let capture;
let mode = 0;
const numModes = 5;
let autoToggle = false;
let toggleTime = 2000;

let dTime = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    capture = createCapture(VIDEO);
    capture.size(cam_w, cam_h);
    capture.hide();
    displayScaler = width/cam_w;
}

function draw() {
    clear();

    capture.loadPixels();

    if (autoToggle) {

        // deltaTime is time between frames, so dTime accounts for time elapsed, independent of framefrate
        dTime += deltaTime 
        
        if (dTime >= toggleTime) {
            mode = (mode + 1) % numModes;
            console.log(mode)
            console.log(dTime)
            dTime = 0;
        }
    }

    push()
    translate(0, abs((windowHeight-1280))/4)
    scale(displayScaler, displayScaler)
    if (capture.pixels.length > 0) {
        switch (mode) {
            case 0:
                mirrorDoug0();
                break;
            case 1:
                mirrorDoug1();
                break;
            case 2:
                mirrorDoug2();
                break;
            case 3:
                mirrorDoug3();
                break;
            case 4:
                mirrorDoug4();
                break;
        }
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    displayScaler = width/cam_w;
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
        case 52:
            mode = 3;
            break;
        case 53:
            mode = 4;
            break;
        case UP_ARROW:
            toggleSpeed += 4;
            break;
        case DOWN_ARROW:
            if (toggleSpeed > 8) toggleSpeed -= 4;
            break;
    }

    console.log(mode);
}

function mirrorDoug0() {
    const stepSize = 20;
    for (let y = stepSize/2; y < cam_h; y += stepSize) {
        for (let x = stepSize/2; x < cam_w; x += stepSize) {
            const index = (cam_w - x + y * cam_w) * 4;

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

function mirrorDoug1() {
    const stepSize = 20;
    for (let y = 0; y < cam_h; y += stepSize) {
        for (let x = 0; x < cam_w; x += stepSize) {
            const index = (cam_w - x + y * cam_w) * 4;

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

function mirrorDoug2() {
    const stepSize = 40;
    for (let y = 0; y < cam_h; y += stepSize) {
        for (let x = 0; x < cam_w; x += stepSize) {
            const index = (cam_w - x + y * cam_w) * 4;

            const r = capture.pixels[index];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];
            const brightness = (r + g + b) / 3

            const size = map(brightness, 0, 255, 0, stepSize);

            fill(r, g, b);
            noStroke();
            rect(x, y, size, size);
        }
    }
}

function mirrorDoug3() {
    background(0);
    const stepSize = 40;
    for (let y = 0; y < cam_h; y += stepSize) {
        for (let x = 0; x < cam_w; x += stepSize) {
            const index = (cam_w - x + y * cam_w) * 4;

            const r = capture.pixels[index];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];
            const brightness = (r + g + b) / 3; 
            const size = map(brightness, 0, 255, .125, 1);

            stroke(r, g, b);
            strokeWeight(5);
            
            push()
                translate(x + stepSize / 2, y + stepSize / 2);
                scale(size)
                line(-stepSize / 2, -stepSize / 2, stepSize / 2, stepSize / 2);
                line(stepSize / 2, -stepSize / 2, -stepSize / 2, stepSize / 2);
            pop();
        }
    }
}

function mirrorDoug4() {
    clear();
    const stepSize = 20;
    for (let y = 0; y < cam_h; y += stepSize) {
        for (let x = 0; x < cam_w; x += stepSize) {
            const index = (cam_w - x + y * cam_w) * 4;

            const r = capture.pixels[index];
            const g = capture.pixels[index + 1];
            const b = capture.pixels[index + 2];
            const brightness = (r + g + b) / 3;

            const size = map(brightness, 0, 255, 0, stepSize);

            stroke(r, g, b);
            strokeWeight(.5);

            line(x, y, x + size, y + size);
            line(x + stepSize, y, x + size, y + size);
        }
    }
}
