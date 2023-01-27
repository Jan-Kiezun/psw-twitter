import React, { useState } from "react";

function RightSidebar() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <div className="w-full min-w-[300px] m-4 flex h-12">
      <form>
        <input
          type="search"
          placeholder="Search Twitter"
          className="w-full p-2 pl-4 border-[rgb(47,51,54)] border-b-[1px] focus:outline-none  bg-[rgb(32,35,39)] rounded-full"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <input type="submit" value="Search" className="hidden" />
      </form>
    </div>
  );
}

export default RightSidebar;
