import React from "react";
import LeftSidebar from "./components/LeftNavbar";
import Home from "./components/homeView/Home";
import Messages from "./components/messagesView/Messages";
import Profile from "./components/Profile";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  return (
    <Router>
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
