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

let mode = 1;
const numModes = 5;
let autoToggle = false;
let toggleTime = 2000;

let dTime = 0;

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


function preload() {
    let url =
        "https://api.openweathermap.org/data/2.5/weather?lat=41.878113&lon=-87.629799&appid=87fb783a54817f1793f0556477730e7c";
    weatherData = loadJSON(url);
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


    /////// Emris
    parseData();

    bgVal = map(minute(), 0, 60, 0, 255);
    console.log(bgVal);
    h = hour();
    currentH = h;
}

function draw() {

    switch (mode) {
        case 0:
            mirrorMeadow();
            break;
        case 1:
            mirrorEmris();
            break;
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




function mirrorEmris() {
    
    let capture = setCapture(1);

    background(bgVal/1.5, 0, bgVal, 10);
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
                const brightness = (10 + g + b) / 2.4;

                if (x % 3 == 0) {
                    fill(bgVal, 255-bgVal, 255-bgVal, 255 - brightness*3);
                    textSize(5);
                    text(currentWeather, x-(bgVal/2), y-(bgVal/2));
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

function mirrorMeadow() {
    let capture = setCapture(2);

    background(255);
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