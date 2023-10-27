import { MdClose } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";

import { useCalleContextValues } from "../../contexApi/CalleContext";

const Chat = () => {
  let { setShowChatState, showChat } = useCalleContextValues();

  return (
    <>
      <aside
        className={`SideBarBox  ${showChat ? "showSideBar" : "hideSideBar"}`}
      >
        <div className="flex items-center justify-end">
          <button className="closeBarBtn" onClick={setShowChatState}>
            <MdClose />
          </button>
        </div>

        <section className="w-full h-[83%] mb-2 pt-8">
          <div className="flex items-start gap-4 mt-4">
            <div className="p-4 rounded-md bg-slate-800 "></div>
            <div className="">
              <p className="text-calle-text-color font-extrabold">first last</p>
              <div className="w-full bg-[#C7DDFF] p-4 rounded-md text-sm">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Consequatur quae hic vitae ut voluptatibus blanditiis voluptates
              </div>
            </div>
          </div>

          <div className="w-full mt-4">
            <p className="text-end text-calle-text-color font-extrabold">
              first name
            </p>
            <div className=" bg-calle-btn-bg p-4 rounded-md text-sm ml-auto w-5/6 text-slate-200">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequatur quae hic vitae ut voluptatibus blanditiis voluptates
            </div>
          </div>
        </section>

        <div className="w-full rounded-xl py-2 pl-6 pr-2 flex items-center gap-2 bg-white">
          <input
            type="text"
            className="text-calle-text-color w-full outline-none bg-transparent"
            placeholder="write message"
          />
          <button className="greenBtn ">
            <BiSolidSend />
          </button>
        </div>
      </aside>
    </>
  );
};

export default Chat;
