import React, {useEffect} from "react";
import classnames from "classnames";
import { io } from 'socket.io-client';
// hooks
import { useRedux } from "../../hooks/index";

// hooks
import { useConversationUserType } from "../../hooks/index";

// component
import Leftbar from "./Leftbar";
import ConversationUser from "./ConversationUser/index";
import UserProfileDetails from "./UserProfileDetails/index";
import Welcome from "./ConversationUser/Welcome";
import {APIClient} from '../../api/apiCore';
import * as url from '../../api/urls';
//const socket = io('http://192.168.1.37:6000');

const api = new APIClient();
// const updateSocketId = (userID: string, socketID: string) => {
//   return api.create(url.POST_UPDATE_SOCKET_ID + "/" + userID + "/" + socketID);
// };
interface IndexProps {}
const Index = (props: IndexProps) => {
  // global store
  const { useAppSelector } = useRedux();

  const { selectedChat } = useAppSelector(state => ({
    selectedChat: state.Chats.selectedChat,
  }));

  const { isChannel } = useConversationUserType();

  useEffect(() => {
    // socket.on('me', (id) => {
    //   updateSocketId(JSON.parse(localStorage.getItem("authUser")!).user.id, id);
    //   console.log("1: " + id)
    // });
  })

  return (
    <>
      <Leftbar />

      <div
        className={classnames("user-chat", "w-100", "overflow-hidden", {
          "user-chat-show": selectedChat,
        })}
        id="user-chat"
      >
        <div className="user-chat-overlay" id="user-chat-overlay"></div>
        {selectedChat !== null ? (
          <div className="chat-content d-lg-flex">
            <div className="w-100 overflow-hidden position-relative">
              <ConversationUser isChannel={isChannel} />
            </div>
            <UserProfileDetails isChannel={isChannel} />
          </div>
        ) : (
          <Welcome />
        )}
      </div>
    </>
  );
};

export default Index;
