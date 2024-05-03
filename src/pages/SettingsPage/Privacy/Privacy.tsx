import React from 'react';
import ReactDOM from 'react-dom';
import './Setting.css';
import './Privacy.module.css'; // Import Privacy styles
import RightSidebar from './RightSidebar';
import { Link } from 'react-router-dom';

function Privacy() {
  return (
    <RightSidebar>
      <div className="privacy-container">
        <h1>Privacy Settings</h1>
        <form>
          <section>
            <h2>Personal Information</h2>
            <label htmlFor="lastSeen">
              Who can see my status
              <select id="lastSeen">
                <option value="everyone">Everyone</option>
                <option value="myContacts">My Contacts</option>
                <option value="nobody">Nobody</option>
              </select>
            </label>
            <label htmlFor="profilePhoto">
              Who can see my profile photo
              <select id="profilePhoto">
                <option value="everyone">Everyone</option>
                <option value="myContacts">My Contacts</option>
                <option value="nobody">Nobody</option>
              </select>
            </label>
          </section>

          <section>
            <h2>Messages</h2>
            <label htmlFor="readReceipts">
              Send read receipts
              <input type="checkbox" id="readReceipts" />
            </label>
          </section>

          <section>
            <h2>Security</h2>
            <label htmlFor="twoFactorAuth">
              Two-factor authentication
              <input type="checkbox" id="twoFactorAuth" />
            </label>
          </section>

          <section>
            <h2>Blocked Contacts</h2>
            <p>Manage your blocked contacts <Link to="/blocked-contacts">here</Link>.</p>
          </section>

          <section>
            <h2>Data and Storage</h2>
            <label htmlFor="autoDownload">
              Auto-download media over mobile data
              <input type="checkbox" id="autoDownload" />
            </label>
          </section>

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </RightSidebar>
  );
}

export default Privacy;
