import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { getTweets } from "./features/twitter/tweetSlice";
import { getUsers } from "./features/twitter/userSlice";

import LeftSidebar from "./components/LeftNavbar";
import Home from "./components/homeView/Home";
import Messages from "./components/messagesView/Messages";
import Profile from "./components/profile/Profile";
import Login from "./components/Login";

function App() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.userReducer.users);
  const user = useSelector((state) => state.userReducer.user);
  const tweets = useSelector((state) => state.tweetReducer.tweets);

  useEffect(() => {
    if (tweets === []) dispatch(getTweets());
    if (users === []) dispatch(getUsers());
  }, [dispatch, tweets, users]);

  return (
    <Router>
      {_.isEmpty(user) && <Login />}
      <div className="w-full bg-black flex justify-center font-sans">
        <div className=" max-w-[1100px] min-h-screen flex justify-between text-[rgb(231,233,234)]">
          <LeftSidebar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:user_id" element={<Messages />} />
            <Route path="/profile/:user_id" element={<Profile />} />

            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
