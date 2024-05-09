import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import ButtonTemplate from './ButtonTemplate';
//import './index.css';


ReactDOM.render(
  <React.StrictMode>
  </React.StrictMode>,
  document.getElementById('root')
);

export default function PopupChannel() {
  
    return   <div className="absolute inset-0 size-1/2 m-auto border-4 border-sky-500">
    <div className="mx-auto text-sm font-medium text-gray-900 dark:text-white">Channel Name</div>
    <input type="text" id="small-input" className="flex mx-auto p-2 text-gray-900 border border-gray-300 rounded-lg
     bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

    <div className="mx-auto text-sm font-medium text-gray-900 dark:text-white">Channel Info</div>
    <input type="text" id="small-input" className="flex mx-auto p-2 text-gray-900 border border-gray-300 rounded-lg
     bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

    <div className="mx-auto text-sm font-medium text-gray-900 dark:text-white">Small input</div>
    <input type="text" id="small-input" className="flex mx-auto p-2 text-gray-900 border border-gray-300 rounded-lg
     bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

      <div className='mt-5  '>{<ButtonTemplate />}</div>

</div>
  }
