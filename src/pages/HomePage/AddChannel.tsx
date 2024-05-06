import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import LeftSideBar from './LeftSideBar';
//import './index.css';


ReactDOM.render(
  <React.StrictMode>
  </React.StrictMode>,
  document.getElementById('root')
);


export default function AddChannel() {
  
  const [input, setInput] = useState([<LeftSideBar />]);

    return <div className="flex mx-auto flex-col-reverse">
          {input.map((item, index) => (
        <div key={`input-${index}`}>{item}</div>
      ))}
      <button
        className="flex mx-auto p-2 bg-purple-500 m-5 hover:scale-105"

        onClick={() => {
          setInput([...input, <LeftSideBar />]);
        }}
        >Add Channel</button>
    </div>;
  }
  