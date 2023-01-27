import React from "react";
import RightSidebar from "./homeView/RightSidebar";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.userReducer.user);

  return (
    <div>
      <div className="min-h-screen flex justify-between">
        <div className="min-w-[500px] border-[rgb(47,51,54)] border-x-[1px] flex flex-col">
          <h2 className="p-4 text-xl font-semibold border-b-2 border-[rgb(47,51,54)]">
            Profile
          </h2>

          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center">
              <img
                className="rounded-full w-32 h-32"
                src={user.urlToProfileBackground}
                alt="profile"
              />
              <h2 className="text-2xl font-semibold">{user.username}</h2>
              <h3 className="text-lg font-semibold">@{user.user_id}</h3>
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}

export default Profile;
