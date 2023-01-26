import React from "react";
import RightSidebar from "./homeView/RightSidebar";

function profile() {
  return (
    <div>
      <div className="min-h-screen flex justify-between">
        <div className="min-w-[500px] border-[rgb(47,51,54)] border-x-[1px] flex flex-col">
          Profile
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}

export default profile;
