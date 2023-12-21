import React from "react";
import { MdClose } from "react-icons/md";
import { BiSolidSend } from "react-icons/bi";

import { useCalleContextValues } from "../../contexApi/CalleContext";
import { updateLocalChats } from "../../utils/eventControlFunctions";

// eslint-disable-next-line react-refresh/only-export-components
let Chat = () => {
 let {
  setShowChatState,
  showChat,
  calleSocket,
  localPeerCredentials,
  chatMessageInput,
  chatMessageBox,
 } = useCalleContextValues();

 return (
  <>
   <aside className={`SideBarBox  ${showChat ? "showSideBar" : "hideSideBar"}`}>
    <div className="flex items-center justify-end">
     <button className="closeBarBtn" onClick={setShowChatState}>
      <MdClose />
     </button>
    </div>

    <section
     className="w-full h-[83%] mb-2 pt-8 chat-partcpant-Box"
     ref={chatMessageBox}
    >
     {/* {chats.map((chat, index) => {
      if (chat.origin === "remote") {
       return (
        <div className="flex items-start gap-4 mt-4" key={index}>
         <div className="p-4 rounded-md bg-slate-800 "></div>
         <div className="">
          <p className="text-calle-text-color font-extrabold">{chat.name}</p>
          <div className="w-full bg-[#C7DDFF] p-4 rounded-md text-sm">
           {chat.message}
          </div>
         </div>
        </div>
       );
      } else {
       return (
        <div className="w-full mt-4" key={index}>
         <p className="text-end text-calle-text-color font-extrabold">{"Me"}</p>
         <div className=" bg-calle-btn-bg p-4 rounded-md text-sm ml-auto w-5/6 text-slate-200">
          {chat.message}
         </div>
        </div>
       );
      }
     })} */}
    </section>

    <div className="w-full rounded-xl py-2 pl-6 pr-2 flex items-center gap-2 bg-white">
     <input
      type="text"
      className="text-calle-text-color w-full outline-none bg-transparent"
      placeholder="write message"
      ref={chatMessageInput}
     />
     <button
      className="greenBtn "
      onClick={() => {
       updateLocalChats(
        chatMessageBox.current,
        chatMessageInput.current,
        calleSocket,
        localPeerCredentials.current.roomId
       );
      }}
     >
      <BiSolidSend />
     </button>
    </div>
   </aside>
  </>
 );
};

export default Chat = React.memo(Chat);
