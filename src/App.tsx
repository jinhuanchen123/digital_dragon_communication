import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/LoginPage";
import Profile from "./pages/SettingsPage/Profile/Profile";
import Notifications from "./pages/SettingsPage/Notifications/Notification";
import Privacy from "./pages/SettingsPage/Privacy";
import Theme from "./pages/SettingsPage/Theme/Theme";
import LogOut from "./pages/SettingsPage/LogOut/LogOut";
<<<<<<< HEAD
import Invite from "./pages/HomePage/Invite";
import UserList from "./pages/SettingsPage/UserList";
import AuthStatus from "./pages/SettingsPage/status";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useContext} from "react";
import { AuthContext } from "./AuthContext";

export default function App() {
  
 
 
 
=======
import ThemeContextProvider from "./contexts/ThemeContext.jsx";
import { ReactNode, useContext } from "react";
import { AuthContext } from "./AuthContext";

export default function App() {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.error("AuthContext is not provided");
    return <Navigate to="/login" />;
  }

  const { currentUser } = authContext;

  const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return <>{children}</>;
  };
>>>>>>> origin/Communication-Page

  return (
<<<<<<< HEAD
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/user" element={<UserList />} />
      <Route path="/status" element={<AuthStatus />} />

      <Route path="/invite" element={<Invite />} />
      <Route path="/setting/profile" element={<Profile />} />
      <Route path="/setting/notifications" element={<Notifications/>}/>
      <Route path="/setting/privacy" element={<Privacy />} />
      <Route path="/setting/theme" element={<Theme />} />
      <Route path="/setting/LogOut" element={<LogOut/>} />

    </Routes>
=======
    <ThemeContextProvider>
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
    </ThemeContextProvider>
>>>>>>> origin/Communication-Page
  );
}
