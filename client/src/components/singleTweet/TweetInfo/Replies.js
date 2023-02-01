import React from "react";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Avatar from "../../Avatar";

function Replies() {
  const { post_id } = useParams();
  const tweetReducer = useSelector((state) => state.tweetReducer);
  const tweet = tweetReducer.tweets.find((tweet) => tweet.id === post_id);
  const replies = tweetReducer.tweets.filter(
    (tweet) => tweet.repliesTo === parseInt(post_id)
  );
  const userReducer = useSelector((state) => state.userReducer);
  const user = userReducer.user;

  console.log(replies, tweet);

  return (
    <div>
      {replies &&
        tweet &&
        replies.map((reply) => (
          <div
            key={reply.id}
            className="flex border-b-2 border-[rgb(47,51,54)] p-2"
          >
            <div className="mx-2">
              <Link to={`/profile/${reply.user}`}>
                <Avatar
                  user={userReducer.users.find(
                    (usr) => reply.user === usr.user_id
                  )}
                  size={50}
                />
              </Link>
            </div>
            <div className="flex flex-col w-full">
              <Link to={`/post/${reply.id}`} key={reply.id}>
                <div className="flex flex-row justify-between">
                  <div className="">
                    <Link
                      className="flex flex-row"
                      to={`/profile/${reply.user}`}
                    >
                      <h3 className="font-semibold text-lg">
                        {
                          userReducer.users.find(
                            (usr) => reply.user === usr.user_id
                          ).username
                        }
                      </h3>
                      <h3 className="text-[rgb(91,112,131)] ml-2">
                        @{reply.user}
                      </h3>
                    </Link>
                  </div>
                  <div className="flex flex-row">
                    <h3 className="text-[rgb(91,112,131)]">
                      {new Date(reply.date).toLocaleString()}
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
              </Link>
              <div className="flex flex-col">
                <Link to={`/post/${reply.id}`} key={reply.id}>
                  <p className="text-lg">{reply.content}</p>
                </Link>
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
                    className={`${
                      user.likes.includes(parseInt(reply.id))
                        ? "text-red-500"
                        : "text-[rgb(91,112,131)]"
                    }
                        hover:text-[rgb(29,161,242)]
                        cursor-pointer`}
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

export default Replies;
