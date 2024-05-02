
import { Link } from 'react-router-dom'; 
import styles from './SettingLeftSide.module.css'
import dragonImage from './dragon.png'; // Relative path from RightSidebar.tsx

function LeftSidebar() {
  return (
    <div className={styles.container1}>
      <div className={styles.right_sidebar}>
        <img src={dragonImage} alt="Dragon Image" className={styles.small_image} />

        <ul>
          <li>
            <Link to="/setting/profile">Profile</Link>
          </li>
          <li>
            <Link to="/setting/notifications">Notifications</Link>
          </li>
          <li>
            <Link to="/setting/privacy">Privacy</Link>
          </li>
          <li>
            <Link to="/setting/theme">Theme</Link>
          </li>
          <li>
            <Link to="/login">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
