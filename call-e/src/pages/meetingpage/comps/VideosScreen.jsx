import { useCalleContextValues } from "../../../contexApi/CalleContext";

const VideoScreen = () => {
  let { meetingVidNum } = useCalleContextValues();

  return (
    <>
      <div
        className={`videoScreen h-[22.5rem] ${
          meetingVidNum === 1 ? "w-[38rem]" : ""
        }`}
      ></div>
    </>
  );
};

export default VideoScreen;
