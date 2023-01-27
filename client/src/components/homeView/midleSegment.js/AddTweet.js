import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";

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
          className="bg-black outline-none text-white w-full p-2 resize-none overflow-hidden min-h-[50px] text-lg"
          placeholder="What's happening?"
          ref={textareaRef}
          value={tweetContent}
          onChange={textareaOnChange}
        />
        <div className="flex flex-row-reverse">
          <button
            className={`bg-blue-500 px-4 py-1 rounded-full text-white font-semibold ${
              tweetContent ? "" : "opacity-50 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!tweetContent}
          >
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTweet;
