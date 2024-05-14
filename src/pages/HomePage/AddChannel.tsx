import { useState } from 'react';
import LeftSideBar from './LeftSideBar';


export default function AddChannel() {
  const [input, setInput] = useState([<LeftSideBar />]);

    return <div id='add-channel' className="flex  flex-col">
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

