import {
 videoTransportParams,
 audioTransportParams,
 getMediaStream,
 displayMediaOptions,
} from "./mediaControls";

export const loadMediaTracks = async (
 localMediaStream,
 videoRef,
 setShowVideo
) => {
 localMediaStream.current = await getMediaStream();

 videoTransportParams["track"] = localMediaStream.current.getVideoTracks()[0];
 audioTransportParams["track"] = localMediaStream.current.getAudioTracks()[0];

 videoRef.current.srcObject = localMediaStream.current;
 setShowVideo(true);
};

export const shareScreenCaptureStream = async (
 localStreamProducers,
 localMediaStream,
 updateAftersharingScreen,
 calleSocket,
 roomId
) => {
 let screenCapture = await navigator.mediaDevices.getDisplayMedia(
  displayMediaOptions
 );
 let screenCaptureVideo = screenCapture.getVideoTracks()[0];

 screenCaptureVideo.onended = async () => {
  localMediaStream.current = await getMediaStream();
  let localVideo = localMediaStream.current.getVideoTracks()[0];

  await localStreamProducers.current.localVideoProducer.replaceTrack({
   track: localVideo,
  });

  let video = document.getElementById("main");
  video.srcObject = localMediaStream.current;
  updateAftersharingScreen();
  calleSocket.emit("stopScreenSharing", roomId);
 };

 localMediaStream.current.getVideoTracks()[0].enabled = false;

 await localStreamProducers.current.localVideoProducer.replaceTrack({
  track: screenCaptureVideo,
 });

 setTimeout(() => {
  calleSocket.emit("sharingScreen", roomId);
 }, 1000);
};

export const loadRouterRtpCapablities = async (
 serverRouterRtpCapabilities,
 localStreamDevice,
 calleSocket
) => {
 await localStreamDevice.current.load({
  routerRtpCapabilities: serverRouterRtpCapabilities,
 });

 calleSocket.emit("createServerProducer");
};

export const saveRoomId = (localPeerCredentials) => {
 //returning the callback function for handling saving the room id
 return (id) => {
  localPeerCredentials.current["roomId"] = id;
 };
};

export const createProducerTransportandProduce = async (
 calleSocket,
 localStreamDevice,
 localStreamProducers,
 roomId,
 navigate,
 params,
 createRoom
) => {
 let producerTransport = localStreamDevice.current.createSendTransport(params);

 producerTransport.on(
  "connect",
  async ({ dtlsParameters }, callback, errback) => {
   // Signal local DTLS parameters to the server side transport.
   try {
    await calleSocket.emit("sendTransportConnect", {
     transportId: producerTransport.id,
     dtlsParameters: dtlsParameters,
    });

    // Tell the transport that parameters were transmitted.
    callback();
   } catch (error) {
    // Tell the transport that something was wrong.
    errback(error);
   }
  }
 );

 producerTransport.on("connectionstatechange", (connectionState) => {
  if (connectionState === "connected") {
   console.log("client connected to server");
   if (createRoom) {
    navigate("/meeting");
   }
  }
 });

 producerTransport.on("produce", async (parameters, callback, errback) => {
  // Signal parameters to the server side transport and retrieve the id of
  // the server side new producer.
  try {
   await calleSocket.emit(
    "sendTransportProduce",
    roomId,
    {
     transportId: producerTransport.id,
     kind: parameters.kind,
     rtpParameters: parameters.rtpParameters,
     appData: parameters.appData,
    },

    ({ id }) => {
     // Tell the transport that parameters were transmitted and provide it with the
     // server side producer's id.
     callback({ id });
    }
   );
  } catch (error) {
   // Tell the transport that something was wrong.
   errback(error);
  }
 });

 //creating the producer for the video and audio stream

 let localVideoProducer = await producerTransport.produce(videoTransportParams);
 let localAudioProducer = await producerTransport.produce(audioTransportParams);

 localVideoProducer.on("trackended", async () => {
  console.log("track ended");
 });

 localVideoProducer.on("transportclose", () => {
  console.log("transport close");
 });

 localAudioProducer.on("trackended", () => {
  console.log("track ended");
 });

 localAudioProducer.on("transportclose", () => {
  console.log("transport close");
 });

 localStreamProducers.current["localStreamProducerTransport"] =
  producerTransport;
 localStreamProducers.current["localVideoProducer"] = localVideoProducer;
 localStreamProducers.current["localAudioProducer"] = localAudioProducer;
};

export const createConsumerTransport = (
 calleSocket,
 localStreamDevice,
 remoteStreamConsumers,
 params,
 peerToConnectId
) => {
 //  console.log("creating client consumer transport");
 let consumerTransport = localStreamDevice.current.createRecvTransport(params);

 consumerTransport.on(
  "connect",
  async ({ dtlsParameters }, callback, errback) => {
   // Signal local DTLS parameters to the server side transport.
   try {
    await calleSocket.emit(
     "sendConsumerConnect",
     {
      transportId: consumerTransport.id,
      dtlsParameters: dtlsParameters,
     },
     peerToConnectId
    );

    // Tell the transport that parameters were transmitted.
    callback();
   } catch (error) {
    // Tell the transport that something was wrong.
    errback(error);
   }
  }
 );

 consumerTransport.on("connectionstatechange", (connectionState) => {
  if (connectionState === "connected") {
   console.log("connected consumer to server");
  }
 });

 if (!remoteStreamConsumers.current[peerToConnectId]) {
  remoteStreamConsumers.current[peerToConnectId] = {};
 }

 let transportDetails = {
  consumerTransport,
 };

 remoteStreamConsumers.current[peerToConnectId] = transportDetails;

 calleSocket.emit("createConsumerStream", {
  rtpCapabilities: localStreamDevice.current.rtpCapabilities,
  peerToConnectId,
 });
};

export const consumeServerStream = async (
 calleSocket,
 remoteStreamConsumers,
 setRemotePeers,
 navigate,
 param,
 videoControl,
 audioControl
) => {
 let consumerTransport =
  remoteStreamConsumers.current[param.peerToConnectId].consumerTransport;

 let videoConsumer = await consumerTransport.consume(param.videoStreamParam);
 let audioConsumer = await consumerTransport.consume(param.AudioStreamParam);

 remoteStreamConsumers.current[param.peerToConnectId]["videoConsumer"] =
  videoConsumer;

 remoteStreamConsumers.current[param.peerToConnectId]["audioConsumer"] =
  audioConsumer;

 remoteStreamConsumers.current[param.peerToConnectId]["socketUserName"] =
  param.socketUserName;

 calleSocket.emit("resumeConsumerPlayBack", param.peerToConnectId);

 setRemotePeers((prev) => {
  return [...prev, param.peerToConnectId];
 });

 navigate("/meeting");

 setTimeout(() => {
  if (videoControl === false) {
   calleSocket.emit("cameraState", calleSocket.id, false);
  }

  if (audioControl === false) {
   calleSocket.emit("audioState", calleSocket.id, false);
  }
 }, 1000);
};

//events for the button controls

export const iconButtonControl = (state, vidIcon, partActive, partInActive) => {
 if (state === false) {
  vidIcon.classList.replace("icon-hide", "icon-show");
  partActive.classList.replace("opacity-100", "opacity-0");
  partInActive.classList.replace("opacity-0", "opacity-100");
 } else {
  vidIcon.classList.replace("icon-show", "icon-hide");
  partActive.classList.replace("opacity-0", "opacity-100");
  partInActive.classList.replace("opacity-100", "opacity-0");
 }
};

//event function for updating chats

export const addRemoteChatBroadCast = (element, name, message) => {
 element.insertAdjacentHTML(
  "beforeend",
  `
<div class="flex items-start gap-4 mt-4" key={index}>
         <div class="p-4 rounded-md bg-slate-800 "></div>
         <div class="">
          <p class="text-calle-text-color font-extrabold">${name}</p>
          <div class="w-full bg-[#C7DDFF] p-4 rounded-md text-sm">
           ${message}
          </div>
         </div>
        </div>
`
 );
};

export const updateLocalChats = (element, message, socket, roomId) => {
 if (message.value === "") {
  return;
 }

 element.insertAdjacentHTML(
  "beforeend",
  `        <div class="w-full mt-4" key={index}>
         <p class="text-end text-calle-text-color font-extrabold">Me</p>
         <div class=" bg-calle-btn-bg p-4 rounded-md text-sm ml-auto w-5/6 text-slate-200">
          ${message.value}
         </div>
        </div>`
 );

 element.scrollTop = element.scrollHeight;

 socket.emit("chatMessage", message.value, roomId);
 message.value = "";
};
