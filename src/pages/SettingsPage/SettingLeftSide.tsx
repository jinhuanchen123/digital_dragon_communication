import { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "./SettingLeftSide.module.css";
import dragonImage from "./dragon_no_bg.png"; // Relative path from RightSidebar.tsx
import { getAuth, signOut } from "firebase/auth";
import { ThemeContext } from "../../contexts/ThemeContext.jsx";

function LeftSidebar() {
  const auth = getAuth();
  const { currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];

  return (
    <div className={styles.container1}>
      <div className={styles.right_sidebar}>
        <img
          src={dragonImage}
          alt="Dragon Image"
          className={styles.small_image}
        />

        <ul>
          <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/setting/profile">Profile</Link>
          </li>
          {/* <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/setting/notifications">Notifications</Link>
          </li>
          <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/setting/privacy">Privacy</Link>
          </li> */}
          <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/setting/theme">Theme</Link>
          </li>
          <li className={styles.slsLi} style={{ background: theme.bgd }}>
            <Link to="/login" onClick={() => signOut(auth)}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
