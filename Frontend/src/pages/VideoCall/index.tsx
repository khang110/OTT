import React, { createContext, useEffect, useState, useRef } from 'react';
import { ContextProvider } from './Context';
import VideoPlayer from '../../components/VideoPlayer';
import Sidebar from '../../components/Sidebar';
import Notifications from '../../components/Notifications';
import HeaderCall from '../../components/HeaderCall';
import FooterCall from '../../components/FooterCall';
import user from '../../assets/images/users/user.jpg';
import user2 from '../../assets/images/users/avatar-2.jpg';
import user3 from '../../assets/images/users/avatar-3.jpg';
import attachment from '../../assets/images/attachment.png';
import { Provider } from "react-redux";
import { configureStore } from "../../redux/store";
// hooks
import { useRedux } from "../../hooks/index";
interface IndexProps { }

const Index = (props: IndexProps) => {
  // global store
  const { useAppSelector } = useRedux();

  const { selectedChat } = useAppSelector(state => ({
    selectedChat: state.Chats.selectedChat,
  }));
  useEffect(() => {
    console.log(selectedChat)

  })

  return (
    <Provider store={configureStore({})}>
    <div className="chat-main-row">
      <div className="chat-main-wrapper">
        <div className="col-lg-9 message-view chat-view">
          <div className="chat-window">
            <div className="fixed-header">      
                <HeaderCall/>
            </div>
            <ContextProvider>
              <VideoPlayer />
              <Sidebar>
                <Notifications />
              </Sidebar>
            </ContextProvider>
            
            <FooterCall/>
          </div>
        </div>
        <div className="col-lg-3 message-view chat-profile-view chat-sidebar">
          <div className="chat-window video-window">
            <div className="fixed-header">
              <ul className="nav nav-tabs nav-tabs-bottom">
                <li className="nav-item"><a className="nav-link active" href="#chats_tab" data-toggle="tab">Tin nhắn</a></li>
              </ul>
            </div>
            <div className="tab-content chat-contents">

              <div className="content-full tab-pane show active" id="chats_tab">
                <div className="chat-window">
                  <div className="chat-contents">
                    <div className="chat-content-wrap">
                      <div className="chat-wrap-inner">
                        <div className="chat-box">
                          <div className="chats">
                            <div className="chat chat-left">
                              <div className="chat-avatar">
                                <a href="profile.html" className="avatar">
                                  <img alt="John Doe" src={user} className="img-fluid rounded-circle" />
                                </a>
                              </div>
                              <div className="chat-body">
                                <div className="chat-bubble">
                                  <div className="chat-content">
                                    <span className="chat-user">John Doe</span> <span className="chat-time">8:35 am</span>
                                    <p>I'm just looking around.</p>
                                    <p>Will you tell me something about yourself? </p>
                                  </div>
                                </div>
                              </div>
                            </div>


                            <div className="chat-line">
                              <span className="chat-date">January 29th, 2017</span>
                            </div>
                            <div className="chat chat-left">
                              <div className="chat-avatar">
                                <a href="profile.html" className="avatar">
                                  <img alt="Jeffery Lalor" src={user} className="img-fluid rounded-circle" />
                                </a>
                              </div>
                              <div className="chat-body">
                                <div className="chat-bubble">
                                  <div className="chat-content">
                                    <span className="chat-user">Jeffery Lalor</span> <span className="file-attached">attached file <i className="fa fa-paperclip"></i></span> <span className="chat-time">Today at 12:42pm</span>
                                    <ul className="attach-list">
                                      <li className="img-file">
                                        <div className="attach-img-download"><a href="#">avatar-1.jpg</a></div>
                                        <div className="attach-img"><img src={user} alt="" /></div>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="chat-footer">
                    <div className="message-bar">
                      <div className="message-inner">
                        <a className="link attach-icon" href="#" data-toggle="modal" data-target="#drag_files"><img src={attachment} alt="" /></a>
                        <div className="message-area">
                          <div className="input-group">
                            <textarea className="form-control" placeholder="Type message..."></textarea>
                            <span className="input-group-append">
                              <button className="btn btn-primary" type="button"><i className="fa fa-send"></i></button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
    </Provider>
  );
}

export default Index;