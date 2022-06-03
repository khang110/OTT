import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../pages/VideoCall/Context';
import user from '../assets/images/users/user.jpg';
import user2 from '../assets/images/users/avatar-2.jpg';
import user3 from '../assets/images/users/avatar-3.jpg';
import attachment from '../assets/images/attachment.png';

const FooterCall = () => {

    return (
        <div className="chat-footer">
            <div className="call-icons">
                <span className="call-duration">00:59</span>
                <ul className="call-items">
                    <li className="call-item">
                        <a href="" title="Enable Video" data-placement="top" data-toggle="tooltip">
                            <i className="fa fa-video-camera camera"></i>
                        </a>
                    </li>
                    <li className="call-item">
                        <a href="" title="Mute Audio" data-placement="top" data-toggle="tooltip">
                            <i className="fa fa-microphone microphone"></i>
                        </a>
                    </li>
                    <li className="call-item">
                        <a href="" title="Add User" data-placement="top" data-toggle="tooltip">
                            <i className="fa fa-user-plus"></i>
                        </a>
                    </li>
                    <li className="call-item">
                        <a href="" title="Full Screen" data-placement="top" data-toggle="tooltip">
                            <i className="fa fa-arrows-v full-screen"></i>
                        </a>
                    </li>
                </ul>
                <div className="end-call">
                    <a href="">
                        End Call
                    </a>
                </div>
            </div>
        </div>
    );
};

export default FooterCall;
