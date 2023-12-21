const constraints = {
 video: {
  width: { ideal: 1280 },
  height: { ideal: 720 },
  frameRate: { ideal: 30 },
 },
 audio: true,
};

export const videoTransportParams = {
 encoding: [
  {
   rid: "r0",
   maxBitrate: 100000,
   scalabiltyMode: "S1T3",
  },
  {
   rid: "r1",
   maxBitrate: 300000,
   scalabiltyMode: "S1T3",
  },
  {
   rid: "r2",
   maxBitrate: 900000,
   scalabiltyMode: "S1T3",
  },
 ],
 codecOptions: {
  videoGoogleStartBitrate: 1000,
 },
};
export const audioTransportParams = {
 encoding: [
  {
   rid: "r0",
   maxBitrate: 100000,
   scalabiltyMode: "S1T3",
  },
  {
   rid: "r1",
   maxBitrate: 300000,
   scalabiltyMode: "S1T3",
  },
  {
   rid: "r2",
   maxBitrate: 900000,
   scalabiltyMode: "S1T3",
  },
 ],
};

export const getMediaStream = async () => {
 let localStream = await navigator.mediaDevices.getUserMedia(constraints);

 return localStream;
};
