import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LeftSideBar from "./pages/LeftSideBar";
import AddChannel from "./pages/AddChannel";
import SettingsBar from "./pages/SettingsBar";
import PopupChannel from "./pages/PopupChannel";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/LSB" element={<LeftSideBar />} />
      <Route path="/Add" element={<AddChannel />} />
      <Route path="/Bar" element={<SettingsBar />} />
      <Route path="/pop" element={<PopupChannel />} />


    </Routes>
  );
}
