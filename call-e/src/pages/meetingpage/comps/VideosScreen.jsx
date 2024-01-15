/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { useCalleContextValues } from "../../../contexApi/CalleContext";
import {
 PiMicrophoneSlashFill,
 PiVideoCameraSlashFill,
 PiHandPalmFill,
} from "react-icons/pi";

const VideoScreen = ({ local, peerId, sharingUser }) => {
 let { remoteStreamConsumers, localMediaStream } = useCalleContextValues();

 const displayStream = () => {
  let mediaStream;
  let video = document.getElementById(peerId);

  if (local === true) {
   mediaStream = new MediaStream([
    localMediaStream.current.getVideoTracks()[0],
    localMediaStream.current.getAudioTracks()[0],
   ]);
  }

  if (local === false) {
   mediaStream = new MediaStream([
    remoteStreamConsumers.current[peerId].videoConsumer.track,
    remoteStreamConsumers.current[peerId].audioConsumer.track,
   ]);
  }

  video.srcObject = mediaStream;
 };

 useEffect(() => {
  displayStream();
 }, []);

 return (
  <>
   <div
    className={`videoScreen 

    ${
     peerId === "main" && sharingUser !== null
      ? "absolute w-64 bottom-0 left-4 z-50"
      : ""
    }
    
    `}
   >
    <i
     className={`video-screen-icon absolute top-4 left-4 text-lg text-amber-500 icon-hide`}
     id={`${peerId}-raiseHand`}
    >
     <PiHandPalmFill />
    </i>
    <div className="absolute top-4 right-4">
     <i className={`video-screen-icon icon-hide`} id={`${peerId}-mic`}>
      <PiMicrophoneSlashFill />
     </i>
     <i className={`video-screen-icon icon-hide`} id={`${peerId}-camera`}>
      <PiVideoCameraSlashFill />
     </i>
    </div>

    <video className={`w-full `} autoPlay id={peerId} />

    {peerId !== "main" ? (
     <p className="video-name-box">
      {remoteStreamConsumers.current[peerId].socketUserName}
     </p>
    ) : (
     ""
    )}
   </div>
  </>
 );
};

export default React.memo(VideoScreen);
