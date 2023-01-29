import React, { useState } from "react";

function RightSidebar() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="w-full min-w-[300px] m-4 flex h-12">
      <form className="w-full">
        <input
          type="search"
          placeholder="Search Twitter"
          className="w-full h-full p-2 pl-4 border-2 border-[rgb(47,51,54)] bg-gray-800  rounded-full
          focus:outline-none focus:ring-2 focus:ring-[rgb(91,112,131)]
          focus:border-transparent
          placeholder-[rgb(91,112,131)]
          placeholder-opacity-50
          "
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <input type="submit" value="Search" className="hidden" />
      </form>
    </div>
  );
}

export default RightSidebar;
