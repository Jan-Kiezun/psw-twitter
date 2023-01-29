import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";

import Avatar from "../../Avatar";

function AddTweet() {
  const user = useSelector((state) => state.userReducer.user);
  const [tweetContent, setTweetContent] = useState("");
  const textareaRef = useRef(null);

  const textareaOnChange = (e) => {
    const target = e.target;
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${target.scrollHeight}px`;
    setTweetContent(target.value.length > 280 ? tweetContent : target.value);
  };

  return (
    <div className="flex border-b-2 border-[rgb(47,51,54)] p-2">
      <div className="mx-2">
        <Avatar user={user} size={50} />
      </div>

      <form
        className="flex flex-col w-full"
        onSubmit={(e) => {
          e.preventDefault();
          console.log(tweetContent);
          setTweetContent("");
        }}
      >
        <textarea
          className="w-full p-2 bg-black
          focus:outline-none focus:ring-2 focus:ring-[rgb(47,51,54)]
          focus:border-transparent
          placeholder-[rgb(91,112,131)]
          placeholder-opacity-50
          resize-none
          "
          placeholder="What's happening?"
          ref={textareaRef}
          value={tweetContent}
          onChange={textareaOnChange}
        />
        <div className="flex flex-row-reverse">
          {!_.isEmpty(user) && (
            <button
              className={`bg-blue-500 px-4 py-1 mt-2 rounded-full text-white font-semibold ${
                tweetContent ? "" : "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              disabled={!tweetContent}
            >
              Tweet
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default AddTweet;
