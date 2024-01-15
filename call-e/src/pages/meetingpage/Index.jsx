/* eslint-disable react-refresh/only-export-components */
import React from "react";
import VideoScreen from "./comps/VideosScreen";
import { useCalleContextValues } from "../../contexApi/CalleContext";

let Index = () => {
 let { nowSharing, remotePeers } = useCalleContextValues();

 const displayScreens = () => {
  if (remotePeers.length && nowSharing === null) {
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
  } else {
   let filteredScreen = remotePeers.filter((item) => item === nowSharing);
   return filteredScreen.map((peerId) => {
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
     <VideoScreen local={true} peerId={"main"} sharingUser={nowSharing} />

     {displayScreens()}
    </div>
   </div>
  </section>
 );
};

export default React.memo(Index);
