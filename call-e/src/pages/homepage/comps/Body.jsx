/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
 PiMicrophoneFill,
 PiMicrophoneSlashFill,
 PiVideoCameraFill,
 PiVideoCameraSlashFill,
 PiPhoneFill,
} from "react-icons/pi";
import { useCalleContextValues } from "../../../contexApi/CalleContext";
import {
 loadMediaTracks,
 loadRouterRtpCapablities,
 createProducerTransportandProduce,
 createConsumerTransport,
 consumeServerStream,
} from "../../../utils/eventControlFunctions";

const Body = () => {
 let {
  videoControl,
  audioControl,
  setCameraState,
  setAudioState,
  calleSocket,
  localPeerCredentials,
  localMediaStream,
  localStreamDevice,
  localStreamProducers,
  remoteStreamConsumers,
  setRemotePeers,
 } = useCalleContextValues();

 let navigate = useNavigate();
 let [showField, setShowField] = useState(false);
 let [showvideo, setShowVideo] = useState(false);
 let [roomId, setRoomId] = useState("");
 let [roomIdError, setRoomIdError] = useState(false);
 let videoRef = useRef();

 //handle room id update function
 const updateRoomId = (e) => {
  if (roomIdError === true) {
   setRoomIdError(false);
  }
  setRoomId(e.target.value);
 };

 // create room function
 const createRoom = async () => {
  console.log("creating room");
  console.log("from create room", localPeerCredentials.current);

  // load the device with server rtpcapabilities
  calleSocket.on("loadRouterRtpCapablities", (serverRouterRtpCapabilities) => {
   loadRouterRtpCapablities(
    serverRouterRtpCapabilities,
    localStreamDevice,
    calleSocket
   );
  });

  calleSocket.on("createClientProducerTransport", async (params) => {
   await createProducerTransportandProduce(
    calleSocket,
    localStreamDevice,
    localStreamProducers,
    localPeerCredentials.current["roomId"],
    navigate,
    params,
    true
   );
  });

  calleSocket.on("createClientConsumerTransport", (params, peerToConnectId) => {
   createConsumerTransport(
    calleSocket,
    localStreamDevice,
    remoteStreamConsumers,
    params,
    peerToConnectId
   );
  });

  calleSocket.on("consumeStream", async (param) => {
   await consumeServerStream(
    calleSocket,
    remoteStreamConsumers,
    setRemotePeers,
    navigate,
    param,
    videoControl,
    audioControl
   );
  });

  calleSocket.on("new peer joined", (id) => {
   calleSocket.emit("createServerConsumerTransport", id);
  });
  calleSocket.emit(
   "create room",
   "createRoom",
   localPeerCredentials.current.username
  );
 };

 // join room function
 const joinRoom = () => {
  if (roomId === "") {
   setRoomIdError(true);
   return;
  }

  // load the device with server rtpcapabilities
  calleSocket.on("loadRouterRtpCapablities", (serverRouterRtpCapabilities) => {
   loadRouterRtpCapablities(
    serverRouterRtpCapabilities,
    localStreamDevice,
    calleSocket
   );
  });

  calleSocket.on("createClientProducerTransport", async (params) => {
   await createProducerTransportandProduce(
    calleSocket,
    localStreamDevice,
    localStreamProducers,
    localPeerCredentials.current["roomId"],
    navigate,
    params,
    false
   );
  });

  calleSocket.on("createClientConsumerTransport", (params, peerToConnectId) => {
   createConsumerTransport(
    calleSocket,
    localStreamDevice,
    remoteStreamConsumers,
    params,
    peerToConnectId
   );
  });

  calleSocket.on("consumeStream", async (param) => {
   await consumeServerStream(
    calleSocket,
    remoteStreamConsumers,
    setRemotePeers,
    navigate,
    param,
    videoControl,
    audioControl
   );
  });

  calleSocket.on("roomId-error", () => {
   setRoomIdError(true);
  });

  calleSocket.on("new peer joined", (id) => {
   calleSocket.emit("createServerConsumerTransport", id);
  });

  calleSocket.on("get all connected peer", (socketIds) => {
   socketIds.forEach((peerId) => {
    calleSocket.emit("createServerConsumerTransport", peerId);
   });
  });

  calleSocket.emit(
   "join room",
   "joinRoom",
   roomId,
   localPeerCredentials.current.username
  );
 };

 useEffect(() => {
  loadMediaTracks(localMediaStream, videoRef, setShowVideo);
 }, [localMediaStream]);

 return (
  <>
   <section className="w-full h-[100%] grid place-items-center">
    {/* container with blured background */}
    <div className="homeBodyInnerBox">
     {/* container for initial video display, picture and video controls */}
     <div className="relative h-[24rem] rounded-md overflow-hidden">
      <img
       src="/assets/videochat.jpg"
       alt="video chat image"
       className={`w-full h-full rounded-md object-cover mb-4 ${
        showvideo ? "hidden" : "block"
       }`}
      />

      <video
       autoPlay
       className={`w-full h-full rounded-md ${showvideo ? "block" : "hidden"}`}
       ref={videoRef}
      />

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8">
       <button
        className={`controlBtn ${
         videoControl ? "" : "border-red-500 text-red-500"
        }`}
        onClick={() => {
         setCameraState(false);
        }}
       >
        {videoControl ? <PiVideoCameraFill /> : <PiVideoCameraSlashFill />}
       </button>

       <button
        className={`controlBtn ${
         audioControl ? "" : "border-red-500 text-red-500"
        }`}
        onClick={() => {
         setAudioState(false);
        }}
       >
        {audioControl ? <PiMicrophoneFill /> : <PiMicrophoneSlashFill />}
       </button>
      </div>
     </div>

     {/* buttons for making and joing call */}

     <div className="flex gap-4 my-8">
      <button
       className="primaryBtn"
       onClick={() => {
        setShowField(!showField);
       }}
      >
       <PiVideoCameraFill /> Join Meeting
      </button>
      <button className="greenBtn" onClick={createRoom}>
       <PiVideoCameraFill /> New Meeting
      </button>
     </div>

     <div className={`${showField ? "animateInview" : "animateOutview"}`}>
      <p className="text-calle-black font-bold text-lg">
       Provide the meeting room name or id.
      </p>
      <div className="flex gap-2">
       <input
        type="text"
        className="rounded p-3 bg-slate-200 outline-calle-btn-bg w-full text-calle-black"
        value={roomId}
        onChange={updateRoomId}
       />
       <button className="primaryBtn" onClick={joinRoom}>
        <PiPhoneFill />
       </button>
      </div>
      <small
       className={`text-red-500 text-sm font-medium ${
        roomIdError ? "opacity-1" : "opacity-0"
       } `}
      >
       you need a meeting room name or id to join a meeting or the meeting id
       provided is wrong.
      </small>
     </div>
    </div>
   </section>
  </>
 );
};

export default Body;
