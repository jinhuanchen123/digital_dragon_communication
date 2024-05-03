import { Route, Routes } from "react-router-dom";

import MessageHistory from './pages/HomePage/MessageHistory/MessageHistory.jsx'
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/LoginPage";
import Profile from "./pages/SettingsPage/Profile/Profile"
import Notifications from "./pages/SettingsPage/Notifications/Notification";
import Privacy from "./pages/SettingsPage/Privacy/Privacy";
import Theme from "./pages/SettingsPage/Theme/Theme";
import LogOut from "./pages/SettingsPage/LogOut/LogOut";
import LeftSideBar from "./pages/HomePage/LeftSideBar";
import AddChannel from "./pages/HomePage/AddChannel";
import SettingsBar from "./pages/HomePage/SettingsBar";
>>>>>>> danielG

export default function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />


      <Route path="/login" element={<Login />} />
      <Route path="/setting/profile" element={<Profile />} />
      <Route path="/setting/notifications" element={<Notifications/>}/>
      <Route path="/setting/privacy" element={<Privacy />} />
      <Route path="/setting/theme" element={<Theme />} />
      <Route path="/setting/LogOut" element={<LogOut/>} />
      <Route path="/LSB" element={<LeftSideBar />} />
      <Route path="/Add" element={<AddChannel />} />
      <Route path="/Bar" element={<SettingsBar />} />


    </Routes>
    </>
  );
}