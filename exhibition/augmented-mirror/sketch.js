// Rozin Mirror

let sketchCounter = 0;

const cam0_w = 640;
const cam0_h = 360;

const cam1_w = 640;
const cam1_h = 480;

const cam2_w = 360;
const cam2_h = 360;

const cam3_w = 1280;
const cam3_h = 720;

// 16:9
let capture0;

// 4:3
let capture1;

// 1:1
let capture2;

// 16:9 HD
let capture3;

let currentCapture = 0;

let mode = 0;
const numModes = 12;
let autoToggle = true;
let toggleTime = 30000;

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
  background(0);
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

  capture3 = createCapture(VIDEO);
  capture3.size(cam3_w, cam3_h);
  capture3.hide();


  /////// Chloe
  readMinecraftBlockColors();

  /////// Emris
  parseData();

  bgVal = map(minute(), 0, 60, 0, 255);
  h = hour();
  currentH = h;

  /////// Ernest
  osc = new p5.TriOsc(); // set frequency and type
  osc.amp(0.5);

  fft = new p5.FFT();
  //osc.start();
}

function draw() {

  switch (mode) {
    case 0:
      mirrorAnnie();
      break;
    case 1:
      mirrorChloe();
      break;
    case 2:
      mirrorEmris();
      break;
    case 3:
      mirrorErnest();
      break;
    case 4:
      mirrorJoohyun();
      break;
    case 5:
      mirrorJun();
      break;
    case 6:
      mirrorLula();
      break;
    case 7:
      mirrorMeadow();
      break;
    case 8:
      mirrorNicole();
      break;
    case 9:
      mirrorReid();
      break;
    case 10:
      mirrorTheo();
      break;
    case 11:
      mirrorZechen();
      break;
  }

  if (autoToggle) {

    // deltaTime is time between frames, so dTime accounts for time elapsed, independent of framefrate
    dTime += deltaTime

    if (dTime >= toggleTime) {
      //clear();
      mode = (mode + 1) % numModes;
      console.log(mode)
      console.log(dTime)
      dTime = 0;
      sketchCounter++;
    }
    if(sketchCounter == numModes * 3 - 1) {
      window.location.href = window.location.href;
    }
  }
}

function mirrorAnnie() {
  clear();
  let capture = setCapture(3);

  background(0);
  const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
  const scaledHeight = capture.height * scaleRatio;
  const scaledWidth = capture.width * scaleRatio;

  push()
  translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
  scale(scaleRatio, scaleRatio);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    const stepSize = 28;

    for (let y = stepSize / 2; y < capture.height; y += stepSize) {
      for (let x = stepSize / 2; x < capture.width; x += stepSize) {
        const index = (capture.width - x + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        // const threshold = map(mouseX, 0, 640, 0, 255);
        // const size = map(brightness, 0, 255, 10, 100);

        if (brightness > 180 && brightness < 250) {
          textSize(28);
          fill(r - 20, g - 20, b - 20);
          text('行', x, y);
          // ellipse(x, y, stepSize, stepSize)
        } else if (brightness > 100 && brightness < 180) {
          fill(225, 255, b + 30);
          textSize(28);
          text('好', x, y);
        } else {
          fill(r, g, b);
          textSize(28);
          text('嗯', x, y);
        }
      }
    }
  }
  pop();
}

function mirrorChloe() {
  clear();
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
  // if ((unixDT > unixSunrise) && (unixDT < unixSunset)) {
  //   fill('yellow');
  //   ellipse(capture.width / 5, capture.height / 5, 30, 30);
  // } else {
  //   fill('white');
  //   ellipse(capture.width / 5, capture.height / 5, 20, 20);
  // }

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

        //const shapeThreshold = map(mouseX, 0, windowWidth, 0, 255);
        const shapeThreshold = 100;

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

function mirrorJun() {
  let capture = setCapture(0);

  background(0);
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

        fill(r, g, b);
        //smooth();

        if (brightness > 150) {
          ellipse(x, y, stepSize / 4, stepSize);
        } else {
          ellipse(x, y, stepSize, stepSize / 4)
        }
      }
    }
  }
  pop();
}

function mirrorLula() {
  let capture = setCapture(0);

  background(255);
  const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
  const scaledHeight = capture.height * scaleRatio;
  const scaledWidth = capture.width * scaleRatio;

  push()
  translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
  scale(scaleRatio, scaleRatio);

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

        const size = map(brightness, 0, 255, stepSize / 4, stepSize * 10);
        noFill();
        stroke //(r, g, b);

        ellipse(x, y, size, brightness) //stepSize brightness
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

  background(100, 0, 100);
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

function mirrorReid() {

  let capture = setCapture(0);

  background(255);
  const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
  const scaledHeight = capture.height * scaleRatio;
  const scaledWidth = capture.width * scaleRatio;

  push()
  translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
  scale(scaleRatio, scaleRatio);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();
    translate(capture.width, 0);
    scale(-1, 1);
    image(capture, 0, 0)
    pop()

    const stepSize = capture.height / 5;

    for (let y = stepSize; y < capture.height - (capture.height / 5); y += stepSize) {
      for (let x = 220; x < capture.width - (3*capture.height / 5); x += stepSize) {
        const index = (capture.width - x + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        const size = map(brightness, 0, 255, stepSize / 4, stepSize);
        strokeWeight(5);
        stroke(255);
        fill(r, g, b);

        rect(x, y, stepSize, stepSize)
      }
    }
  }
  pop();
}

function mirrorTheo() {

  let capture = setCapture(0);

  background(30, 30, 30);
  const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
  const scaledHeight = capture.height * scaleRatio;
  const scaledWidth = capture.width * scaleRatio;

  push()
  translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
  scale(scaleRatio, scaleRatio);

  // rectMode(CENTER)

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    // mirror 0
    let stepSize = 20;
    for (let y = 0; y < capture.height; y += stepSize) {
      for (let x = 0; x < capture.width; x += stepSize) {
        const index = (capture.width - x + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        fill(0, brightness, 0);
        //const threshold = map(mouseX, 0, windowWidth, 0, 255);
        const threshold = 127;
        const size = map(brightness, 0, 255, 10, 100);
        if (brightness > threshold) {
          ellipse(x, y, size, size)
        } else {
          rect(x, y, size, size)
        }
      }
    }

    // mirror 2
    stepSize = 40;
    for (let y = 0; y < capture.height; y += stepSize) {
      for (let x = 0; x < capture.width; x += stepSize) {
        const index = (capture.width - x + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        line(x, y, capture.width / 2, capture.height + 40)

        textSize(brightness / 5)
        fill(0, 255, 0);
        text("01", x, y);
      }
    }
  }
  pop();
}

function mirrorZechen() {

  clear();
  let capture = setCapture(0);

  const scaleRatio = min(windowWidth / capture.width, windowHeight / capture.height);
  const scaledHeight = capture.height * scaleRatio;
  const scaledWidth = capture.width * scaleRatio;

  push()
  translate((windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2);
  scale(scaleRatio, scaleRatio);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    // mirror 3
    let stepSize;

    stepSize = 20;

    for (let y = stepSize / 2; y < capture.height; y += stepSize) {
      for (let x = stepSize / 2; x < capture.width; x += stepSize) {
        const index = (capture.width - x + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 2;

        noStroke();

        fill(226, 94, 110)

        textAlign(CENTER, TOP);
        textSize(brightness / 10)

        if (brightness > 100 && brightness < 200) {
          text("De", x, y)
        } else if (brightness > 20 && brightness < 100) {
          text("Ja", x, y)
        } else {
          text("Vu", x, y)
        }
      }

      // mirror 4

      stepSize = 40;

      for (let y = stepSize / 2; y < capture.height; y += stepSize) {
        for (let x = stepSize / 2; x < capture.width; x += stepSize) {
          const index = (capture.width - x + y * capture.width) * 4;

          const r = capture.pixels[index];
          const g = capture.pixels[index + 1];
          const b = capture.pixels[index + 2];
          const brightness = (r + g + b) / 2;

          rectMode(CENTER);
          if (brightness > 100) {
            fill(255, 174, 113, 20)
          } else {
            fill(227, 169, 234, 20)
          }
          rect(x, y, brightness / 4, brightness / 4)
        }
      }

      // mirror 5
      stepSize = 40;

      for (let y = stepSize / 2; y < capture.height; y += stepSize) {
        for (let x = stepSize / 2; x < capture.width; x += stepSize) {
          const index = (capture.width - x + y * capture.width) * 4;

          const r = capture.pixels[index];
          const g = capture.pixels[index + 1];
          const b = capture.pixels[index + 2];
          const brightness = (r + g + b) / 2;

          if (brightness < mouseX) {
            ellipse(x, y, brightness / 10, brightness / 10)
          }
        }
      }
    }
    pop();
  }
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
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

// function mousePressed() {
//   let fs = fullscreen();
//   fullscreen(!fs);
// }

function setCapture(num) {
  currentCapture = num;
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
    case 3:
      capture = capture3;
      break;
  }

  return capture;
}