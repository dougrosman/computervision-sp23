let sketch = function(p) {


  p.setup = function() {
    p.createCanvas(cam_w, cam_h);
  }

  p.draw = function() {
    p.clear(0);

    console.log(detections);

    if(detections != undefined) {
      if(detections.detections != undefined) {
        
        p.drawFaces();
      }
    }
  }

  p.drawFaces = function() {
    p.stroke(0);
    p.strokeWeight(8);

    for(let i = 0; i < detections.detections.length; i++) {
      for(let j = 0; j < detections.detections[i].landmarks.length; j++) {

        const x = p.width - (detections.detections[i][j].x * p.width)
        const y = (detections.detections[i][j].y * p.height)

        console.log(x, y);
        p.point(x, y);
      }
    }
    
    // for(let i = 0; i < detections.multiHandLandmarks.length; i++) {
    //   for(let j = 0; j < detections.multiHandLandmarks[i].length; j++) {
    //     const x = p.width-(detections.multiHandLandmarks[i][j].x * p.width);
    //     const y = detections.multiHandLandmarks[i][j].y * p.height;
    //     const z = detections.multiHandLandmarks[i][j].z;
     
    //     p.point(x, y, z);
         
        
    //   }
    // }
  }
}

let myp5 = new p5(sketch)