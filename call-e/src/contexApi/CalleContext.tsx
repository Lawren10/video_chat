import React, { createContext, useContext } from "react";
import { calleContextType, calleContextTypevalue } from "./contextType";

const calleContext = createContext<calleContextType>(calleContextTypevalue);

const CalleContext = ({ children }) => {
  return (
    <>
      <calleContext.Provider
        value={{
          testing: "all tests pass",
        }}
      >
        {children}
      </calleContext.Provider>
    </>
  );
};

export const useCalleContextValues = () => {
  return useContext(calleContext);
};

export default CalleContext;
