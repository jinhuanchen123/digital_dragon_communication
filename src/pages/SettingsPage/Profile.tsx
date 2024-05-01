import React from 'react';
import ReactDOM from 'react-dom';
import RightSidebar from './RightSidebar'; // Assuming this is the correct import path
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"; // Assuming correct import path for Avatar components
import { Link } from 'react-router-dom';
import "./Setting.css";
import "./Profile.css"

function Profile() {
  return (
    <div className='container1_profile'>
      <RightSidebar/>
      <div className='profile_section'>
      <div className='header'>
        <h1>Profile</h1> 
      </div>
      <div className='content'>
        
        <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }} // Adjust size and border radius
        />
        <AvatarImage
        src="https://e7.pngegg.com/pngimages/179/541/png-clipart-raccoon-computer-icons-animal-avatar-woodland-mammal-animals.png"
        style={{ width: '50px', height: '50px', borderRadius: '50%' }}
        />
        <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <form className='info'>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <label htmlFor="newPassword">New Password:</label>
          <input type="password" id="newPassword" name="newPassword" />
          
        </form>
        <div className='save_button'>
          <button type="submit" id='saveChanges'>Save Changes</button>
        </div>

      </div>

      </div>

      
      
    </div>

    
  );
}

export default Profile;
