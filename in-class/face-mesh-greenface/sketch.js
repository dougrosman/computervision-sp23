// Face Mesh with mediapipe
// https://google.github.io/mediapipe/solutions/face_mesh#javascript-solution-api

let sketch = function (p) {



  p.setup = function () {
    p.createCanvas(cam_w, cam_h);
    p.rectMode(p.CENTER);
  }

  p.draw = function () {
    p.clear(0);

    if (detections != undefined) {
      if (detections.multiFaceLandmarks != undefined) {
        if (detections.multiFaceLandmarks.length > 0) {
          p.drawFaceOval();
        }
        // p.drawFaceMeshes();
        //console.log(detections);

      }
    }
  }

  p.drawFaceOval = function () {
    const FACE_OUTLINE = [[10, 338], [338, 297], [297, 332], [332, 284], [284, 251], [251, 389], [389, 356], [356, 454], [454, 323], [323, 361], [361, 288], [288, 397], [397, 365], [365, 379], [379, 378],
    [378, 400], [400, 377], [377, 152], [152, 148], [148, 176], [176, 149], [149, 150], [150, 136], [136, 172], [172, 58], [58, 132], [132, 93], [93, 234], [234, 127], [127, 162], [162, 21], [21, 54], [54, 103], [103, 67], [67, 109], [109, 10]]

    // p.strokeWeight(20);
    p.noStroke();
    p.fill(0, 255, 0)

    for (let i = 0; i < detections.multiFaceLandmarks.length; i++) {
      p.beginShape()
      for (let j = 0; j < FACE_OUTLINE.length; j++) {

        // current face
        const currentFace = detections.multiFaceLandmarks[i];
        //console.log(currentFace);

        // the landmark index I want from the current face
        const currentLandmark = FACE_OUTLINE[j][0];

        const x = p.width - (currentFace[currentLandmark].x * p.width)
        const y = currentFace[currentLandmark].y * p.height;

        p.vertex(x, y);
      }
      p.endShape(p.CLOSE)
    }

  }

  p.drawFaceMeshes = function () {
    p.strokeWeight(2);
    p.stroke(0, 255, 255);

    for (let i = 0; i < detections.multiFaceLandmarks.length; i++) {

      p.fill(244, 0, 0);
      p.beginShape(p.TRIANGLE_STRIP);
      for (let j = 0; j < detections.multiFaceLandmarks[i].length; j++) {

        const currentFace = detections.multiFaceLandmarks[i];
        const x = p.width - currentFace[j].x * p.width;
        const y = currentFace[j].y * p.height;

        p.curveVertex(x, y);

      }
      p.endShape(p.CLOSE);
    }
  }
}

let myp5 = new p5(sketch)