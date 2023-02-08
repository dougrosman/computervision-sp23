// Rozin Mirror

const cam0_w = 640;
const cam0_h = 360;

const cam1_w = 640;
const cam1_h = 640;

let currentCapture = 0;

// 16:9
let capture0;

// 1:1
let capture1;

let mode = 0;
const numModes = 5;
let autoToggle = false;
let toggleTime = 2000;

let dTime = 0;
function setup() {
    createCanvas(windowWidth, windowHeight);
    capture0 = createCapture(VIDEO);
    capture1 = createCapture(VIDEO);
    capture0.size(cam0_w, cam0_h);
    capture1.size(cam1_w, cam1_h);
    capture0.hide();
    capture1.hide();
}

function draw() {
    //clear();

    switch (mode) {
        case 0:
            mirrorMeadow();
            break;
        // case 1:
        //     mirrorDoug1();
        //     break;
        // case 2:
        //     mirrorDoug2();
        //     break;
        // case 3:
        //     mirrorDoug3();
        //     break;
        // case 4:
        //     mirrorDoug4();
        //     break;
    }

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
}


function mirrorMeadow() {
    currentCapture = 2;
    capture1.loadPixels();

    const scaleRatio = windowWidth / capture1.width;
    const scaledHeight = capture1.height * scaleRatio;

    push()
    translate(0, (windowHeight - scaledHeight) / 2);
    scale(scaleRatio, scaleRatio);

    if (capture1.pixels.length > 0) {


        const stepSize = 10;

        for (let y = stepSize / 2; y < capture1.height; y += stepSize) {
            for (let x = stepSize / 2; x < capture1.width; x += stepSize) {
                const index = (capture1.width - x + y * capture1.width) * 4;

                const r = capture1.pixels[index];
                const g = capture1.pixels[index + 1];
                const b = capture1.pixels[index + 2];
                const brightness = (10 + g + b) / 2.4;

                noStroke();
                fill(r, g, 255);

                if (brightness > 230) {
                    square(y, x, 0, 0);
                } else {
                    square(y, x, 10, 10);
                }

                ellipse(x, y, stepSize, stepSize);
            }
        }
    }
    pop();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    if(currentCapture === 1) {
        displayScaler = width / capture1.width;
    }
    displayScaler = width / capture0.width;
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

function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
}