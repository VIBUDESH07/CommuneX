import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Content from './Content';
import Login from '../Login/Login';
import FriendChat from '../Chatting/Friend';


const Dashboard = () => {
  return (
   
      <div className='dash-grid'>
        <Sidebar />
        <div className="dash-content">
          <Routes>
            <Route path="/" element={<FriendChat/>}/>
          </Routes>
        </div>
      </div>
   
  );
};

export default Dashboard;
