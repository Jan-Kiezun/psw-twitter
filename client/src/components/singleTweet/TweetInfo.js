import React from "react";
import Replies from "./TweetInfo/Replies";
import Tweet from "./TweetInfo/Tweet";
import Back from "../Back";
import AddReply from "./TweetInfo/AddReply";

function TweetInfo() {
  return (
    <div className="min-w-[500px] border-[rgb(47,51,54)] border-x-[1px] flex flex-col">
      <Back text={"Tweet"} />
      <Tweet />
      <AddReply />
      <Replies />
    </div>
  );
}

export default TweetInfo;
