import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import Profile from "./pages/SettingsPage/Profile"
import Notifications from "./pages/SettingsPage/Notification";
import Privacy from "./pages/SettingsPage/Privacy";
import Theme from "./pages/SettingsPage/Theme";
import LogOut from "./pages/SettingsPage/LogOut";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/setting/profile" element={<Profile />} />
      <Route path="/setting/notifications" element={<Notifications/>}/>
      <Route path="/setting/privacy" element={<Privacy />} />
      <Route path="/setting/theme" element={<Theme />} />
      <Route path="/setting/LogOut" element={<LogOut/>} />

    </Routes>
  );
}