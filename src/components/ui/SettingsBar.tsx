import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
//import './index.css';

ReactDOM.render(
  <React.StrictMode>
  </React.StrictMode>,
  document.getElementById('root')
);
export default function SettingsBar() {
  return (
      <div>
          <footer className='flex flex-row flex-nowrap hover:cursor-pointer'>
              <Link to="/setting/profile">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-10" style={{ width: "100px", height: "200px" }} >
                  </svg>
              </Link>
          </footer>
      </div>
  );
}
