import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./SettingLeftSide.module.css";
import dragonImage from "./dragon_no_bg.png";
import { getAuth, signOut } from "firebase/auth";
import { db, auth } from "../Firebase/firebase";

import { ThemeContext } from "../../contexts/ThemeContext.jsx";
import { doc, setDoc } from "firebase/firestore"; // Import setDoc from Firestore
import OnlineStatus from "./status.js";

function LeftSidebar() {
  const auth = getAuth();
  const { currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];

  const handleLogout = async () => {
    try {
      // Update the user's online status to false
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        await setDoc(userDocRef, { online: false }, { merge: true });
      }

      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className={styles.container1}>
      <div className={styles.right_sidebar}>
        <img src={dragonImage} alt="Dragon Image" className={styles.small_image} />
        <ul>
          <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/setting/profile">Profile</Link>
          </li>
          <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/setting/notifications">Notifications</Link>
          </li>
          <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/setting/privacy">Privacy</Link>
          </li>
          <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/setting/theme">Theme</Link>
          </li>
          <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/login" onClick={handleLogout}>
              Logout 
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
