export default function LeftSideBar() {
  return (
    <div className=" mb-5  flex  max-w-sm rounded-lg border-2 border-solid border-gray-200 p-6 hover:cursor-pointer hover:border-black hover:bg-gray-400">
      <div className="flex flex-row space-x-2 pt-1">
        <div className="flex pt-1 ">
          <img
            className="flex size-16"
            src="https://th.bing.com/th/id/OIP.GvaQNtsmMJcf70j5N0W1OAAAAA?w=191&h=191&c=7&r=0&o=5&pid=1.7"
            loading="lazy"
          />

          <svg height="30" width="40" xmlns="http://www.w3.org/2000/svg">
            <circle r="8" cx="15" cy="20" fill="red" />
            Sorry, your browser does not support inline SVG.
          </svg>
        </div>

        <div>
          <h1 className="cursor-pointer text-lg leading-tight text-purple-600 hover:text-white">
            Tailwind and Create React App
          </h1>
          <p className="text-rgb(100 100 100) text-sm leading-normal">
            Building apps together
          </p>
        </div>
      </div>
    </div>
  );
}
