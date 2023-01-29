import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postMessage, getMessages } from "../../features/twitter/messageSlice";
import { getUsers } from "../../features/twitter/userSlice";
import _ from "lodash";

function ChatRoom() {
  const { user_id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userReducer = useSelector((state) => state.userReducer);
  const users = useSelector((state) => state.userReducer.users);
  const allMessages = useSelector((state) => state.messageReducer.allMessages);
  const messageReducer = useSelector((state) => state.messageReducer);

  return (
    <div className="w-[500px]">
      {user_id &&
      userReducer.status === "succeeded" &&
      messageReducer.status === "succeeded" ? (
        <div className="flex flex-col">
          <div className="flex gap-2 p-[10px] border-b-2 border-[rgb(47,51,54)] items-center">
            <img
              className="rounded-full w-10 h-10"
              src={
                users.find((usr) => user_id === usr.user_id).urlToProfilePicture
              }
              alt="profile"
            />
            <h4 className="font-semibold text-xl">
              {users.find((usr) => user_id === usr.user_id).username}
            </h4>
          </div>
          <div className="flex flex-col gap-2">
            {allMessages[user_id].map((message) => (
              <div
                key={
                  user_id +
                  allMessages[user_id].length +
                  "message" +
                  message.timestamp
                }
                className={`${!(user_id === message.user_id) ? "ml-auto" : ""}`}
              >
                <div
                  className={`flex gap-2 bg-[rgba(91,112,131,0.3)] w-fit ${
                    !(user_id === message.user_id)
                      ? "flex-row-reverse p-2 pl-4 rounded-[20px] rounded-r-none"
                      : "p-2 pr-4 rounded-[20px] rounded-l-none"
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
                    <h4
                      className={`text-[rgb(91,112,131)] font-semibold text-sm ${
                        !(user_id === message.user_id) && "text-right"
                      }`}
                    >
                      {
                        users.find((usr) => message.user_id === usr.user_id)
                          .username
                      }
                    </h4>
                    <h4
                      className={`text-md break-words ${
                        !(user_id === message.user_id) && "text-right"
                      }`}
                    >
                      {message.message}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h4 className="text-[rgb(91,112,131)] text-md">
            Select a chat to start messaging
          </h4>
        </div>
      )}
      {user_id && (
        <div className="absolute bottom-0 w-[500px]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const message = {
                user_id: user.user_id,
                message: e.target[0].value,
                timestamp: Math.floor(Date.now() / 1000),
              };
              dispatch(
                postMessage({
                  from: user.user_id,
                  to: user_id,
                  message: message,
                })
              );
              e.target[0].value = "";
            }}
          >
            <input
              className="w-full p-2 border-t-2 border-[rgb(47,51,54)] bg-gray-800 text-md
              focus:outline-none focus:ring-2 focus:ring-[rgb(91,112,131)]
              focus:border-transparent
              placeholder-[rgb(91,112,131)]
              placeholder-opacity-50
              "
              type="text"
              placeholder="Type a message"
            />
            <input className="hidden" type="submit" />
          </form>
        </div>
      )}
    </div>
  );
}

export default ChatRoom;
