// Rozin Mirror

const cam0_w = 640;
const cam0_h = 360;

const cam1_w = 640;
const cam1_h = 480;

const cam2_w = 640;
const cam2_h = 640;

// 16:9
let capture0;

// 1:1
let capture1;

let mode = 5;
const numModes = 6;
let autoToggle = false;
let toggleTime = 2000;

let dTime = 0;

/////// Chloe
let blockImage;
let minecraftColors = [];
const mcData = [];

/////// Emris
let weatherData;
let apiKey = "87fb783a54817f1793f0556477730e7c";
// chicago
let lat = "41.878113";
let lon = "-87.629799";
let h;
let currentH;
let currentWeather;
let unixDT;
let unixSunrise;
let unixSunset;
let bgVal;

/////// Ernest
let osc, fft;


function preload() {
    let url =
        "https://api.openweathermap.org/data/2.5/weather?lat=41.878113&lon=-87.629799&appid=87fb783a54817f1793f0556477730e7c";
    weatherData = loadJSON(url);
    blockImage = loadImage("images/MinecraftDiamonds@16.png");
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    pixelDensity(1);

    capture0 = createCapture(VIDEO);
    capture0.size(cam0_w, cam0_h);
    capture0.hide();

    capture1 = createCapture(VIDEO);
    capture1.size(cam1_w, cam1_h);
    capture1.hide();

    capture2 = createCapture(VIDEO);
    capture2.size(cam2_w, cam2_h);
    capture2.hide();


    /////// Chloe
    readMinecraftBlockColors();

    /////// Emris
    parseData();

    bgVal = map(minute(), 0, 60, 0, 255);
    console.log(bgVal);
    h = hour();
    currentH = h;

    /////// Ernest
    osc = new p5.TriOsc(); // set frequency and type
    osc.amp(0.5);

    fft = new p5.FFT();
    osc.start();
}

function draw() {

    switch (mode) {
        case 0:
            mirrorChloe();
            break;
        case 1:
            mirrorEmris();
            break;
        case 2:
            mirrorErnest();
            break;
        case 3:
            mirrorJoohyun();
            break;
        case 4:
            mirrorMeadow();
            break;
        case 5:
            mirrorNicole();
            break;
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

function mirrorChloe() {
    let capture = setCapture(2);

    const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
    const scaledHeight = capture.height * scaleRatio;
    const scaledWidth = capture.width * scaleRatio;

    push()
    translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
    scale(scaleRatio, scaleRatio);

    capture.loadPixels();
    if (capture.pixels.length > 0) {

        const stepSize = 16;

        for (let y = 0; y < capture.height; y += stepSize) {
            for (let x = 0; x < capture.width; x += stepSize) {
                const index = (capture.width - x + y * capture.width) * 4;

                const r = capture.pixels[index];
                const g = capture.pixels[index + 1];
                const b = capture.pixels[index + 2];
                let cColor = createVector(r, g, b);

                let distances = [];
                for (let i = 0; i < minecraftColors.length; i++) {
                    let mc = minecraftColors[i].map((x) => x);
                    let mcColor = createVector(mc[0], mc[1], mc[2]);
                    let dis = cColor.dist(mcColor);
                    distances.push(dis);
                }
                noStroke();
                const min = distances.reduce((a, b) => Math.min(a, b))
                let cIndex = distances.indexOf(min);

                let c = minecraftColors[cIndex].map((x) => x);
                let clr = color(c[0], c[1], c[2])
                fill(clr);

                square(x, y, 16)
                distances = [];
            }
        }
    }
    pop();
}

function readMinecraftBlockColors() {
    if (blockImage == undefined || null) {
        console.log("No Image Detected")
    }

    for (let x = 0; x < blockImage.width; x++) {
        for (let y = 0; y < blockImage.height; y++) {
            minecraftColors.push(blockImage.get(x, y));
        }
    }
}

function mirrorEmris() {

    let capture = setCapture(1);

    background(bgVal / 1.5, 0, bgVal, 10);
    const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
    const scaledHeight = capture.height * scaleRatio;
    const scaledWidth = capture.width * scaleRatio;

    push()
    translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
    scale(scaleRatio, scaleRatio);

    h = hour();
    if (currentH != h) {
        parseData();
        currentH = h;
    }
    if ((unixDT > unixSunrise) && (unixDT < unixSunset)) {
        fill('yellow');
        ellipse(capture.width / 5, capture.height / 5, 30, 30);
    } else {
        fill('white');
        ellipse(capture.width / 5, capture.height / 5, 20, 20);
    }

    capture.loadPixels();
    if (capture.pixels.length > 0) {

        const stepSize = 10;

        for (let y = stepSize / 2; y < capture.height; y += stepSize) {
            for (let x = stepSize / 2; x < capture.width; x += stepSize) {
                const index = (capture.width - x + y * capture.width) * 4;

                const r = capture.pixels[index];
                const g = capture.pixels[index + 1];
                const b = capture.pixels[index + 2];
                const brightness = (r + g + b) / 3;

                if (x % 3 == 0) {
                    fill(bgVal, 255 - bgVal, 255 - bgVal, 255 - brightness * 3);
                    textSize(5);
                    text(currentWeather, x - (bgVal / 2), y - (bgVal / 2));
                }

                const size = map(brightness, 0, 255, stepSize, stepSize * 3);
                noStroke();
                fill((r + b) / 2, 0, b, 255 - brightness * 2);

                ellipse(x, y, size * 4, size / 3);
            }
        }
    }
    pop();
}

function parseData() {
    currentWeather = weatherData.weather[0].description;
    unixDT = weatherData.dt;
    unixSunrise = weatherData.sunrise;
    unixSunset = weatherData.sunset;
}

function mirrorErnest() {

    let capture = setCapture(0);

    background(0, 0, 255);
    const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
    const scaledHeight = capture.height * scaleRatio;
    const scaledWidth = capture.width * scaleRatio;

    push()
    translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
    scale(scaleRatio, scaleRatio);

    capture.loadPixels();
    if (capture.pixels.length > 0) {

        const stepSize = 20;

        for (let y = 0; y < capture.height; y += stepSize) {
            for (let x = 0; x < capture.width; x += stepSize) {
                const index = (capture.width - x + y * capture.width) * 4;

                const r = capture.pixels[index];
                const g = capture.pixels[index + 1];
                const b = capture.pixels[index + 2];
                const brightness = (r + g + b) / 3;

                stroke(r, g, b);
                strokeWeight(1);
                rotate(PI / brightness);

                strokeJoin(BEVEL);
                strokeCap(PROJECT);

                fill(r / brightness, g / brightness, b / brightness, 0);

                quad(
                    x,
                    y,
                    brightness * 2,
                    brightness * 3,
                    brightness * 4,
                    brightness * 5,
                    brightness * 6,
                    brightness * 7
                );
            }
        }
    }
    pop();
}

function mirrorJoohyun() {

    let capture = setCapture(0);

    background(0, 50, 0);
    const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
    const scaledHeight = capture.height * scaleRatio;
    const scaledWidth = capture.width * scaleRatio;

    push()
    translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
    scale(scaleRatio, scaleRatio);
    rectMode(CENTER);

    capture.loadPixels();
    if (capture.pixels.length > 0) {

        const stepSize = 20;

        for (let y = stepSize / 2; y < capture.height; y += stepSize) {
            for (let x = stepSize / 2; x < capture.width; x += stepSize) {
                const index = (capture.width - x + y * capture.width) * 4;

                const r = capture.pixels[index];
                const g = capture.pixels[index + 1];
                const b = capture.pixels[index + 2];
                const brightness = (r + g + b) / 3;

                fill(r, g, b)

                const shapeThreshold = map(mouseX, 0, windowWidth, 0, 255);

                if (brightness > shapeThreshold) {
                    ellipse(x, y, stepSize, stepSize);
                } else {
                    rect(x, y, stepSize, stepSize);
                }
            }
        }
    }
    pop();
}

function mirrorMeadow() {
    let capture = setCapture(2);

    background(100, 100, 255);
    const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
    const scaledHeight = capture.height * scaleRatio;
    const scaledWidth = capture.width * scaleRatio;

    push()
    translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
    scale(scaleRatio, scaleRatio);

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
    pop();
}

function mirrorNicole() {

    let capture = setCapture(0);

    background(100,0,100);
    const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
    const scaledHeight = capture.height * scaleRatio;
    const scaledWidth = capture.width * scaleRatio;

    push()
    translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
    scale(scaleRatio, scaleRatio);

    capture.loadPixels();
    if (capture.pixels.length > 0) {

        const stepSize = 40;

        for (let y = 0; y < capture.height; y += stepSize) {
            for (let x = 0; x < capture.width; x += stepSize) {
                const index = (capture.width - x + y * capture.width) * 4;

                const r = capture.pixels[index];
                const g = capture.pixels[index + 1];
                const b = capture.pixels[index + 2];
                const brightness = (r + g + b) / 3;

                const size = map(brightness, 0, 255, stepSize / 4, stepSize);
                //noStroke();
                stroke(r, g, b, 255);
                strokeWeight(10);
                fill(r * 2, brightness, 255);

                //ellipse(x, y, size, size)
                rect(x, y, size * 3, size * 2);
                textSize(brightness / 2);
                fill(180, brightness, 200);
                text("nikita", x, y);
                blendMode(HARD_LIGHT);
                // blendMode(REPLACE);
            }
        }
    }
    pop();
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    if (currentCapture === 1) {
        displayScaler = width / capture1.width;
    }
    displayScaler = width / capture0.width;
}

function keyPressed() {
    clear();
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
        case 48:
            mode = 0;
            break;
        case 49:
            mode = 1;
            break;
        case 50:
            mode = 2;
            break;
        case 51:
            mode = 3;
            break;
        case 52:
            mode = 4;
            break;
        case 53:
            mode = 5;
            break;
        case 54:
            mode = 6;
            break;
        case 55:
            mode = 7;
            break;
        case 56:
            mode = 8;
            break;
        case 57:
            mode = 9;
            break;
        case 81: // Q
            mode = 10;
            break;
        case 87: // W
            mode = 11;
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

function setCapture(num) {
    let capture;
    switch (num) {
        case 0:
            capture = capture0;
            break;
        case 1:
            capture = capture1;
            break;
        case 2:
            capture = capture2;
            break;
    }

    return capture;
}