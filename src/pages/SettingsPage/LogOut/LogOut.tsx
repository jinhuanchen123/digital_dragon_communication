import React from 'react';
import ReactDOM from 'react-dom';
import LeftSidebar from '../SettingLeftSide';
import { Link } from 'react-router-dom'; 
import OnlineStatus from '../status';

function LogOut() {
  return (
    <div>
    <LeftSidebar/> <OnlineStatus />
     </div>
  );
}

export default LogOut;
