import React, { useState } from 'react';

export default function LeftSidebar({ channelName }) {
  return (
    <div className="max-w-sm flex flex-col p-6 border-solid border-2 border-gray-200 mb-5 rounded-lg hover:bg-gray-400 hover:border-black hover:cursor-pointer">
      {channelName && (
        <div className="pt-1 flex flex-row space-x-2">
          <div className="pt-1 flex ">
            <img className='flex size-16' src="https://th.bing.com/th/id/OIP.GvaQNtsmMJcf70j5N0W1OAAAAA?w=191&h=191&c=7&r=0&o=5&pid=1.7" loading="lazy" />
            <svg height="30" width="40" xmlns="http://www.w3.org/2000/svg">
              <circle r="8" cx="15" cy="20" fill="red" />Sorry, your browser does not support inline SVG.
            </svg>
          </div>
          <div>
            <h1 className="text-lg text-purple-600 leading-tight hover:text-white cursor-pointer">
              {channelName}
            </h1>
            <p className="text-sm text-rgb(100 100 100) leading-normal">
              Building apps together
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
