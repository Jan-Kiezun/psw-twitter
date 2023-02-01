import React from "react";
import { useParams } from "react-router-dom";
import SearchedUsers from "./SearchedUsers";
import SearchedTweets from "./SearchedTweets";
import RightSidebar from "../homeView/RightSidebar";

function SearchResults() {
  const { search_type, query } = useParams();
  return (
    <div className="min-h-screen flex justify-between">
      {search_type === "users" ? (
        <SearchedUsers query={query} />
      ) : (
        <SearchedTweets query={query} />
      )}
      <RightSidebar />
    </div>
  );
}

export default SearchResults;
