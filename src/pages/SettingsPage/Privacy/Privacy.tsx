import React from 'react';
import ReactDOM from 'react-dom';
import '../Setting.css'; // Correct import statement
import LeftSidebar from '../LeftSidebar';
import { Link } from 'react-router-dom'; 
import "../Setting.css";
import "./Privacy.module.css";
import "../Profile.css"



function Privacy() {
  return (
    <div className="flex overflow-hidden">
      <LeftSidebar/>
    <div className='flex flex-col privacy_container'>
      
      
      
      
      
      <div className='privacyheader flex '>
        <div className='flex grid-flow-dense flex-wrap'>
      <div className='text-white w-screen my-auto'>
        <h1>Privacy</h1> 
      </div>
      </div>
      </div>
      <div className="privacy-container flex flex-col space-y-7 text-2xl drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] 
        text-white font-extrabold p-20 w-1/2 h-max">
        <h1 className='flex text-center'>Privacy Settings</h1>
        <form className='flex flex-col'>
          <section>
            <h2 className='mb-3 text-black'>Personal Information</h2>
            
            <label htmlFor="lastSeen">
              Who can see my status

                <select id="lastSeen" className=' ml-5'>
                  <option value="everyone">Everyone</option>
                  <option value="myContacts">My Contacts</option>
                  <option value="nobody">Nobody</option>
                </select>
            </label>
            <br></br>
            <label htmlFor="profilePhoto">
              Who can see my profile photo
              <select id="profilePhoto" className=' ml-5'>
                <option value="everyone">Everyone</option>
                <option value="everyone">My Contacts</option>
                <option value="everyone">Nobody</option>
              </select>
            </label>
           

          </section>

          <section>
            <h2 className='my-3 text-black'>Messages</h2>
           

            <label htmlFor="readReceipts">
              Send read receipts
              <input type="checkbox" className=' ml-64 size-5' id="readReceipts" />
            </label>
          </section>

          <section>
            <h2 className='my-3 text-black'>Blocked Contacts</h2>
            <p>Manage your blocked contacts <Link to="/blocked-contacts" className='text-violet-700 hover:text-3xl'>here</Link>.</p>
          </section>

          <section>
            <h2>Data and Storage</h2>
            <label htmlFor="autoDownload">
              Auto-download media over mobile data
                <input type="checkbox" className='size-5' id="autoDownload" />
            </label>
          </section>
  
        </form>

      </div>
      
        <button type="submit" className='privacyheader savefooter flex justify-center w-screen p-20 text-xl text-white
         font-semibold hover:text-2xl'>Save Changes</button>

      </div>

      </div>


     );
}

export default Privacy;