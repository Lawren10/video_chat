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
    setRaiseHand,
    participant,
    showChat,
    setCameraState,
    setAudioState,
    setParticipantState,
    setShowChatState,
  } = useCalleContextValues();

  const setRaiseHAndState = () => {
    setRaiseHand(!raiseHand);
  };

  return (
    <>
      {console.log(location)}
      <section
        className={`absolute bottom-8 w-full grid place-items-center ${
          location !== "/meeting" ? "hidden" : "block"
        }`}
      >
        <div className="controlBox">
          <div className="flex items-center gap-4">
            <button
              className={`bottonControlBtn ${
                videoControl ? "audioVideoBg" : "bottonControlBtnBg"
              }`}
              onClick={setCameraState}
            >
              {videoControl ? (
                <PiVideoCameraSlashFill />
              ) : (
                <PiVideoCameraFill />
              )}
            </button>
            <button
              className={`bottonControlBtn ${
                audioControl ? "audioVideoBg" : "bottonControlBtnBg"
              }`}
              onClick={setAudioState}
            >
              {audioControl ? <PiMicrophoneSlashFill /> : <PiMicrophoneFill />}
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button className="dropCallBtn text-2xl">
              <PiPhoneSlashFill />
            </button>
            <button className="greenBtn text-2xl">
              <MdScreenShare />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <button
              className={`bottonControlBtn ${
                raiseHand ? "participantBg" : "bottonControlBtnBg"
              }`}
              onClick={setRaiseHAndState}
            >
              <PiHandPalmFill />
            </button>
            <button
              className={`bottonControlBtn ${
                participant ? "participantBg" : "bottonControlBtnBg"
              }`}
              onClick={setParticipantState}
            >
              <PiUsersFill />
            </button>
            <button
              className={`bottonControlBtn ${
                showChat ? "participantBg" : "bottonControlBtnBg"
              }`}
              onClick={setShowChatState}
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
