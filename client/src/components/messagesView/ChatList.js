import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getMessages,
  addSecretChat,
} from "../../features/twitter/messageSlice";
import { getUsers } from "../../features/twitter/userSlice";
import { Link } from "react-router-dom";
import _ from "lodash";

function ChatList() {
  const dispatch = useDispatch();
  const messageReducer = useSelector((state) => state.messageReducer);
  const users = useSelector((state) => state.userReducer.users);
  const user = useSelector((state) => state.userReducer.user);
  const userReducer = useSelector((state) => state.userReducer);
  const allMessages = useSelector((state) => state.messageReducer.allMessages);
  const messagesUserList = useSelector((state) => state.messageReducer.users);
  const secretChats = useSelector((state) => state.messageReducer.secretChats);

  useEffect(() => {
    if (_.isEmpty(allMessages)) dispatch(getMessages(user.user_id));
    if (!userReducer.users.length) dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className="w-[300px] border-[rgb(47,51,54)] border-x-[1px] flex flex-col">
      {messageReducer.status === "succeeded" &&
        userReducer.status === "succeeded" &&
        messagesUserList.map((user) => (
          <Link key={`${user}userList`} to={`/messages/${user}`}>
            <div className="flex border-b-2 border-[rgb(47,51,54)] p-2 hover:bg-[rgba(47,51,54,0.5)]">
              <div className="mx-2 flex gap-2">
                <img
                  className="rounded-full w-10 h-10"
                  src={
                    users.find((usr) => user === usr.user_id)
                      .urlToProfilePicture
                  }
                  alt="profile"
                />
                <div>
                  <h4 className="font-semibold text-md">
                    {users.find((usr) => user === usr.user_id).username}
                  </h4>
                  <h4 className="text-[rgb(91,112,131)] text-sm">
                    {allMessages[user].slice(-1)[0].message.slice(0, 24) +
                      (allMessages[user].slice(-1)[0].message.length > 24
                        ? "..."
                        : "")}
                  </h4>
                </div>
              </div>
            </div>
          </Link>
        ))}
      {secretChats.length > 0 &&
        secretChats.map((chat) => (
          <Link key={`${chat}chatList`} to={`/messages/secretChat-${chat}`}>
            <div className="border-b-2 border-[rgb(47,51,54)] p-2">
              <div className="flex gap-2">
                <div className=" bg-[rgb(29,161,242)] rounded-full w-10 h-10 flex justify-center items-center  text-white "></div>
                <div>
                  <h4 className="font-semibold text-md">{chat}</h4>
                </div>
              </div>
            </div>
          </Link>
        ))}

      {messageReducer.status === "succeeded" &&
        userReducer.status === "succeeded" && (
          <div className="bg-gray-800/70 p-4 mt-auto">
            <form
              className="flex"
              onSubmit={(e) => {
                e.preventDefault();
                const chat_id = e.target[0].value;
                dispatch(addSecretChat(chat_id));
              }}
            >
              <input
                className=" bg-gray-700 text-white rounded-full px-4 py-2 font-semibold text-sm mr-2 w-full focus:outline-none focus:ring-2 focus:ring-[rgb(29,161,242)] focus:ring-opacity-50"
                type="text"
                placeholder="ChatName"
              />
              <button
                className=" bg-[rgb(29,161,242)] text-white rounded-full px-4 py-2 font-semibold text-sm hover:bg-[rgb(26,145,218)]"
                type="submit"
              >
                AddChat
              </button>
            </form>
          </div>
        )}
    </div>
  );
}

export default ChatList;
