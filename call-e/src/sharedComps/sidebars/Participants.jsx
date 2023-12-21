import { MdClose } from "react-icons/md";
import {
 PiVideoCameraFill,
 PiMicrophoneFill,
 PiVideoCameraSlashFill,
 PiMicrophoneSlashFill,
} from "react-icons/pi";

import { useCalleContextValues } from "../../contexApi/CalleContext";

const Participants = () => {
 let { setParticipantState, participant, remoteStreamConsumers, remotePeers } =
  useCalleContextValues();

 return (
  <>
   <aside
    className={`SideBarBox  ${participant ? "showSideBar" : "hideSideBar"}`}
   >
    <div className="flex items-center justify-end">
     <button className="closeBarBtn" onClick={setParticipantState}>
      <MdClose />
     </button>
    </div>

    <section className="w-full h-[85%] mb-2 pt-8">
     {remotePeers.length === 0 ? (
      <p className="text-calle-text-color font-bold text-sm px-4 text-center">
       No participants yet, click the invite button below to get the room id and
       link
      </p>
     ) : (
      remotePeers.map((participantId) => {
       return (
        <div
         key={participantId}
         className="flex items-center justify-between mb-2"
        >
         <div className="flex items-center gap-4">
          <div className="p-4 rounded-md bg-slate-800 "></div>
          <p className="text-calle-text-color font-bold">
           {remoteStreamConsumers.current[participantId].socketUserName}
          </p>
         </div>

         <div className="flex items-center gap-8 ">
          <div className="relative p-2 rounded-lg text-center text-2xl cursor-pointer ">
           <PiVideoCameraFill
            className="absolute top-0 left-0 text-green-500 opacity-100"
            id={`${participantId}-cameraActive`}
           />
           <PiVideoCameraSlashFill
            className="absolute top-0 left-0 text-red-500 opacity-0"
            id={`${participantId}-cameraInActive`}
           />
          </div>
          <div className="relative p-2 rounded-lg text-center text-2xl cursor-pointer">
           <PiMicrophoneFill
            className="absolute top-0 right-0 text-green-500 opacity-100"
            id={`${participantId}-micActive`}
           />
           <PiMicrophoneSlashFill
            className="absolute top-0 right-0 text-red-500 opacity-0"
            id={`${participantId}-micInActive`}
           />
          </div>
         </div>
        </div>
       );
      })
     )}
    </section>

    <button className="inviteBtn">Invite someone</button>
   </aside>
  </>
 );
};

export default Participants;
