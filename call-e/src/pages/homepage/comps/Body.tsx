import React from "react";
import { MdVideocam } from "react-icons/md";
import { BsMicFill } from "react-icons/bs";
import { IoSend } from "react-icons/io5";
import { useCalleContextValues } from "../../../contexApi/CalleContext";
import { calleContextType } from "../../../contexApi/contextType";

const Body = () => {
  let value: calleContextType = useCalleContextValues();

  const { testing } = value;

  return (
    <>
      {console.log(testing)}

      <div className="homebg"></div>
      <section className="homeBodyBox">
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
              <button className="controlBtn">
                <MdVideocam />
              </button>

              <button className="controlBtn">
                <BsMicFill />
              </button>
            </div>
          </div>

          {/* buttons for making and joing call */}

          <div className="flex gap-4 my-8">
            <button className="primaryBtn">
              <MdVideocam /> Join Meeting
            </button>
            <button className="greenBtn">
              <MdVideocam /> New Meeting
            </button>
          </div>

          {/* input field for joining call  */}
          <div>
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
        </div>
      </section>
    </>
  );
};

export default Body;
