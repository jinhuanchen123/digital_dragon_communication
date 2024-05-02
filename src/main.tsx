import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import LeftSideBar from "./pages/LeftSideBar";
import AddChannel from "./pages/AddChannel";
import SettingsBar from "./pages/SettingsBar";
import ButtonTemplate from "./pages/ButtonTemplate";
import TopBar from "./components/TopBar";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
    <div className=" bg-gray-200 max-w-sm min-h-screen">
      <TopBar />

      <AddChannel />
      <SettingsBar />
      
      </div>
    </BrowserRouter>
);
