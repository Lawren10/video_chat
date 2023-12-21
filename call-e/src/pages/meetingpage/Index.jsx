/* eslint-disable react-refresh/only-export-components */
import React from "react";
import VideoScreen from "./comps/VideosScreen";
import { useCalleContextValues } from "../../contexApi/CalleContext";

let Index = () => {
 let { remotePeers } = useCalleContextValues();

 return (
  <section className="Container pt-20">
   {console.log("remote peers", remotePeers)}
   <div className="h-5/6 w-full overflow-y-scroll">
    <div
     className={`meetingGridBoxMain ${
      remotePeers.length === 0
       ? "auto-grid-auto"
       : remotePeers.length === 1
       ? "grid-cols-2"
       : "grid-cols-3"
     }`}
    >
     <VideoScreen local={true} peerId={"main"} />

     {remotePeers.length &&
      remotePeers.map((peerId) => {
       return <VideoScreen key={peerId} local={false} peerId={peerId} />;
      })}
    </div>
   </div>
  </section>
 );
};

export default React.memo(Index);
