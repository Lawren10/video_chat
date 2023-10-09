/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const calleContext = createContext();

const CalleContext = ({ children }) => {
  let [videoControl, setVideoControl] = useState(false);
  let [audioControl, setAudioControl] = useState(false);
  let [meetingVidNum, setMeetingVidNum] = useState(3);

  return (
    <>
      <calleContext.Provider
        value={{
          videoControl,
          setVideoControl,
          audioControl,
          setAudioControl,
          meetingVidNum,
          setMeetingVidNum,
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
