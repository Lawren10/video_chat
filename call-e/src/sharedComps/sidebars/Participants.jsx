import { MdClose } from "react-icons/md";
import { PiVideoCameraFill, PiMicrophoneFill } from "react-icons/pi";

import { useCalleContextValues } from "../../contexApi/CalleContext";

const Participants = () => {
  let { setParticipantState, participant } = useCalleContextValues();

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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-md bg-slate-800 "></div>
              <p className="text-calle-text-color font-bold">first last</p>
            </div>

            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg text-center text-2xl text-calle-text-color cursor-pointer ">
                <PiVideoCameraFill />
              </div>
              <div className="p-2 rounded-lg text-center text-2xl text-calle-text-color cursor-pointer">
                <PiMicrophoneFill />
              </div>
            </div>
          </div>
        </section>

        <button className="inviteBtn">Invite someone</button>
      </aside>
    </>
  );
};

export default Participants;
