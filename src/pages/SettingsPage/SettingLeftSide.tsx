
import React, {useContext} from 'react';
import { Link } from 'react-router-dom'; 
import styles from './SettingLeftSide.module.css'
<<<<<<< HEAD
import dragonImage from './dragon.png'; // Relative path from RightSidebar.tsx
import { getAuth, signOut } from "firebase/auth";





function LeftSidebar() {
  const auth = getAuth();


=======
import dragonImage from './dragon_no_bg.png'; // Relative path from RightSidebar.tsx
import { ThemeContext } from "../../contexts/ThemeContext.jsx"

function LeftSidebar() {

  const { toggleTheme, currentTheme, themes } = useContext(ThemeContext);
  const theme = themes[currentTheme];
  
>>>>>>> origin/Setting
  return (



    <div className={styles.container1}>
      <div className={styles.right_sidebar}>
        <img src={dragonImage} alt="Dragon Image" className={styles.small_image} />

        <ul>
          <li style={{background: theme.bgd}}>
            <Link to="/setting/profile">Profile</Link>
          </li>
          <li style={{background: theme.bgd}}>
            <Link to="/setting/notifications">Notifications</Link>
          </li>
          <li style={{background: theme.bgd}}>
            <Link to="/setting/privacy">Privacy</Link>
          </li>
          <li style={{background: theme.bgd}}>
            <Link to="/setting/theme">Theme</Link>
          </li>
<<<<<<< HEAD
          <li>
            <Link to="/login" onClick={()=>signOut(auth)}>Logout</Link>
=======
          <li style={{background: theme.bgd}}>
            <Link to="/login">Logout</Link>
>>>>>>> origin/Setting
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
