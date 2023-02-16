// Face detection with mediapipe
// https://google.github.io/mediapipe/solutions/face_detection.html

let sketch = function (p) {

  let capture;
  p.setup = function () {
    p.createCanvas(cam_w, cam_h);
    capture = p.createCapture(cam_w, cam_h);
    capture.hide();
    p.rectMode(p.CENTER);
  }

  p.draw = function () {
    p.clear(0);

    if (detections != undefined) {
      if (detections.detections != undefined) {
        p.push();
        p.translate(p.width, 0);
        p.scale(-1, 1);
        p.image(capture, 0, 0);
        p.pop();
        p.drawFaces();
        // console.log(detections.detections);
      }
    }
  }

  p.drawFaces = function () {


    for (let i = 0; i < detections.detections.length; i++) {

      // it's not necessary to create this boundingBox variable, but it makes for less typing and neater coder
      const boundingBox = detections.detections[i].boundingBox;
      const bbX = p.width - boundingBox.xCenter * p.width;
      const bbY = boundingBox.yCenter * p.height;
      const bbW = boundingBox.width * p.width;
      const bbH = boundingBox.height * p.height;

      p.strokeWeight(8);
      p.stroke(0, 255, 0);
      p.noFill();
      p.rect(bbX, bbY, bbW, bbH);

      p.stroke(0, 255, 0);

      const leftEye = p.createVector(p.width - detections.detections[0].landmarks[0].x * p.width, detections.detections[0].landmarks[0].y * p.height)

      const rightEye = p.createVector(p.width - detections.detections[0].landmarks[1].x * p.width, detections.detections[0].landmarks[1].y * p.height)

      // p.strokeWeight(40);
      // // p.point(leftEye.x, leftEye.y);
      // // p.point(rightEye.x, rightEye.y);

      // p.push();
      // p.noStroke();
      // p.fill(0, 255, 0);
      // const midpoint = p.createVector(p.lerp(rightEye.x, leftEye.x, 0.5), p.lerp(rightEye.y, leftEye.y, 0.5))
      // p.rect(midpoint.x, midpoint.y, 120 + leftEye.x - rightEye.x, 100);
      // p.pop();
    }
  }
}

let myp5 = new p5(sketch)