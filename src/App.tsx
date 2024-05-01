import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Profile from "./pages/SettingsPage/Profile/Profile"
import Notifications from "./pages/SettingsPage/Notifications/Notification";
import Privacy from "./pages/SettingsPage/Privacy/Privacy";
import Theme from "./pages/SettingsPage/Theme/Theme";
import LogOut from "./pages/SettingsPage/LogOut/LogOut";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}

     
      <Route path="/setting/profile" element={<Profile />} />
      <Route path="/setting/notifications" element={<Notifications/>}/>
      <Route path="/setting/privacy" element={<Privacy />} />
      <Route path="/setting/theme" element={<Theme />} />
      <Route path="/setting/LogOut" element={<LogOut/>} />

    </Routes>
  );
}