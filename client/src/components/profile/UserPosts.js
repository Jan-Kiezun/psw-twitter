import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Avatar from "../Avatar";
import { useParams, Link } from "react-router-dom";

function UserPosts() {
  const tweets = useSelector((state) => state.tweetReducer.tweets);
  const tweetStatus = useSelector((state) => state.tweetReducer.status);
  const tweetReducer = useSelector((state) => state.tweetReducer);
  const userStatus = useSelector((state) => state.userReducer.status);
  const userReducer = useSelector((state) => state.userReducer);
  const user = userReducer.user;
  const dispatch = useDispatch();
  const { user_id } = useParams();

  console.log("user_id", user_id, user);

  return (
    <div>
      <div className="text-xl font-semibold border-b-2 border-[rgb(47,51,54)] h-16 flex items-center justify-center">
        <span className="ml-2">User tweets:</span>
      </div>
      {tweetStatus === "succeeded" &&
        userStatus === "succeeded" &&
        tweets &&
        tweets
          // .filter((tweet) => !tweet.repliesTo)
          .filter((tweet) => tweet.user === user_id)
          .map((tweet) => (
            <div
              key={tweet.id}
              className="flex border-b-2 border-[rgb(47,51,54)] p-2"
            >
              <div className="mx-2">
                <Link to={`/profile/${tweet.user}`}>
                  <Avatar
                    user={userReducer.users.find(
                      (usr) => tweet.user === usr.user_id
                    )}
                    size={50}
                  />
                </Link>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-row justify-between">
                  <div className="">
                    <Link
                      className="flex flex-row"
                      to={`/profile/${tweet.user}`}
                    >
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
                    </Link>
                  </div>
                  <div className="flex flex-row">
                    <h3 className="text-[rgb(91,112,131)]">
                      {new Date(tweet.date).toLocaleString()}
                    </h3>
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
                  <p className="text-lg">
                    {tweet.repliesTo && (
                      <Link
                        className="text-[rgb(91,112,131)]"
                        to={`/post/${tweet.repliesTo}`}
                      >
                        {"@"}
                        {
                          tweetReducer.tweets.find(
                            (tw) => tw.id === tweet.repliesTo + ""
                          ).user
                        }
                      </Link>
                    )}
                    <Link to={`/post/${tweet.id}`} key={tweet.id}>
                      {tweet.content}
                    </Link>
                  </p>
                  <ul className="flex gap-6">
                    <li
                      className="text-[rgb(91,112,131)]
                        hover:text-[rgb(29,161,242)]
                        cursor-pointer"
                    >
                      Reply
                    </li>
                    <li
                      className="text-[rgb(91,112,131)]
                        hover:text-[rgb(29,161,242)]
                        cursor-pointer"
                      onClick={() => {}}
                    >
                      Retweet
                    </li>
                    <li
                      className={`hover:text-[rgb(29,161,242)]
                      cursor-pointer ${
                        user.likes.includes(parseInt(tweet.id))
                          ? "text-red-500 hover:text-red-600"
                          : "bg-[rgb(91,112,131)]"
                      }}`}
                    >
                      Like
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
}

export default UserPosts;
