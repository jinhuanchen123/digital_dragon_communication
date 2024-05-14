import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'; 
import './Setting.css';
import dragonImage from './dragon.png'; // Relative path from RightSidebar.tsx

function RightSidebar() {
  return (
    <div className='container1'>
      <div className="right-sidebar">
      <img src={dragonImage} alt="Dragon Image" className="small-image" />

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
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default RightSidebar;
