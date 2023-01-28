import React from "react";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";

function Messages() {
  return (
    <div className="flex border-r-2 border-[rgb(47,51,54)]">
      <ChatList />
      <ChatRoom />
    </div>
  );
}

export default Messages;
