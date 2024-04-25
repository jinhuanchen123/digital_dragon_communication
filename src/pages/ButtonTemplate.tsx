import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';


ReactDOM.render(
  <React.StrictMode>
  </React.StrictMode>,
  document.getElementById('root')
);
export default function ButtonTemplate() {
    return <div >
<button className="flex mx-auto text-2xl bg-gradient-to-b from-violet-600 to-indigo-600 text-gray-200 py-2 px-4 border border-gray-400 rounded shadow">
  Button
</button>  </div>;
  }
  