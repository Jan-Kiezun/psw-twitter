import React from "react";
import MiddleSegment from "./MiddleSegment";
import RightSidebar from "./RightSidebar";

function Home() {
  return (
    <div className="min-h-screen flex justify-between">
      <MiddleSegment />
      <RightSidebar />
    </div>
  );
}

export default Home;
