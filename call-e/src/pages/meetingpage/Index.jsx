/* eslint-disable react-refresh/only-export-components */
import React from "react";
import VideoScreen from "./comps/VideosScreen";
import { useCalleContextValues } from "../../contexApi/CalleContext";

let Index = () => {
 let { nowSharing, remotePeers } = useCalleContextValues();

 const displayScreens = () => {
  if (remotePeers.length) {
   return remotePeers.map((peerId) => {
    return (
     <VideoScreen
      key={peerId}
      local={false}
      peerId={peerId}
      sharingUser={nowSharing}
     />
    );
   });
  }
 };

 return (
  <section className="Container pt-20">
   {console.log("remote peers", remotePeers)}

   <div className="h-5/6 w-full overflow-y-scroll relative">
    <div
     className={`meetingGridBoxMain ${
      remotePeers.length === 0 || nowSharing !== null
       ? "auto-grid-auto"
       : remotePeers.length === 1
       ? "grid-cols-2"
       : "grid-cols-3"
     } h-full `}
     id="screens-cont"
    >
     <VideoScreen local={true} peerId={"main"} />

     {displayScreens()}
    </div>
    {/* ) : (
     <div className="meetingGridBoxMain auto-grid-auto h-full">
      <VideoScreen local={false} peerId={nowSharing} />

      <div className="absolute w-64 bottom-0 left-4">
       <VideoScreen local={true} peerId={"main"} />
      </div>
     </div>
    )} */}
   </div>
  </section>
 );
};

export default React.memo(Index);

// remotePeers.length && nowSharing === null
//  ? remotePeers.map((peerId) => {
//     return <VideoScreen key={peerId} local={false} peerId={peerId} />;
//    })
//  : "";
