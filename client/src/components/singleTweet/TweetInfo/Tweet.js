import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Avatar from "../../Avatar";

function Tweet() {
  const { post_id } = useParams();
  const tweets = useSelector((state) => state.tweetReducer.tweets);
  const tweet = tweets.find((tweet) => tweet.id === post_id);
  const userReducer = useSelector((state) => state.userReducer);
  const user = userReducer.user;
  const replies = tweets.filter(
    (tweet) => tweet.repliesTo === parseInt(post_id)
  );
  return (
    <div>
      {tweet && (
        <div
          key={tweet.id}
          className="flex border-b-2 border-[rgb(47,51,54)] p-4 flex-col"
        >
          <div className="mx-2"></div>
          <div className="flex w-full">
            <Link to={`/profile/${tweet.user}`}>
              <Avatar
                user={userReducer.users.find(
                  (usr) => tweet.user === usr.user_id
                )}
                size={50}
              />
            </Link>
            <div className="flex flex-row justify-between w-full px-2">
              <div className="">
                <Link className="flex flex-col" to={`/profile/${tweet.user}`}>
                  <h3 className="font-semibold text-lg">
                    {
                      userReducer.users.find(
                        (usr) => tweet.user === usr.user_id
                      ).username
                    }
                  </h3>
                  <h3 className="text-[rgb(91,112,131)]">@{tweet.user}</h3>
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
          </div>
          <p className="text-white text-lg font-semibold mt-2 mb-2 w-full overflow-hidden overflow-ellipsis whitespace-nowrap">
            {tweet.content}
          </p>
          <div className="flex flex-row">
            <h3 className="text-white">{tweet.likes}</h3>
            <h3 className="text-[rgb(91,112,131)]">Likes</h3>
            <h3 className="text-white">{replies.length}</h3>
            <h3 className="text-[rgb(91,112,131)]">Retweets</h3>
          </div>
          <div className="flex flex-col">
            <ul className="flex gap-6">
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
                  user.likes.includes(parseInt(post_id))
                    ? "text-red-500 hover:text-red-600"
                    : "bg-[rgb(91,112,131)]"
                }}`}
              >
                Like
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Tweet;
