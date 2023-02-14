
let sketch = function(p) {


  p.setup = function() {
    p.createCanvas(cam_w, cam_h, p.WEBGL);
    p.setAttributes({alpha: true})
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
    
    for(let i = 0; i < detections.multiHandLandmarks.length; i++) {
      for(let j = 0; j < detections.multiHandLandmarks[i].length; j++) {
        const x = detections.multiHandLandmarks[i][j].x * p.width;
        const y = detections.multiHandLandmarks[i][j].y * p.height;
        const z = detections.multiHandLandmarks[i][j].z;
        
        const size = p.map(z, -0.6, 0, 50, 2)
        p.strokeWeight(size);
        p.point(x, y, z);
      }
    }
  }
}

let myp5 = new p5(sketch)