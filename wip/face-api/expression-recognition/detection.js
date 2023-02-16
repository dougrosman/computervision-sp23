async function main() {

  const MODEL_URL = './weights'
  
  await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
  await faceapi.loadFaceLandmarkModel(MODEL_URL)
  await faceapi.loadFaceRecognitionModel(MODEL_URL)
  
  const input = document.getElementById('myImage')
  let fullFaceDescriptions = await faceapi.detectAllFaces(input).withFaceLandmarks().withFaceDescriptors()

  //fullFaceDescriptions = faceapi.resizeResults(fullFaceDescriptions)



faceapi.draw.drawDetections(canvas, fullFaceDescriptions)

faceapi.draw.drawLandmarks(canvas, fullFaceDescriptions)

}

main();