/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect, useRef } from "react";

const calleContext = createContext();
import { calleSocket, initPeerConnection } from "../utils/socket";

const CalleContext = ({ children }) => {
 let [videoControl, setVideoControl] = useState(false);
 let [audioControl, setAudioControl] = useState(false);
 let [dropCall, setDropCall] = useState(false);
 let [shareScreen, setShareScreen] = useState(false);
 let [raiseHand, setRaiseHand] = useState(false);
 let [participant, setParticipant] = useState(false);
 let [showChat, setShowChat] = useState(false);

 let localPeerCredentials = useRef();
 //  let peerSocketId = useRef();

 let [meetingVidNum, setMeetingVidNum] = useState(3);

 const setCameraState = () => {
  setVideoControl(!videoControl);
 };

 const setAudioState = () => {
  setAudioControl(!audioControl);
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

 useEffect(() => {
  calleSocket.on("connect", async () => {
   //  const peerDetails =
   localPeerCredentials.current = await initPeerConnection();

   console.log("connected");
  });
 }, []);

 return (
  <>
   <calleContext.Provider
    value={{
     videoControl,
     audioControl,
     meetingVidNum,
     setMeetingVidNum,
     dropCall,
     setDropCall,
     shareScreen,
     setShareScreen,
     raiseHand,
     setRaiseHand,
     participant,
     setParticipant,
     showChat,
     setShowChat,
     setCameraState,
     setAudioState,
     setParticipantState,
     setShowChatState,
     localPeerCredentials,
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
