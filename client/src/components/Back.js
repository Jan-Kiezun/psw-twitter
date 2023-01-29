import React from "react";
import { useNavigate } from "react-router-dom";

function Back({ text }) {
  const navigate = useNavigate();
  return (
    <div className="text-xl font-semibold border-b-2 border-[rgb(47,51,54)]">
      <button
        className="
        text-2xl font-semibold p-4 px-6
        focus:outline-none
        hover:bg-gray-800
      "
        onClick={() => navigate(-1)}
      >
        {"<"}
      </button>
      <span className="ml-2">{text}</span>
    </div>
  );
}

export default Back;
