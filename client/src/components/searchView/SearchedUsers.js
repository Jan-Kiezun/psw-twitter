import React from "react";
import Back from "../Back";
import Avatar from "../Avatar";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function SeachedUsers() {
  const userReducer = useSelector((state) => state.userReducer);
  const searchedUsers = userReducer.searchedUsers;

  return (
    <div className="min-w-[500px] border-[rgb(47,51,54)] border-x-[1px] flex flex-col">
      <Back text={"Users"} />
      {searchedUsers &&
        searchedUsers.map((user) => (
          <div key={user.user_id}>
            <div className="flex border-b-2 border-[rgb(47,51,54)] p-2">
              <div className="mx-2">
                <Link to={`/profile/${user.user_id}`}>
                  <Avatar user={user} size={50} />
                </Link>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                  <div className="">
                    <Link
                      className="flex flex-col"
                      to={`/profile/${user.user_id}`}
                    >
                      <h3 className="font-semibold text-lg">{user.username}</h3>
                      <h3 className="text-[rgb(91,112,131)] ml-2">
                        @{user.user_id}
                      </h3>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default SeachedUsers;
