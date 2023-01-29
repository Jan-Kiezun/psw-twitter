import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";

function LeftSidebar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userReducer.user);
  return (
    <nav className="w-full min-w-[300px] flex flex-col sticky">
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
          to={`/profile/${user.user_id}`}
        >
          <li>Profile</li>
        </Link>
      </ul>
      <div className="mt-[calc(100vh-380px)]">
        {!_.isEmpty(user) && (
          <button
            draggable="false"
            className="text-xl p-4 pl-6 m-1 hover:bg-gray-700/90 rounded-full flex gap-4 items-center"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/home");
              window.location.reload();
            }}
          >
            <div className="flex items-center gap-2">
              <img
                className="rounded-full w-10 h-10"
                src={user.urlToProfilePicture}
                alt="profile"
              />
              <span className="font-semibold">{user.username}</span>
            </div>
            <span>Log out</span>
          </button>
        )}
      </div>
    </nav>
  );
}

export default LeftSidebar;
