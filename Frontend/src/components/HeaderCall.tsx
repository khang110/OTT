import React, { useContext } from 'react';
import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from '../pages/VideoCall/Context';
import user from '../assets/images/users/user.jpg';
import user2 from '../../assets/images/users/avatar-2.jpg';
import user3 from '../../assets/images/users/avatar-3.jpg';
import attachment from '../../assets/images/attachment.png';

const HeaderCall = () => {

  return (
    <div className="navbar">
      <div className="user-details mr-auto">
        <div className="float-left user-img m-r-10">
          <a href="" title="Mike Litorus">
            <img src={user} alt="" className="w-40 rounded-circle" />
            <span className="status online"></span>
          </a>
        </div>
        <div className="user-info float-left">
          <a href="" title="Mike Litorus"><span className="font-bold">Nguyễn Anh Khang</span></a>
          <span className="last-seen">Online</span>
        </div>
      </div>
      <ul className="nav custom-menu">
        <li className="nav-item">
          <a className="task-chat profile-rightbar float-right" href="#chat_sidebar" id="task_chat"><i aria-hidden="true" className="fa fa-comments"></i></a>
        </li>
        <li className="nav-item dropdown dropdown-action">
          <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="fa fa-cog"></i></a>
          <div className="dropdown-menu dropdown-menu-right">
            <a href="javascript:void(0)" className="dropdown-item">Settings</a>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default HeaderCall;
