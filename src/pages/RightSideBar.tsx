import React from 'react';
import ReactDOM from 'react-dom';
import avtar from '/avtar.png';
//import './index.css';


ReactDOM.render(
  <React.StrictMode>
  </React.StrictMode>,
  document.getElementById('root')
);

export default function RightSideBar() {
    return <div className=" max-w-sm  flex  p-6 bg-gray-400 mb-10 rounded-xl ">
    <div className="pt-1 flex flex-row">
        <div className="pt-1 flex space-x-4">
            <img src={avtar} alt="avtar_image"/>
            


        
        <svg height="30" width="40" xmlns="http://www.w3.org/2000/svg">
  <circle r="10" cx="20" cy="20" fill="red" />Sorry, your browser does not support inline SVG.  
</svg> 

        </div>
        
        <div >
      <h1 className="text-lg text-purple-600 leading-tight hover:text-cyan-500 cursor-pointer">
        Tailwind and Create React App
      </h1>
      <p className="text-sm text-rgb(100 100 100) leading-normal">
        Building apps together
      </p>
      
      </div>
    </div>
  </div>;
  }
