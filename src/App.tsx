import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/LoginPage";
<<<<<<< HEAD
import Profile from "./pages/SettingsPage/Profile/Profile";
=======
import Profile from "./pages/SettingsPage/Profile/Profile"
>>>>>>> origin/Setting
import Notifications from "./pages/SettingsPage/Notifications/Notification";
import Privacy from "./pages/SettingsPage/Privacy/Privacy";
import Theme from "./pages/SettingsPage/Theme/Theme";
import LogOut from "./pages/SettingsPage/LogOut/LogOut";
<<<<<<< HEAD
import Invite from "./pages/HomePage/Invite";
import { ReactNode, useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error("AuthContext is not provided");
    return <Navigate to="/login" />;
  }

  const { currentUser } = authContext;
=======
import LeftSideBar from "./components/ui/LeftSideBar";
import AddChannel from "./components/ui/AddChannel";
import SettingsBar from "./components/ui/SettingsBar";
import ThemeContextProvider from './contexts/ThemeContext.jsx'

export default function App() {
  return (
    <ThemeContextProvider>
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
>>>>>>> origin/Setting

  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/invite"
        element={
          <ProtectedRoute>
            <Invite />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setting/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setting/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setting/privacy"
        element={
          <ProtectedRoute>
            <Privacy />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setting/theme"
        element={
          <ProtectedRoute>
            <Theme />
          </ProtectedRoute>
        }
      />
      <Route
        path="/setting/logout"
        element={
          <ProtectedRoute>
            <LogOut />
          </ProtectedRoute>
        }
      />
    </Routes>
<<<<<<< HEAD
=======
    </ThemeContextProvider>
>>>>>>> origin/Setting
  );
}
