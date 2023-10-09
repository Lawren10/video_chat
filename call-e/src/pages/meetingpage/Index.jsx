import VideoScreen from "./comps/VideosScreen";
import { useCalleContextValues } from "../../contexApi/CalleContext";

const Index = () => {
  let { meetingVidNum } = useCalleContextValues();

  return (
    <section className="Container pt-20">
      <div className="h-5/6 w-full overflow-y-scroll">
        <div
          className={`meetingGridBoxMain ${
            meetingVidNum === 1
              ? "auto-grid-auto"
              : meetingVidNum === 2
              ? "grid-cols-2"
              : "grid-cols-3"
          }`}
        >
          <VideoScreen />
          <VideoScreen />
          <VideoScreen />
          <VideoScreen />
          <VideoScreen />
          <VideoScreen />
          <VideoScreen />
        </div>
      </div>
    </section>
  );
};

export default Index;
