import { useState } from "react";
import { FaClipboardUser } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useCalleContextValues } from "../../../contexApi/CalleContext";

const LoginForm = () => {
 const navigate = useNavigate();
 let [name, setName] = useState("");
 let [nameError, setNameError] = useState(false);
 let { localPeerCredentials } = useCalleContextValues();

 const handleUpdateName = (e) => {
  if (nameError === true) {
   setNameError(false);
  }
  setName(e.target.value);
 };

 const onSaveName = () => {
  if (name === "") {
   setNameError(true);
   return;
  }

  localPeerCredentials.current.username = name;

  navigate("/home");
 };

 return (
  <>
   <section className="login-form-box">
    <div className="flex  w-full items-center justify-center">
     <img src="/assets/logo.png" alt="" className="w-10 mb-8" />
     <h1 className="text-5xl font-black text-white ">Call-e</h1>
    </div>
    <p className="text-xl font-bold text-center text-white">
     Welcome to Call-e where everyone meets..
    </p>

    <div className="mt-10">
     <div className="flex flex-col items-center justify-center ">
      <div className="w-8/12">
       <label htmlFor="screen name" className="text-white">
        Screen Name
       </label>
       <div className="relative w-full mb-2">
        <i className="absolute inset-y-1/4 right-2 text-xl text-white ">
         <FaClipboardUser />
        </i>
        <input
         type="text"
         name="screen name"
         value={name}
         onChange={handleUpdateName}
         className=" rounded p-3 input-bg w-full"
        />
       </div>

       <small
        className={`text-red-400 text-base font-medium ${
         nameError ? "opacity-1" : "opacity-0"
        } `}
       >
        screen name field cannot be empty.
       </small>
      </div>
     </div>

     <div className="flex items-center justify-center w-full my-8">
      <button className="primaryBtn w-5/12 py-4" onClick={onSaveName}>
       Save
      </button>
     </div>
    </div>
   </section>
  </>
 );
};

export default LoginForm;
