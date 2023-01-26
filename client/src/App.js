import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

import LeftSidebar from "./components/LeftNavbar";
import Home from "./components/homeView/Home";
import Messages from "./components/messagesView/Messages";
import Profile from "./components/Profile";
import Login from "./components/Login";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  return (
    <Router>
      {_.isEmpty(user) && <Login />}
      <div className="w-full bg-black flex justify-center font-sans">
        <div className=" max-w-[1100px] min-h-screen flex justify-between text-[rgb(231,233,234)]">
          <LeftSidebar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
