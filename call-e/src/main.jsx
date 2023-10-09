import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import CalleContext from "./contexApi/CalleContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CalleContext>
        <App />
      </CalleContext>
    </BrowserRouter>
  </React.StrictMode>
);
