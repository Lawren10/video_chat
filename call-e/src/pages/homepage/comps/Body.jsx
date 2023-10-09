import { useState } from "react";
import { MdVideocam, MdVideocamOff } from "react-icons/md";
import { BsMicFill, BsMicMuteFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useCalleContextValues } from "../../../contexApi/CalleContext";

const Body = () => {
  let { videoControl, setVideoControl, audioControl, setAudioControl } =
    useCalleContextValues();

  let [showField, setShowField] = useState(false);

  const setCameraState = () => {
    setVideoControl(!videoControl);
  };

  const setAudioState = () => {
    setAudioControl(!audioControl);
  };

  return (
    <>
      {/* {console.log(videoControl)} */}

      <section className="w-full h-[100%] grid place-items-center">
        {/* container with blured background */}
        <div className="homeBodyInnerBox">
          {/* container for initial video display, picture and video controls */}
          <div className="relative h-[24rem] rounded-md">
            <img
              src="/assets/videochat.jpg"
              alt="video chat image"
              className="w-full h-full rounded-md object-cover mb-4"
            />
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8">
              <button className="controlBtn" onClick={setCameraState}>
                {videoControl ? <MdVideocam /> : <MdVideocamOff />}
              </button>

              <button className="controlBtn" onClick={setAudioState}>
                {audioControl ? <BsMicFill /> : <BsMicMuteFill />}
              </button>
            </div>
          </div>

          {/* buttons for making and joing call */}

          <div className="flex gap-4 my-8">
            <button
              className="primaryBtn"
              onClick={() => setShowField(!showField)}
            >
              <MdVideocam /> Join Meeting
            </button>
            <button className="greenBtn">
              <MdVideocam /> New Meeting
            </button>
          </div>

          {/* input field for joining call  */}

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
                  <IoSend />
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
