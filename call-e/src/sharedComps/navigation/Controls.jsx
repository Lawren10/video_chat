/* eslint-disable no-unused-vars */
import {
 PiMicrophoneFill,
 PiMicrophoneSlashFill,
 PiPhoneSlashFill,
 PiVideoCameraSlashFill,
 PiVideoCameraFill,
 PiHandPalmFill,
 PiUsersFill,
 PiChatTeardropTextFill,
} from "react-icons/pi";
import { MdScreenShare } from "react-icons/md";
import { shareScreenCaptureStream } from "../../utils/eventControlFunctions";

import { useCalleContextValues } from "../../contexApi/CalleContext";
import { useLocation } from "react-router-dom";

const Controls = () => {
 let location = useLocation().pathname;

 let {
  videoControl,
  audioControl,
  dropCall,
  setDropCall,
  shareScreen,
  setShareScreen,
  raiseHand,
  setRaiseHandState,
  participant,
  showChat,
  setCameraState,
  setAudioState,
  setParticipantState,
  setShowChatState,
  localMediaStream,
  localStreamProducers,
 } = useCalleContextValues();

 return (
  <>
   {/* {console.log(location)} */}
   <section
    className={`absolute bottom-8 w-full grid place-items-center ${
     location !== "/meeting" ? "hidden" : "block"
    }`}
   >
    {/* video control buttons */}
    <div className="controlBox">
     <div className="flex items-center gap-4">
      <button
       className={`bottonControlBtn ${
        videoControl ? "bottonControlBtnBg" : "audioVideoBtnBg"
       }`}
       onClick={() => {
        setCameraState(true);
       }}
      >
       {videoControl ? <PiVideoCameraFill /> : <PiVideoCameraSlashFill />}
      </button>
      <button
       className={`bottonControlBtn ${
        audioControl ? "bottonControlBtnBg" : "audioVideoBtnBg"
       }`}
       onClick={() => {
        setAudioState(true);
       }}
      >
       {audioControl ? <PiMicrophoneFill /> : <PiMicrophoneSlashFill />}
      </button>
     </div>

     {/* call controls buttons */}
     <div className="flex items-center gap-4">
      <button className="dropCallBtn text-2xl">
       <PiPhoneSlashFill />
      </button>
      <button
       className="greenBtn text-2xl"
       onClick={() =>
        shareScreenCaptureStream(localStreamProducers, localMediaStream)
       }
      >
       <MdScreenShare />
      </button>
     </div>

     {/* participants and chat controls buttons*/}
     <div className="flex items-center gap-4">
      <button
       className={`bottonControlBtn ${
        raiseHand ? "participantBtnBg" : "bottonControlBtnBg"
       }`}
       onClick={setRaiseHandState}
       title="Raise Hand"
      >
       <PiHandPalmFill />
      </button>
      <button
       className={`bottonControlBtn ${
        participant ? "participantBtnBg" : "bottonControlBtnBg"
       }`}
       onClick={setParticipantState}
       title="Show Participants"
      >
       <PiUsersFill />
      </button>
      <button
       className={`bottonControlBtn ${
        showChat ? "participantBtnBg" : "bottonControlBtnBg"
       }`}
       onClick={setShowChatState}
       title="Show Chats"
      >
       <PiChatTeardropTextFill />
      </button>
     </div>
    </div>
   </section>
  </>
 );
};

export default Controls;
