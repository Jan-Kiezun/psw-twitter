import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";

function LeftSidebar() {
  const user = useSelector((state) => state.userReducer.user);
  return (
    <nav className="w-full min-w-[300px] flex flex-col">
      <img
        className="my-2 mt-4 ml-6"
        draggable="false"
        width="48"
        alt="Twitter-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/64px-Twitter-logo.svg.png"
      />
      <ul className="text-xl flex flex-col">
        <Link
          draggable="false"
          className="p-4 pl-6 m-1 hover:bg-gray-700 rounded-full"
          to="/home"
        >
          <li>Home</li>
        </Link>
        <Link
          draggable="false"
          className="p-4 pl-6 m-1 hover:bg-gray-700 rounded-full"
          to="/messages"
        >
          <li>Messages</li>
        </Link>
        <Link
          draggable="false"
          className="p-4 pl-6 m-1 hover:bg-gray-700 rounded-full"
          to={`/profile/${user.username}`}
        >
          <li>Profile</li>
        </Link>
      </ul>
      <div className="mt-[calc(100vh-320px)]">
        {!_.isEmpty(user) && (
          <Link
            draggable="false"
            className="text-xl p-4 pl-6 m-1 hover:bg-gray-700 rounded-full"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            to="/"
          >
            <span>Logout user {user.username}</span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default LeftSidebar;
