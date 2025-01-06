import React from 'react';
import { FaUserFriends, FaHandshake, FaToolbox, FaUsers, FaCalendarAlt, FaBell, FaDonate, FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className='side-heading'>
       <h1> SkyConnect </h1>
      </div>
      <div className='side-bar'>
      <Link to="/dash">
        <div className='sidebar-con'>
          <FaHome />
          Home
        </div>
        </Link>
        <Link to="/dash/friend">
        <div className='sidebar-con'>
          <FaUserFriends />
          Friends
        </div>
        </Link>
        <Link to="/dash/skills">
        <div className='sidebar-con'>
          <FaHandshake />
          Skill Exchange
        </div>
        </Link>
        <Link>
        <div className='sidebar-con'>
          <FaToolbox />
          Resource Sharing
        </div>
        </Link>
        <Link>
        <div className='sidebar-con'>
          <FaUsers />
          Community Chat
        </div>
        </Link>
        <Link>
        <div className='sidebar-con'>
          <FaCalendarAlt />
          Events
        </div>
        </Link>
        <Link>
        <div className='sidebar-con'>
          <FaBell />
          Alerts & News
        </div>
        
        </Link>
        <Link>
        <div className='sidebar-con'>
          <FaDonate />
          Volunteer Opportunities
        </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
