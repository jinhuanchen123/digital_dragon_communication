import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Login from "./pages/LoginPage/LoginPage";
import Profile from "./pages/SettingsPage/Profile/Profile";
import Notifications from "./pages/SettingsPage/Notifications/Notification";
import Privacy from "./pages/SettingsPage/Privacy";
import Theme from "./pages/SettingsPage/Theme/Theme";
import LogOut from "./pages/SettingsPage/LogOut/LogOut";
import Invite from "./pages/HomePage/Invite";
import UserList from "./pages/SettingsPage/UserList";
import AuthStatus from "./pages/SettingsPage/status";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {useContext} from "react";
import { AuthContext } from "./AuthContext";



 
 
 
import ThemeContextProvider from "./contexts/ThemeContext.jsx";
import OnlineStatus from "./pages/SettingsPage/status";



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

  return (
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
          path="/setting/blocked"
          element={
            <ProtectedRoute>
              <UserList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/setting/status"
          element={
            <ProtectedRoute>
              <OnlineStatus />
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
  );
}
