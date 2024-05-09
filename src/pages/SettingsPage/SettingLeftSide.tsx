import { Link } from 'react-router-dom'; 
import styles from './SettingLeftSide.module.css';
import dragonImage from './dragon.png'; // Relative path from RightSidebar.tsx
import { getAuth, signOut } from "firebase/auth";

function LeftSidebar() {
  const LogOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful. You can navigate to another page here if needed.
      console.log('User signed out successfully.');
    }).catch((error) => {
      // An error happened during sign-out.
      console.error('Error signing out:', error);
    });
  };
  
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
            {/* Call the LogOut function directly in the onClick event */}
            <Link to="/login" onClick={LogOut}>Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LeftSidebar;
