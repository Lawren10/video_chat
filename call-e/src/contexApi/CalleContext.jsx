/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const calleContext = createContext();

const CalleContext = ({ children }) => {
  let [videoControl, setVideoControl] = useState(false);
  let [audioControl, setAudioControl] = useState(false);
  let [dropCall, setDropCall] = useState(false);
  let [shareScreen, setShareScreen] = useState(false);
  let [raiseHand, setRaiseHand] = useState(false);
  let [participant, setParticipant] = useState(false);
  let [showChat, setShowChat] = useState(false);

  let [meetingVidNum, setMeetingVidNum] = useState(3);

  const setCameraState = () => {
    setVideoControl(!videoControl);
  };

  const setAudioState = () => {
    setAudioControl(!audioControl);
  };

  const setParticipantState = () => {
    setParticipant(!participant);
  };

  const setShowChatState = () => {
    setShowChat(!showChat);
  };

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
