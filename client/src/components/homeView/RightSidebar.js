import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchTweets } from "../../features/twitter/tweetSlice";
import { searchUsers } from "../../features/twitter/userSlice";

function RightSidebar() {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    const query = searchValue.trim();
    if (/^@/.test(query)) {
      dispatch(searchUsers(query.slice(1)));
      navigate(`/search/users/${query.slice(1)}`);
    } else {
      dispatch(searchTweets(query));
      navigate(`/search/tweets/${query}`);
    }
  };

  return (
    <div className="w-full min-w-[300px] m-4 flex h-12">
      <form className="w-full" onSubmit={submitHandler}>
        <input
          type="search"
          placeholder="Search Twitter"
          className="w-full h-full p-2 pl-4 border-2 border-[rgb(47,51,54)] bg-gray-800  rounded-full
          focus:outline-none focus:ring-2 focus:ring-[rgb(91,112,131)]
          focus:border-transparent
          placeholder-[rgb(91,112,131)]
          placeholder-opacity-50
          "
          value={searchValue}
          onChange={(e) =>
            setSearchValue(
              e.target.value.replace(/[^a-zA-Z0-9]/, "").length > 15
                ? searchValue
                : e.target.value
            )
          }
        />
        <input type="submit" value="Search" className="hidden" />
      </form>
    </div>
  );
}

export default RightSidebar;
