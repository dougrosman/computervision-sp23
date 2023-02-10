// Rozin Mirror

let sketchCounter = 0;

const cam0_w = 1280;
const cam0_h = 720;

const cam1_w = 720;
const cam1_h = 720;

const constraints0 = {
  video: {
    mandatory: {
      minWidth: cam0_w,
      minHeight: cam0_h,
      minFrameRate: 60
    },
  },
  audio: false
};

const constraints1 = {
  video: {
    mandatory: {
      minWidth: cam1_w,
      minHeight: cam1_h,
      minFrameRate: 60
    },
  },
  audio: false
};

// 16:9
let capture0;

// 4:3
let capture1;

let currentCapture = 0;

let mode = 0;
const numModes = 11;
let autoToggle = true;
let toggleTime = 30000;
let updateCard = true;

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


function preload() {
  let url =
    "https://api.openweathermap.org/data/2.5/weather?lat=41.878113&lon=-87.629799&appid=87fb783a54817f1793f0556477730e7c";
  weatherData = loadJSON(url);
  blockImage = loadImage("images/MinecraftDiamonds@16.png");
}

function setup() {
  createCanvas(1280, 720);
  background(0);
  pixelDensity(1);

  capture0 = createCapture(constraints0, function(stream){
    console.log(stream);
  });
  //capture0.size(cam0_w, cam0_h);
  capture0.hide();

  capture1 = createCapture(constraints1, function(stream){
    console.log(stream);
  });
  capture1.size(cam1_w, cam1_h);
  capture1.hide();

  /////// Chloe
  readMinecraftBlockColors();

  /////// Emris
  parseData();

  bgVal = map(minute(), 0, 60, 0, 255);
  h = hour();
  currentH = h;
}

function draw() {
  const d = new Date();
  let hour = d.getHours();
  if(hour < 6 || hour > 22) {
    // slow down at night to save a lil power :)
    nightMode.style.display = "grid"
    frameRate(0.05)
  } else {
    frameRate(60);
    nightMode.style.display = "none";
  }

  switch (mode) {
    case 0:
      mirrorAnnie(0);
      break;
    case 1:
      mirrorChloe(1);
      break;
    case 2:
      mirrorEmris(0);
      break;
    case 3:
      mirrorErnest(0);
      break;
    case 4:
      mirrorJun(0);
      break;
    case 5:
      mirrorLula(0);
      break;
    case 6:
      mirrorMeadow(1);
      break;
    case 7:
      mirrorNicole(0);
      break;
    case 8:
      mirrorReid(0);
      break;
    case 9:
      mirrorTheo(0);
      break;
    case 10:
      mirrorZechen(0);
      break;
  }

  if (autoToggle) {
    // deltaTime is time between frames, so dTime accounts for time elapsed, independent of framefrate
    dTime += deltaTime

    if (dTime >= toggleTime) {
      updateCard = true;
      mode = (mode + 1) % numModes;
      console.log(mode)
      // console.log(dTime)
      dTime = 0;
      sketchCounter++;
      clear();
    }
    if (sketchCounter == numModes * 3) {
      window.location.href = window.location.href;
    }
  }
}

function mirrorAnnie(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Annie Hu");
  }
  let capture = setCapture(webcamDimensions);
  background(0);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();
    const stepSize = 28;
    for (let y = stepSize / 2; y < capture.height; y += stepSize) {
      for (let x = stepSize / 2; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        // const threshold = map(mouseX, 0, 640, 0, 255);
        // const size = map(brightness, 0, 255, 10, 100);

        textAlign(CENTER, CENTER)
        if (brightness > 180 && brightness < 250) {
          textSize(stepSize);
          fill(r - 20, g - 20, b - 20);
          text('行', x, y);
          // ellipse(x, y, stepSize, stepSize)
        } else if (brightness > 100 && brightness < 180) {
          fill(225, 255, b + 30);
          textSize(stepSize);
          text('好', x, y);
        } else {
          fill(r, g, b);
          textSize(stepSize);
          text('嗯', x, y);
        }
      }
    }
    pop();
  }
}

function mirrorChloe(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Chloe Thompson");
  }
  let capture = setCapture(webcamDimensions);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();
    translate((width - capture.width) / 2, 0)

    const stepSize = 32;
    for (let y = 0; y < capture.height; y += stepSize) {
      for (let x = 0; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

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

        square(x, y, stepSize)
        distances = [];
      }
    }
    pop();
  }
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

function mirrorEmris(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Emris Brandt");
  }
  let capture = setCapture(webcamDimensions);

  bgVal = map(minute(), 0, 60, 0, 255);
  background(bgVal / 1.5, 0, bgVal, 10);

  h = hour();
  if (currentH != h) {
    parseData();
    currentH = h;
  }

  capture.loadPixels();
  if (capture.pixels.length > 0) {
    
    push();
    textAlign(LEFT, TOP);
    const stepSize = 20;
    for (let y = stepSize / 2; y < capture.height; y += stepSize) {
      for (let x = stepSize / 2; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        if (x % 3 == 0) {
          fill(bgVal, 255 - bgVal, 255 - bgVal, 255 - brightness * 3);
          textSize(stepSize*.65);
          text(currentWeather, x - (bgVal / 2), y - (bgVal / 2));
        }
        
        const size = map(brightness, 0, 255, stepSize, stepSize * 3);
        noStroke();
        fill((r + b) / 2, 0, b, 255 - brightness * 2);

        ellipse(x, y, size * 4, size / 3);
      }
    }
    pop();
  }
}

function parseData() {
  currentWeather = weatherData.weather[0].description;
  unixDT = weatherData.dt;
  unixSunrise = weatherData.sunrise;
  unixSunset = weatherData.sunset;
}

function mirrorErnest(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Ernest Strauhal");
  }
  let capture = setCapture(webcamDimensions);

  background(0, 0, 255);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();
    const stepSize = 26;
    for (let y = 0; y < capture.height; y += stepSize) {
      for (let x = 0; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

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
    pop();
  }
}

function mirrorJun(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Hyung Jun Park");
  }
  let capture = setCapture(webcamDimensions);

  background(0);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();
    const stepSize = 30;
    for (let y = stepSize / 2; y < capture.height; y += stepSize) {
      for (let x = stepSize / 2; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        fill(r, g, b);
        rectMode(CENTER);
        noStroke();

        if (brightness > 150) {
          ellipse(x, y, stepSize / 4, stepSize);
        } else {
          ellipse(x, y, stepSize, stepSize / 4)
        }
      }
    }
    pop();
  }
}

function mirrorLula(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Lula Asplund");
  }
  let capture = setCapture(webcamDimensions);

  background(255);
  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();
    const stepSize = 26;
    for (let y = stepSize / 2; y < capture.height; y += stepSize) {
      for (let x = stepSize / 2; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        const size = map(brightness, 0, 255, stepSize / 4, stepSize * 10);
        noFill();
        stroke(0) //(r, g, b);

        ellipse(x, y, size, brightness) //stepSize brightness
      }
    }
    pop();
  }
}

function mirrorMeadow(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Meadow Favuzzi");
  }
  let capture = setCapture(webcamDimensions);

  background(100, 100, 255);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();
    translate((width - capture.width) / 2, 0)
    const stepSize = 20;
    for (let y = stepSize / 2; y < capture.height; y += stepSize) {
      for (let x = stepSize / 2; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (10 + g + b) / 2.4;

        noStroke();
        fill(r, g, 255);

        if (brightness > 230) {
          square(y, x, 0, 0);
        } else {
          square(y, x, stepSize, 10);
        }

        ellipse(x, y, stepSize, stepSize);
      }
    }
    pop();
  }
}

function mirrorNicole(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Nicole Javellana");
  }
  let capture = setCapture(webcamDimensions);

  background(100, 0, 100);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();
    const stepSize = 70;
    for (let y = 0; y < capture.height; y += stepSize) {
      for (let x = 0; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        const size = map(brightness, 0, 255, stepSize / 5, stepSize);

        stroke(r, g, b);
        strokeWeight(10);
        fill(r * 2, brightness, 255);

        blendMode(HARD_LIGHT);
        rect(x, y, size * 3, size * 2);
        textSize(brightness / 1.8);
        fill(180, brightness, 200);
        text("nikita", x, y);
      }
    }
    pop();
  }
}

function mirrorReid(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Reid Arowood");
  }
  let capture = setCapture(webcamDimensions);


  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();
    translate(capture.width, 0);
    scale(-1, 1);
    image(capture, 0, 0)
    pop()
    
    

    push();
    const stepSize = capture.height / 5;
    for (let y = stepSize; y < capture.height - (capture.height / 5); y += stepSize) {
      for (let x = 424; x < capture.width - (3 * capture.height / 5); x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];

        strokeWeight(5);
        stroke(255);
        fill(r, g, b);
        rectMode(CORNER);
        rect(x, y, stepSize, stepSize)
      }
    }
    pop();
  }
}

function mirrorTheo(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Theo Wu");
  }
  let capture = setCapture(webcamDimensions);

  background(30, 30, 30);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();

    // mirror 0
    let stepSize = 30;
    for (let y = stepSize/2; y < capture.height; y += stepSize) {
      for (let x = stepSize/2; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        fill(0, brightness, 0);
        //const threshold = map(mouseX, 0, windowWidth, 0, 255);
        const threshold = 127;
        const size = map(brightness, 0, 255, 10, 50);
        stroke(0);
        if (brightness > threshold) {
          ellipse(x, y, size, size)
        } else {
          rect(x, y, size, size)
        }
      }
    }

    // mirror 2
    stepSize = 60;
    for (let y = 0; y < capture.height; y += stepSize) {
      for (let x = 0; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 3;

        stroke(0)
        strokeWeight(1);
        line(x, y, capture.width / 2, capture.height)

        textSize(brightness / 5)
        fill(0, 255, 0);
        text("01", x, y);
      }
    }
    pop();
  }
}

function mirrorZechen(webcamDimensions) {
  if(updateCard){
    updateTitleCard("Zechen Li");
  }
  background(20, 20, 20);
  let capture = setCapture(webcamDimensions);

  capture.loadPixels();
  if (capture.pixels.length > 0) {

    push();

    // mirror 3
    let stepSize = 30;
    for (let y = stepSize / 2; y < capture.height; y += stepSize) {
      for (let x = stepSize / 2; x < capture.width; x += stepSize) {
        const index = ((capture.width - x) + y * capture.width) * 4;

        const r = capture.pixels[index];
        const g = capture.pixels[index + 1];
        const b = capture.pixels[index + 2];
        const brightness = (r + g + b) / 2;

        noStroke();

        fill(226, 94, 110)

        textAlign(CENTER, TOP);
        textSize(brightness / 5)

        if (brightness > 100 && brightness < 200) {
          text("De", x, y)
        } else if (brightness > 20 && brightness < 100) {
          text("Ja", x, y)
        } else {
          text("Vu", x, y)
        }
      }

      // mirror 4
      stepSize = 60;

      for (let y = stepSize / 2; y < capture.height; y += stepSize) {
        for (let x = stepSize / 2; x < capture.width; x += stepSize) {
          const index = ((capture.width - x) + y * capture.width) * 4;

          const r = capture.pixels[index];
          const g = capture.pixels[index + 1];
          const b = capture.pixels[index + 2];
          const brightness = (r + g + b) / 3;
          
          rectMode(CENTER);
          fill(227, 169, 234, 20)
          if (brightness > 120) {
            fill(255, 174, 113, 20)
          }
          rect(x, y, brightness / 2, brightness / 2);
          ellipse(x, y, brightness / 6, brightness / 6)
        }
      }
      pop();
    }
  }
}


// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function keyPressed() {
  clear();
  updateCard = true;
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

function updateTitleCard(name) {
  let newElement = titleCard.cloneNode(true);
  titleCard.parentNode.replaceChild(newElement, titleCard);
  titleCard.textContent = name;
  updateCard = false;
}

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
  }

  return capture;
}