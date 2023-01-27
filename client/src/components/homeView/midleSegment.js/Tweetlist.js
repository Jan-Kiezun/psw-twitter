import React, { useEffect } from "react";
import Avatar from "../../Avatar";
import { useSelector, useDispatch } from "react-redux";
import { getTweets } from "../../../features/twitter/tweetSlice";
import { getUsers } from "../../../features/twitter/userSlice";

function Tweetlist() {
  const tweets = useSelector((state) => state.tweetReducer.tweets);
  const tweetStatus = useSelector((state) => state.tweetReducer.status);
  const userStatus = useSelector((state) => state.userReducer.status);
  const userReducer = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!tweets.length) dispatch(getTweets());
    if (!userReducer.users.length) dispatch(getUsers());
  }, [dispatch, tweets, userReducer.users]);

  return (
    <div>
      {tweetStatus === "succeeded" &&
        userStatus === "succeeded" &&
        tweets
          .filter((tweet) => !tweet.repliesTo)
          .map((tweet) => (
            <div className="flex border-b-2 border-[rgb(47,51,54)] p-2">
              <div className="mx-2">
                <Avatar
                  user={userReducer.users.find(
                    (usr) => tweet.user === usr.user_id
                  )}
                  size={50}
                />
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-row">
                    <h3 className="font-semibold text-lg">
                      {
                        userReducer.users.find(
                          (usr) => tweet.user === usr.user_id
                        ).username
                      }
                    </h3>
                    <h3 className="text-[rgb(91,112,131)] ml-2">
                      @{tweet.user}
                    </h3>
                  </div>
                  <div className="flex flex-row">
                    <h3 className="text-[rgb(91,112,131)]">1h</h3>
                    <svg
                      className="w-5 h-5 ml-2 text-[rgb(91,112,131)]"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      fill="currentColor"
                    >
                      <g>
                        <path d="M12 2.25c-5.523 0-10 4.477-10 10s4.477 10 10 10 10-4.477 10-10-4.477-10-10-10zm0 18.75c-4.687 0-8.5-3.813-8.5-8.5s3.813-8.5 8.5-8.5 8.5 3.813 8.5 8.5-3.813 8.5-8.5 8.5z"></path>
                        <circle cx="12" cy="8.25" r="1.5"></circle>
                        <circle cx="12" cy="12" r="1.5"></circle>
                        <circle cx="12" cy="15.75" r="1.5"></circle>
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="text-lg">{tweet.content}</p>
                  <ul className="flex gap-6">
                    <li>Reply</li>
                    <li>Retweet</li>
                    <li>Like</li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default Tweetlist;
