import React, { useEffect } from "react";
import TweetInfo from "./TweetInfo";
import RightSidebar from "../homeView/RightSidebar";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getTweets } from "../../features/twitter/tweetSlice";
import { getUsers } from "../../features/twitter/userSlice";

function TweetPage() {
  const { tweet_id } = useParams();
  const dispatch = useDispatch();
  const tweets = useSelector((state) => state.tweetReducer.tweets);
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (!tweets.length) dispatch(getTweets());
    if (!userReducer.users.length) dispatch(getUsers());
  }, [dispatch, tweets, userReducer.users]);
  return (
    <div className="min-h-screen flex justify-between">
      <TweetInfo />
      <RightSidebar />
    </div>
  );
}

export default TweetPage;
