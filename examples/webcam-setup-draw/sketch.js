// Webcam Setup Draw
// Create a webcam feed and draw it to the Canvas (useful for when we're directly pixels from the camera feed)

const cam_w = 640;
const cam_h = 480;
let capture;

function setup() {
    createCanvas(cam_w, cam_h);
    capture = createCapture(VIDEO);
    capture.size(cam_w, cam_h);
    capture.hide();
}

function draw() {

    // mirror the webcam
    push()
        translate(width, 0);
        scale(-1, 1);
        image(capture, 0, 0);
    pop();
}