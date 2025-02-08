import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaComment, FaHome, FaPlusCircle, FaSnapchat } from 'react-icons/fa'; // Example if you're using react-icons

const NavChat = () => {
  return (
    <div className="friend-nav">
      <h1>Friends</h1>
      <div className="friend-main">
      <Link to="/dash/friend"> {/* Add a valid path */}
          <FaComment size={20} style={{ color: 'black' }} /> {/* Example notification icon */}
        </Link>
        <Link to="/dash/friend/request"> {/* Add a valid path */}
          <FaBell size={20} style={{ color: 'black' }} /> {/* Example notification icon */}
        </Link>
        
      </div>
    </div>
  );
};

export default NavChat;
