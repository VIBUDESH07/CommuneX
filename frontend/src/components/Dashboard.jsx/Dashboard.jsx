import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Content from './Content';
import Login from '../Login/Login';
import FriendChat from '../Chatting/Friend';
import SelectFriend from '../Chatting/SelectFriend';



const Dashboard = () => {
  return (
   
      <div className='dash-grid'>
        <Sidebar />
        <div className="dash-content">
          <Routes>
            <Route path="/" element={<Content/>}/>
            <Route path="/friend" element={<SelectFriend/>}/>
          </Routes>
        </div>
      </div>
   
  );
};

export default Dashboard;
