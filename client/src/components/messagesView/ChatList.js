import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMessages } from "../../features/twitter/messageSlice";
import { Link } from "react-router-dom";

function ChatList() {
  const dispatch = useDispatch();
  const messageReducer = useSelector((state) => state.messageReducer);
  const users = useSelector((state) => state.userReducer.users);
  const user = useSelector((state) => state.userReducer.user);
  const allMessages = useSelector((state) => state.messageReducer.allMessages);
  const messagesUserList = useSelector((state) => state.messageReducer.users);

  useEffect(() => {
    dispatch(getMessages(user.user_id));
  }, [dispatch]);

  return (
    <div className="w-[300px] border-[rgb(47,51,54)] border-x-[1px] flex flex-col">
      {messageReducer.status === "succeeded" &&
        messagesUserList.map((user) => (
          <Link to={`/messages/${user}`}>
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
                    {allMessages[user].slice(-1)[0].message.slice(0, 15) +
                      (allMessages[user].slice(-1)[0].message.length > 15
                        ? "..."
                        : "")}
                  </h4>
                </div>
              </div>
            </div>
          </Link>
        ))}
    </div>
  );
}

export default ChatList;
