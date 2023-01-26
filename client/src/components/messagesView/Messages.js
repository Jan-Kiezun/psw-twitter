import React from "react";
import ChatRoom from "./ChatRoom";
import ChatList from "./ChatList";

function Messages() {
  return (
    <div className="flex">
      <ChatList />
      <ChatRoom />
    </div>
  );
}

export default Messages;
