import { useState } from "react";
import {
  PiMicrophoneFill,
  PiMicrophoneSlashFill,
  PiVideoCameraFill,
  PiVideoCameraSlashFill,
  PiPhoneFill,
} from "react-icons/pi";
import { useCalleContextValues } from "../../../contexApi/CalleContext";

const Body = () => {
  let { videoControl, audioControl, setCameraState, setAudioState } =
    useCalleContextValues();

  let [showField, setShowField] = useState(false);

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
                {videoControl ? (
                  <PiVideoCameraSlashFill />
                ) : (
                  <PiVideoCameraFill />
                )}
              </button>

              <button className="controlBtn" onClick={setAudioState}>
                {audioControl ? (
                  <PiMicrophoneSlashFill />
                ) : (
                  <PiMicrophoneFill />
                )}
              </button>
            </div>
          </div>

          {/* buttons for making and joing call */}

          <div className="flex gap-4 my-8">
            <button
              className="primaryBtn"
              onClick={() => setShowField(!showField)}
            >
              <PiVideoCameraFill /> Join Meeting
            </button>
            <button className="greenBtn">
              <PiVideoCameraFill /> New Meeting
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
