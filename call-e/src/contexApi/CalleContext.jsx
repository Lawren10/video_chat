/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, useRef } from "react";

const calleContext = createContext();
import { calleSocket, initMediaDevice } from "../utils/mediaSocket";
import {
 saveRoomId,
 iconButtonControl,
 addRemoteChatBroadCast,
 updateScreenSharingUi,
} from "../utils/eventControlFunctions";

const CalleContext = ({ children }) => {
 let [videoControl, setVideoControl] = useState(true);
 let [audioControl, setAudioControl] = useState(true);
 let [dropCall, setDropCall] = useState(false);
 let [shareScreen, setShareScreen] = useState(false);
 let [raiseHand, setRaiseHand] = useState(false);
 let [participant, setParticipant] = useState(false);
 let [showChat, setShowChat] = useState(false);
 let [remotePeers, setRemotePeers] = useState([]);
 let [nowSharing, setNowSharing] = useState(null);

 let localPeerCredentials = useRef();
 let localMediaStream = useRef();
 let localStreamDevice = useRef();
 let localStreamProducers = useRef();
 let remoteStreamConsumers = useRef();
 let chatMessageInput = useRef();
 let chatMessageBox = useRef();
 let chatUpdate = useRef();

 const setCameraState = (inMeeting) => {
  setVideoControl((prevstate) => {
   if (inMeeting) {
    calleSocket.emit("cameraState", calleSocket.id, !prevstate);
   }

   localMediaStream.current.getVideoTracks()[0].enabled = !prevstate;
   return !prevstate;
  });
 };

 const setAudioState = (inMeeting) => {
  setAudioControl((prevstate) => {
   if (inMeeting) {
    calleSocket.emit("audioState", calleSocket.id, !prevstate);
   }
   localMediaStream.current.getAudioTracks()[0].enabled = !prevstate;
   return !prevstate;
  });
 };

 const updateAftersharingScreen = () => {
  calleSocket.emit("cameraState", calleSocket.id, videoControl);
  calleSocket.emit("audioState", calleSocket.id, audioControl);
  localMediaStream.current.getVideoTracks()[0].enabled = videoControl;
  localMediaStream.current.getAudioTracks()[0].enabled = audioControl;
  setNowSharing(null);
 };

 const setRaiseHandState = () => {
  calleSocket.emit("raiseHand", calleSocket.id, !raiseHand);
  setRaiseHand(!raiseHand);
 };

 const setParticipantState = () => {
  if (showChat) {
   setShowChat(!showChat);
  }
  setParticipant(!participant);
 };

 const setShowChatState = () => {
  if (participant) {
   setParticipantState(!participant);
  }
  setShowChat(!showChat);
 };

 calleSocket.on("connect", () => {
  localPeerCredentials.current = {
   socketId: calleSocket.id,
  };
  //save room id on the client credientials object.
  calleSocket.on("saveRoomId", saveRoomId(localPeerCredentials));

  console.log("client-socket connected", localPeerCredentials.current);
 });

 useEffect(() => {
  localStreamProducers.current = {};
  remoteStreamConsumers.current = {};
  chatUpdate.current = 0;

  // initialize device for streaming media
  localStreamDevice.current = initMediaDevice();
  console.log("handlerName", localStreamDevice.current.handlerName);

  calleSocket.on("updateRaiseHand", (id, state) => {
   let iconElement = document.getElementById(`${id}-raiseHand`);
   if (state === true) {
    iconElement.classList.replace("icon-hide", "icon-show");
   } else {
    iconElement.classList.replace("icon-show", "icon-hide");
   }
  });

  calleSocket.on("updateCameraState", (id, state) => {
   let iconElement = document.getElementById(`${id}-camera`);
   let participantCameraActive = document.getElementById(`${id}-cameraActive`);
   let participantCameraInActive = document.getElementById(
    `${id}-cameraInActive`
   );

   iconButtonControl(
    state,
    iconElement,
    participantCameraActive,
    participantCameraInActive
   );
  });

  calleSocket.on("updateAudioState", (id, state) => {
   let iconElement = document.getElementById(`${id}-mic`);
   let participantMicActive = document.getElementById(`${id}-micActive`);
   let participantMicInActive = document.getElementById(`${id}-micInActive`);
   iconButtonControl(
    state,
    iconElement,
    participantMicActive,
    participantMicInActive
   );
  });

  calleSocket.on("broadcastMessage", (userName, message) => {
   chatUpdate.current++;
   if (chatUpdate.current > 1) {
    chatUpdate.current = 0;
    return;
   }

   addRemoteChatBroadCast(chatMessageBox.current, userName, message);
  });

  calleSocket.on("userSharingScreen", (id) => {
   console.log("now sharing id", id);
   updateScreenSharingUi(remotePeers);
   setNowSharing(id);
  });
 }, []);

 return (
  <>
   <calleContext.Provider
    value={{
     nowSharing,
     videoControl,
     audioControl,
     remotePeers,
     setRemotePeers,
     dropCall,
     setDropCall,
     shareScreen,
     setShareScreen,
     raiseHand,
     setRaiseHandState,
     participant,
     setParticipant,
     showChat,
     setShowChat,
     setCameraState,
     setAudioState,
     setParticipantState,
     setShowChatState,
     updateAftersharingScreen,
     localPeerCredentials,
     localMediaStream,
     localStreamDevice,
     localStreamProducers,
     remoteStreamConsumers,
     chatMessageInput,
     chatMessageBox,
     calleSocket,
    }}
   >
    {children}
   </calleContext.Provider>
  </>
 );
};

export const useCalleContextValues = () => {
 return useContext(calleContext);
};

export default CalleContext;
