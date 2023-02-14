// a note about z (or, the depth). So, depth is not measuring distance from screen. rather, z is a relative measure of where your digit keypoints are relative to your palm. The palm is always set to z = 0, and the other keypoints z values range from -1 to 1 (although in reality this is usually between -0.5 and 0.5. Negative keypoint values indicate that a keypoint is IN FRONT OF the palm relative to the screen. Positive keypoint values, by contrast, indicate that a keypoint is BEHIND the palm relative to the screen). This is helpful for determining hand position I guess, but if you want to see how close or far a hand is from the screen, you'd need to either calculate the distance between two keypoints, or use some depth sensing tricks.

// 


let sketch = function(p) {

  let font;

  p.preload = function() {
    font = p.loadFont("Poppins-Medium.ttf");
  }

  p.setup = function() {
    p.createCanvas(cam_w, cam_h, p.WEBGL);
    p.setAttributes({alpha: true})
    p.textFont(font);
    p.textSize(16)
  }

  p.draw = function() {
    p.clear(0);
    p.translate(-p.width/2, -p.height/2);

    if(detections != undefined) {
      if(detections.multiHandLandmarks != undefined) {
        p.drawHands();
      }
    }
  }

  p.drawHands = function() {
    p.stroke(0);
    p.strokeWeight(8);

    
    
    
    for(let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for(let j = 0; j < detections.multiHandLandmarks[i].length; j++) {
        const x = p.width-(detections.multiHandLandmarks[i][j].x * p.width);
        const y = detections.multiHandLandmarks[i][j].y * p.height;
        const z = detections.multiHandLandmarks[i][j].z;
        
        // const size = p.map(z, -0.6, 0, 50, 2)
        // p.strokeWeight(size);
        p.point(x, y, z);

        // p.push();
        // p.translate(p.width-x, y)
        // p.scale(-1, 1)
        p.text(z.toFixed(3), x, y, z);
        // p.pop();

        if(j == 9 || j == 13) {
          const palm1 = detections.multiHandLandmarks[0][9]
          const palm2 = detections.multiHandLandmarks[0][13]
      
          const palm1Pos = p.createVector(palm1.x, palm1.y);
          const palm2Pos = p.createVector(palm2.x, palm2.y);
      
          const distance = palm1Pos.dist(palm2Pos)
      
          console.log(distance);
        }
         
        
      }
    }
  }
}

let myp5 = new p5(sketch)