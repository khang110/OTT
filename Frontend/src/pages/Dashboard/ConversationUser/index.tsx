import React, { useEffect, useState } from "react";

// hooks
import { useRedux } from "../../../hooks/index";

// actions
import {
  toggleUserDetailsTab,
  getChatUserConversations,
  onSendMessage,
  receiveMessage,
  readMessage,
  receiveMessageFromUser,
  deleteMessage,
  deleteUserMessages,
  toggleArchiveContact,
} from "../../../redux/actions";

// hooks
import { useProfile } from "../../../hooks";

// components
import UserHead from "./UserHead";
import Conversation from "./Conversation";
import ChatInputSection from "./ChatInputSection/index";

// interface
import { MessagesTypes } from "../../../data/messages";

// dummy data
import { pinnedTabs } from "../../../data/index";
import {getLoggedinUser} from "../../../api/apiCore";
import Pusher from "pusher-js";
import { formateDate } from "../../../utils/index";
import UserProfile from "../Settings/UserProfile";

interface IndexProps {
  isChannel: boolean;
}

const Index = ({ isChannel }: IndexProps) => {
  // global store
  const { dispatch, useAppSelector } = useRedux();
  const {
    chatUserDetails,
    chatUserConversations,
    isUserMessageSent,
    isMessageDeleted,
    isMessageForwarded,
    isUserMessagesDeleted,
    isImageDeleted,
    selectedChat
  } = useAppSelector(state => ({
    chatUserDetails: state.Chats.chatUserDetails,
    chatUserConversations: state.Chats.chatUserConversations,
    isUserMessageSent: state.Chats.isUserMessageSent,
    isMessageDeleted: state.Chats.isMessageDeleted,
    isMessageForwarded: state.Chats.isMessageForwarded,
    isUserMessagesDeleted: state.Chats.isUserMessagesDeleted,
    isImageDeleted: state.Chats.isImageDeleted,
    selectedChat: state.Chats.selectedChat,
  }));

  //console.log(selectedChat)
  //console.log(chatUserDetails)

  const onOpenUserDetails = () => {
    dispatch(toggleUserDetailsTab(true));
  };

  /*
  hooks
  */
  const { userProfile } = useProfile();

  /*
  reply handling
  */
  const [replyData, setReplyData] = useState<
    null | any | undefined
  >();
  const onSetReplyData = (reply: null | MessagesTypes | undefined) => {
    setReplyData(reply);
  };

  /*
  send message
  */
  const onSend = (data: any) => {
    console.log(data)
    const formData = new FormData();
    // let params: any = {
    //   message: data.text && data.text,
    //   time: new Date().toISOString(),
    //   image: data.image && data.image,
    //   file: data.attachments[0].downloadLink && data.attachments[0].downloadLink,
    //   receiver_id: chatUserDetails.id,
    //   sender: userProfile.id,
    // };
    formData.append("message", data.text && data.text);
    formData.append("time", new Date().toISOString());
    formData.append("receiver_id", chatUserDetails.id);
    formData.append("sender", userProfile.id);
    if (data.attachments) {
      formData.append("file", data.attachments[0].downloadLink && data.attachments[0].downloadLink);
    }
    if (replyData && replyData !== null) {
      formData.append("replyOf", replyData);
    }

    dispatch(onSendMessage(formData));
    if (!isChannel) {
      setTimeout(() => {
        dispatch(receiveMessage(chatUserDetails.id));
      }, 1000);
      setTimeout(() => {
        dispatch(readMessage(chatUserDetails.id));
      }, 1500);
      setTimeout(() => {
        dispatch(receiveMessageFromUser(chatUserDetails.id));
      }, 2000);
    }
    setReplyData(null);

    let pusher: Pusher;
// @ts-ignore
    pusher = new Pusher('209d4dd42254dc67e057', {
      cluster: 'ap1'
    });
    Pusher.logToConsole = true;
    const channel = pusher.subscribe('chat');
    channel.bind('send', (data: any) => {
      if(getLoggedinUser().user.id == data.data.receiver) {
        const conv = document.getElementById("chat-conversation-list");
        const li = document.createElement("li");
        li.setAttribute('class','chat-list');
        const conversation_list = document.createElement("div");
        conversation_list.setAttribute('class','conversation-list')
        const chat_avatar = document.createElement("div");
        chat_avatar.setAttribute('class','chat-avatar')
        const user_chat_content = document.createElement("div");
        user_chat_content.setAttribute('class','user-chat-content')
        const ctext_wrap = document.createElement("div");
        ctext_wrap.setAttribute('class','ctext-wrap')
        const ctext_wrap_content = document.createElement("div");
        ctext_wrap_content.setAttribute('class','ctext-wrap-content');
        const mb_0_ctext_content = document.createElement("p");
        mb_0_ctext_content.setAttribute('class','mb-0 ctext-content');
        mb_0_ctext_content.innerText = data.data.message;
        ctext_wrap_content.appendChild(mb_0_ctext_content);
        const conversation_name = document.createElement("div");
        conversation_name.setAttribute('class','conversation-name');
        conversation_name.innerHTML = "-" + '<small className="text-muted mb-0 ms-2">' + formateDate(data.data.created_at) + '</small>';
        user_chat_content.appendChild(conversation_name);
        ctext_wrap.appendChild(ctext_wrap_content);
        user_chat_content.appendChild(ctext_wrap);
        conversation_list.appendChild(chat_avatar);
        conversation_list.appendChild(user_chat_content);
        li.appendChild(conversation_list);
        console.log(chatUserDetails);
        console.log(userProfile);
        console.log('login_id_'+getLoggedinUser().user.id);
        console.log('receiver_id_'+data.data.receiver);
        console.log(data.data.sender)
        console.log(chatUserDetails.id)
        if(conv && (data.data.sender == chatUserDetails.id)) {
          conv.appendChild(li);
        }
      }
    });
  };

  useEffect(() => {
    if (
      isUserMessageSent ||
      isMessageDeleted ||
      isMessageForwarded ||
      isUserMessagesDeleted ||
      isImageDeleted
    ) {
      dispatch(getChatUserConversations(chatUserDetails.id));
    }
  }, [
    dispatch,
    isUserMessageSent,
    chatUserDetails,
    isMessageDeleted,
    isMessageForwarded,
    isUserMessagesDeleted,
    isImageDeleted,
  ]);

  const onDeleteMessage = (messageId: string | number) => {
    dispatch(deleteMessage(chatUserDetails.id, messageId));
  };

  const onDeleteUserMessages = () => {
    dispatch(deleteUserMessages(chatUserDetails.id));
  };

  const onToggleArchive = () => {
    dispatch(toggleArchiveContact(chatUserDetails.id));
  };

  return (
    <>
      <UserHead
        chatUserDetails={chatUserDetails}
        pinnedTabs={pinnedTabs}
        onOpenUserDetails={onOpenUserDetails}
        onDelete={onDeleteUserMessages}
        isChannel={isChannel}
        onToggleArchive={onToggleArchive}
      />
      <Conversation
        chatUserConversations={chatUserConversations}
        chatUserDetails={chatUserDetails}
        onDelete={onDeleteMessage}
        onSetReplyData={onSetReplyData}
        isChannel={isChannel}
      />
      <ChatInputSection
        onSend={onSend}
        replyData={replyData}
        onSetReplyData={onSetReplyData}
        chatUserDetails={chatUserDetails}
      />
    </>
  );
};
export default Index;
