const constraints = {
 video: {
  width: { ideal: 1280 },
  height: { ideal: 720 },
  frameRate: { ideal: 30 },
 },
 audio: true,
};

export const getMediaStream = async () => {
 let localStream = await navigator.mediaDevices.getUserMedia(constraints);

 return localStream;
};
