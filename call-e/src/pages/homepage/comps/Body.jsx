/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect } from "react";
import {
 PiMicrophoneFill,
 PiMicrophoneSlashFill,
 PiVideoCameraFill,
 PiVideoCameraSlashFill,
 PiPhoneFill,
} from "react-icons/pi";
import { useCalleContextValues } from "../../../contexApi/CalleContext";
import { getMediaStream } from "../../../utils/controls";

// import { Link } from "react-router-dom";

const Body = () => {
 let {
  videoControl,
  audioControl,
  setCameraState,
  setAudioState,
  localPeerCredentials,
  calleSocket,
  localMediaStream,
 } = useCalleContextValues();

 let [showField, setShowField] = useState(false);
 let [showvideo, setShowVideo] = useState(false);
 let videoRef = useRef();

 // create room function
 const createRoom = async () => {
  console.log("creating room");

  localMediaStream.current.getTracks().forEach((mediaTrack) => {
   console.log("adding tracks to peer");
   console.log(mediaTrack);
   console.log("local meda track", localMediaStream.current);
   localPeerCredentials.current.addTrack(mediaTrack, localMediaStream.current);
  });

  // localPeerCredentials.current.ontrack = (e) => {
  //  console.log("event form clent ontrack", e);
  // };

  const clientOffer = await localPeerCredentials.current.createOffer();
  console.log("client offer created");
  await localPeerCredentials.current.setLocalDescription(clientOffer);
  console.log("client local discription set");

  localPeerCredentials.current.onicecandidate = (e) => {
   if (e.candidate) {
    console.log("clent candidates", e.candidate);
    calleSocket.emit("sendingClientIceCandidates", {
     iceCanditate: e.candidate,
    });
   } else {
    console.log("no candidates");
    console.log(localPeerCredentials.current.connectionState);
   }
  };

  localPeerCredentials.current.onTrack = (e) => {
   console.log("from remote track", e);
  };

  localPeerCredentials.current.onconnectionstatechange = () => {
   console.log("connection state changing");
  };

  calleSocket.on("sending stream", (stream) => {
   stream.forEach((element) => {
    console.log("track stream", element.id);
   });
  });

  let roomId = `name-id-${calleSocket.id}`;

  // calleSocket.emit("createRoom", {
  //  roomId: roomId,
  //  clientOffer: clientOffer,
  // });

  calleSocket.on("getServerAnswer", async (serverAnswer) => {
   console.log("server answer", serverAnswer);
   const serverCredential = new RTCSessionDescription(serverAnswer);
   await localPeerCredentials.current.setRemoteDescription(serverCredential);
   console.log("server remote answer set");
  });

  calleSocket.on("stream", (stram) => {
   console.log("from streamng", stram);
  });
 };

 useEffect(() => {
  (async function () {
   localMediaStream.current = await getMediaStream();
   // videoRef.current.srcObject = localMediaStream.current;
   // setShowVideo(true);
  })();
 }, []);

 return (
  <>
   {/* {console.log("peer", peer)} */}

   <section className="w-full h-[100%] grid place-items-center">
    {/* container with blured background */}
    <div className="homeBodyInnerBox">
     {/* container for initial video display, picture and video controls */}
     <div className="relative h-[24rem] rounded-md">
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
       <button className="controlBtn" onClick={setCameraState}>
        {videoControl ? <PiVideoCameraSlashFill /> : <PiVideoCameraFill />}
       </button>

       <button className="controlBtn" onClick={setAudioState}>
        {audioControl ? <PiMicrophoneSlashFill /> : <PiMicrophoneFill />}
       </button>
      </div>
     </div>

     {/* buttons for making and joing call */}

     <div className="flex gap-4 my-8">
      <button className="primaryBtn" onClick={() => setShowField(!showField)}>
       <PiVideoCameraFill /> Join Meeting
      </button>
      <button className="greenBtn" onClick={createRoom}>
       <PiVideoCameraFill /> New Meeting
      </button>
     </div>

     {/* input field for joining call  */}
     {/* <Link to={"/meeting"}>New Meeting</Link> */}

     {showField && (
      <div className="">
       <p className="text-calle-black font-bold text-lg">
        Provide the call link below...
       </p>
       <div className="flex gap-2">
        <input
         type="text"
         className="rounded p-3 bg-slate-200 outline-calle-btn-bg w-full text-calle-black"
        />
        <button className="primaryBtn">
         <PiPhoneFill />
        </button>
       </div>
      </div>
     )}
    </div>
   </section>
  </>
 );
};

export default Body;
