import { useState } from "react";
import LeftSideBar from "./LeftSideBar";

export default function AddChannel() {
  const [input, setInput] = useState([<LeftSideBar />]);

  return (
    <div className="mx-auto flex flex-col-reverse">
      {input.map((item, index) => (
        <div key={`input-${index}`}>{item}</div>
      ))}
      <button
        className="m-5 mx-auto flex bg-purple-500 p-2 hover:scale-105"
        onClick={() => {
          setInput([...input, <LeftSideBar />]);
        }}
      >
        Add Channel
      </button>
    </div>
  );
}
