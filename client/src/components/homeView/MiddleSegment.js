import React from "react";
import AddTweet from "./midleSegment.js/AddTweet";
import Tweetlist from "./midleSegment.js/Tweetlist";

function MiddleSegment() {
  return (
    <div className="min-w-[500px] border-[rgb(47,51,54)] border-x-[1px] flex flex-col">
      <h2 className="p-4 text-xl font-semibold border-b-2 border-[rgb(47,51,54)]">
        Home
      </h2>
      <AddTweet />
      <Tweetlist />
    </div>
  );
}

export default MiddleSegment;
