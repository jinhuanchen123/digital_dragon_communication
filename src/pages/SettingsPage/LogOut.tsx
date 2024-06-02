import React from 'react';
import ReactDOM from 'react-dom';
import './Setting.css'; // Correct import statement
import RightSidebar from './RightSidebar';
import { Link } from 'react-router-dom'; 
import OnlineStatus from './status';

function LogOut() {
  return (
    <div>
    <RightSidebar/>  <OnlineStatus />
    </div>
  );
}

export default LogOut;
