import React from "react";
import AddTweet from "./midleSegment.js/AddTweet";
import Tweetlist from "./midleSegment.js/Tweetlist";
import Back from "../Back";

function MiddleSegment() {
  return (
    <div className="min-w-[500px] border-[rgb(47,51,54)] border-x-[1px] flex flex-col">
      <Back text="Home" />
      <AddTweet />
      <Tweetlist />
    </div>
  );
}

export default MiddleSegment;
