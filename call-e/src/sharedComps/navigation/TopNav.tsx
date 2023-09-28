import React from "react";
import { BiMoon } from "react-icons/bi";
import { FiUser } from "react-icons/fi";

const TopNav = () => {
  return (
    <>
      <nav className="topNav">
        <div className="flex items-center justify-center gap-1">
          <img src="/assets/logo.png" alt="" className="w-5 mb-2" />
          <h1 className="text-2xl font-black text-calle-text-color ">Call-e</h1>
        </div>

        <section className="flex items-center gap-8">
          <div className="shadow-xl rounded-md p-2 cursor-pointer text-center bg-white ">
            <BiMoon className="text-calle-gray text-2xl" />
          </div>
          <div className="userBtn">
            <FiUser className="text-calle-gray text-2xl" />
          </div>
        </section>
      </nav>
    </>
  );
};

export default TopNav;
