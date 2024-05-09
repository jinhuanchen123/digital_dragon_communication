import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import LeftSideBar from './LeftSideBar';
//import './index.css';




ReactDOM.render(
  <React.StrictMode>
  </React.StrictMode>,
  document.getElementById('root')
);
export default function ButtonTemplate() {

  const [channel, setChannel] = useState([]);


    return <div className=" flex">
      {channel.map((item, index) => (
        <div key={`channel-${index}`}>{item}</div>
      ))}
<button  type="submit" className="text-center  mx-auto text-2xl bg-gradient-to-b from-violet-600 to-indigo-600 text-gray-200 py-1 size-9/12 border border-gray-400 rounded shadow hover:scale-105"
onClick={() => {
  setChannel([...channel, <LeftSideBar />]);
}}>
  Button
</button>  </div>;
  }
  