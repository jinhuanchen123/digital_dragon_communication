import React, { useState } from 'react';
import RightSidebar from '../SettingLeftSide'; // Assuming this is the correct import path
import priStyles from './Privacy.module.css'; // Importing CSS module


function Privacy() {
  return (
    <div className={priStyles.container1_Privacy}>
       <RightSidebar/>  

    </div>
   
  );
}

export default Privacy;
