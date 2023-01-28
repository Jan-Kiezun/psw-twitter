import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

function ChatRoom() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const users = useSelector((state) => state.userReducer.users);
  const allMessages = useSelector((state) => state.messageReducer.allMessages);

  return (
    <div className="w-[500px]">
      {id && users !== [] && (
        <div className="flex flex-col">
          <div className="flex gap-2 p-2 border-b-2 border-[rgb(47,51,54)]">
            <img
              className="rounded-full w-10 h-10"
              src={users.find((usr) => id === usr.user_id).urlToProfilePicture}
              alt="profile"
            />
            <h4 className="font-semibold text-md">
              {users.find((usr) => id === usr.user_id).username}
            </h4>
          </div>
          <div className="flex flex-col gap-2 p-2">
            {allMessages[id].map((message) => (
              <div
                key={id + message.timestamp}
                className={`flex gap-2 ${
                  !(id === message.user_id) && "flex-row-reverse"
                }`}
              >
                <img
                  className="rounded-full w-10 h-10"
                  src={
                    users.find((usr) => message.user_id === usr.user_id)
                      .urlToProfilePicture
                  }
                  alt="profile"
                />
                <div className="flex flex-col">
                  <h4 className="font-semibold text-md">
                    {
                      users.find((usr) => message.user_id === usr.user_id)
                        .username
                    }
                  </h4>
                  <h4 className="text-[rgb(91,112,131)] text-sm">
                    {message.message}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="absolute bottom-0 w-[500px]">
        <input
          className="w-full text-black border-[rgb(47,51,54)] border-[1px] rounded-[20px] p-2 outline-none"
          type="text"
          placeholder="Type a message"
        />
      </div>
    </div>
  );
}

export default ChatRoom;
