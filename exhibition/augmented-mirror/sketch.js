// Rozin Mirror

const cam_w = 640;
const cam_h = 360;


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
}

function draw() {
    //clear();

    


    const scaleRatio = windowWidth / capture.width;
    const scaledHeight = capture.height * scaleRatio;

    push()
    translate(0, (windowHeight - scaledHeight) / 2);
    scale(scaleRatio, scaleRatio);

    
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
    }
    pop();

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


function mirrorMeadow() {
    // background(255);
    //capture.size(360, 360);
    capture.loadPixels();

    if (capture.pixels.length > 0) {


    const stepSize = 10;
  
    for (let y = stepSize / 2; y < capture.height; y += stepSize) {
      for (let x = stepSize / 2; x < capture.width; x += stepSize) {
        const index = (capture.width - x + y * capture.width) * 4;
  
        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
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
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    displayScaler = width / cam_w;
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