// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// https://learn.ml5js.org/#/reference/posenet

/* ===
ml5 Example
PoseNet example using p5.js
=== */

let video;
let poseNet;
let poses = [];
const cam_w = 1280;
const cam_h = 720;

function setup() {
  createCanvas(cam_w, cam_h);
  video = createCapture(VIDEO);
  video.size(cam_w, cam_h);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(video, modelReady);
  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected
  poseNet.on('pose', function (results) {
    poses = results;
  });
  // Hide the video element, and just show the canvas
  // video.hide();
}

function modelReady() {
  select('#status').html('Model Loaded');
}

function draw() {
  clear();

  // We can call both functions to draw all keypoints and the skeletons
  // drawKeypoints();
  // drawSkeleton();

  connectPeople();
}

function connectPeople() {
  //console.log(poses)
  if (poses.length > 1) {

    const pose1 = poses[0].pose;
    const pose2 = poses[1].pose;

    
    let rightWrist = createVector(width-pose1.rightWrist.x, pose1.rightWrist.y)
    let leftWrist = createVector(width-pose2.leftWrist.x, pose2.leftWrist.y)

    strokeWeight(20);
    stroke(255, 0, 0);

    point(rightWrist.x, rightWrist.y)
    point(leftWrist.x, leftWrist.y)

    line(rightWrist.x, rightWrist.y, leftWrist.x, leftWrist.y)
  }
}

// A function to draw ellipses over the detected keypoints
function drawKeypoints() {

  console.log(poses);
  // Loop through all the poses detected
  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse is the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        fill(255, 0, 0);
        noStroke();
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

// A function to draw the skeletons
function drawSkeleton() {
  // Loop through all the skeletons detected
  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      let partA = skeleton[j][0];
      let partB = skeleton[j][1];
      stroke(255, 0, 0);
      line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
    }
  }
}
