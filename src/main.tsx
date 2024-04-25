import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import LeftSideBar from "./pages/LeftSideBar";
import AddChannel from "./pages/AddChannel.tsx";
import SettingsBar from "./pages/SettingsBar.tsx";
import ButtonTemplate from "./pages/ButtonTemplate.tsx";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
    <div>
{/* <div className=" bg-gray-100 max-w-sm min-h-screen ">
  <LeftSideBar />
  <LeftSideBar />
  <LeftSideBar />
  <AddChannel />
  <SettingsBar />
  <ButtonTemplate />
</div>      */}</div>


    </BrowserRouter>
  </React.StrictMode>,
);
