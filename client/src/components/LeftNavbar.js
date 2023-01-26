import React, { useState } from "react";
import { Link } from "react-router-dom";

function LeftSidebar() {
  const [user, setUser] = useState({
    id: "Janek_123",
    name: "JanekOwO",
    bio: "Average guy in the average world",
    avatar: "https://i.imgur.com/8Km9tLL.png",
    followers: 21,
    following: 123,
  });
  return (
    <nav className="w-full min-w-[300px]">
      <img
        width="64"
        alt="Twitter-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/64px-Twitter-logo.svg.png"
      />
      <ul>
        <Link to="/home">
          <li>Home</li>
        </Link>
        <Link to="/messages">
          <li>Messages</li>
        </Link>
        <Link to={`/profile/${user.id}`}>
          <li>Profile</li>
        </Link>
      </ul>
    </nav>
  );
}

export default LeftSidebar;
