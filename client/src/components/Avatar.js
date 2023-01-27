import React from "react";

function Avatar({ user, size = 50, className = "", ...props }) {
  return (
    <img
      className="rounded-full mr-2"
      draggable="false"
      width={size}
      alt="Usr"
      src={user.urlToProfilePicture}
    />
  );
}

export default Avatar;
