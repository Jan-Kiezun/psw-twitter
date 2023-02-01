import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  postMessage,
  getMessages,
  addSecretMessage,
} from "../../features/twitter/messageSlice";
import { getUsers } from "../../features/twitter/userSlice";
import _ from "lodash";

function ChatRoom() {
  const { user_id: chat_id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);
  const userReducer = useSelector((state) => state.userReducer);
  const users = useSelector((state) => state.userReducer.users);
  const allMessages = useSelector((state) => state.messageReducer.allMessages);
  const messageReducer = useSelector((state) => state.messageReducer);
  const secretChatsMessages = useSelector(
    (state) => state.messageReducer.secretChatsMessages
  );

  const true_chat_id =
    chat_id && chat_id.length > 11
      ? chat_id.slice(11, chat_id.length)
      : chat_id;
  const messages =
    chat_id &&
    userReducer.status === "succeeded" &&
    messageReducer.status === "succeeded"
      ? /secretChat-/.test(chat_id)
        ? secretChatsMessages[true_chat_id] || []
        : allMessages[chat_id] || []
      : [];

  const ws = useRef(null);
  const postSecretMessage = ({ from, to, message }) => {
    ws.current.send(
      JSON.stringify({
        sender: from,
        room: to,
        body: message,
      })
    );
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const message = {
      user_id: user.user_id,
      message: e.target[0].value,
      timestamp: Math.floor(Date.now() / 1000),
    };
    if (/secretChat-/.test(chat_id))
      postSecretMessage({
        from: user.user_id,
        to: chat_id,
        message: message,
      });
    else
      dispatch(
        postMessage({
          from: user.user_id,
          to: chat_id,
          message: message,
        })
      );
    e.target[0].value = "";
  };

  useEffect(() => {
    if (/secretChat-/.test(chat_id)) {
      ws.current = new WebSocket("ws://localhost:8080");

      ws.current.onopen = () => {
        console.log("connected");
      };

      ws.current.onmessage = (e) => {
        const { user_id, room, message } = JSON.parse(e.data);
        dispatch(
          addSecretMessage({
            from: user_id,
            to: room,
            message: message,
          })
        );
      };

      ws.current.onclose = () => {
        console.log("disconnected");
      };
      return () => {
        ws.current.close();
      };
    }
  }, [chat_id]);

  return (
    <div className="w-[500px]">
      {chat_id &&
      userReducer.status === "succeeded" &&
      messageReducer.status === "succeeded" ? (
        <div className="flex flex-col">
          {!/secretChat-/.test(chat_id) ? (
            <div className="flex gap-2 p-[10px] border-b-2 border-[rgb(47,51,54)] items-center">
              <img
                className="rounded-full w-10 h-10"
                src={
                  users.find((usr) => chat_id === usr.user_id)
                    .urlToProfilePicture
                }
                alt="profile"
              />
              <h4 className="font-semibold text-xl">
                {users.find((usr) => chat_id === usr.user_id).username}
              </h4>
            </div>
          ) : (
            <div className="flex gap-2 p-[10px] border-b-2 border-[rgb(47,51,54)] items-center">
              <h4 className="font-semibold text-xl">{chat_id}</h4>
            </div>
          )}
          <div className="flex flex-col gap-2">
            {messages.map((message) => (
              <div
                key={
                  true_chat_id + messages.length + "message" + message.timestamp
                }
                className={`${
                  user.user_id === message.user_id ? "ml-auto" : ""
                }`}
              >
                <div
                  className={`flex gap-2 p-2 rounded-[20px] w-fit max-w-[400px] ${
                    user.user_id === message.user_id
                      ? "flex-row-reverse pl-4 rounded-r-none"
                      : "pr-4 rounded-l-none"
                  }`}
                >
                  <img
                    className="rounded-full mt-1 w-10 h-10"
                    src={
                      users.find((usr) => message.user_id === usr.user_id)
                        .urlToProfilePicture
                    }
                    alt="profile"
                  />
                  <div className="flex flex-col p-3 rounded-[20px] bg-[rgba(91,112,131,0.3)]">
                    {/* <h4
                      className={`text-[rgb(91,112,131)] font-semibold text-sm ${
                        !(true_chat_id === message.user_id) && "text-right"
                      }`}
                    >
                      {
                        users.find((usr) => message.user_id === usr.user_id)
                          .username
                      }
                    </h4> */}
                    <h4 className={`text-md break-words`}>{message.message}</h4>
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
      {chat_id && (
        <div className="absolute bottom-0 w-[500px]">
          <form onSubmit={sendMessage}>
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
