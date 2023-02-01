import React, { useEffect } from "react";
import RightSidebar from "../homeView/RightSidebar";
import { useSelector, useDispatch } from "react-redux";
import Back from "../Back";
import UserPosts from "./UserPosts";
import { useParams } from "react-router-dom";
import { selectUser, getUsers } from "../../features/twitter/userSlice";
import { getTweets } from "../../features/twitter/tweetSlice";
import _ from "lodash";

function Profile() {
  const dispatch = useDispatch();
  const { user_id } = useParams();
  const userReducer = useSelector((state) => state.userReducer);
  const userProfile = useSelector((state) => state.userReducer.userProfile);
  const users = useSelector((state) => state.userReducer.users);
  const tweets = useSelector((state) => state.tweetReducer.tweets);

  useEffect(() => {
    if (_.isEmpty(users)) dispatch(getUsers());
    if (!tweets.length) dispatch(getTweets());
    dispatch(selectUser(user_id));
  }, [dispatch, user_id, users]);

  return (
    <div>
      <div className="min-h-screen flex justify-between">
        {!_.isEmpty(users) &&
        userReducer.status === "succeeded" &&
        !_.isEmpty(userProfile) ? (
          <div className="min-w-[500px] border-[rgb(47,51,54)] border-x-[1px] flex flex-col">
            <Back text="Profile" />
            <div className="flex flex-col items-center">
              <div
                style={{
                  backgroundImage: `url("https://picsum.photos/600/300")`,
                }}
                className="flex flex-col items-center
            p-4 border-b-2 border-[rgb(47,51,54)] w-full"
              >
                <img
                  className="rounded-full w-32 h-32"
                  src={userProfile.urlToProfilePicture}
                  alt="profile"
                />
                <h2 className="text-2xl font-semibold">
                  {userProfile.username}
                </h2>
                <h3 className="text-lg font-semibold">
                  @{userProfile.user_id}
                </h3>
              </div>
              <div
                className="flex flex-col items-center
            p-4 border-b-2 border-[rgb(47,51,54)]"
              >
                <h2 className="text-xl font-semibold">Bio</h2>
                <h3 className="text-lg font-semibold">{userProfile.bio}</h3>
              </div>
            </div>
            <UserPosts />
          </div>
        ) : userReducer.loading === true ? (
          <div className="flex justify-center items-center h-screen min-w-[500px]">
            <h1 className="text-2xl font-semibold">Loading...</h1>
          </div>
        ) : (
          <div className="flex justify-center items-center h-screen min-w-[500px]">
            <h1 className="text-2xl font-semibold">User not found</h1>
          </div>
        )}
        <RightSidebar />
      </div>
    </div>
  );
}

export default Profile;
