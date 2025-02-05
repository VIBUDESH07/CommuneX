import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Sidebar';
import Content from './Content';
import Login from '../Login/Login';
import FriendChat from '../Chatting/Friend';
import SelectFriend from '../Chatting/SelectFriend';
import AddFriend from '../Chatting/AddFriend';
import Chat from '../Chatting/Chat';
import FriendRequests from '../Chatting/Request';
import Skill from '../Skills/Skill';
import SkillDetails from '../Skills/SkillDetail'
import Option from '../Skills/Option';
import PostSkill from '../Skills/PostSkill';


const Dashboard = () => {
  return (
      <div className='dash-grid'>
        <Sidebar />
        <div className="dash-content">
          <Routes>
            <Route path="/" element={<Content/>}/>
            <Route path="/friend" element={<SelectFriend/>}/>
            <Route path="/add" element={<AddFriend/>}/>
            <Route path="/chat/:friendId" element={<Chat />} />
            <Route path="/friend/request" element={<FriendRequests />} />
            <Route path="/skills" element={<Option/>} />
            <Route path="/selectskill" element={<Skill/>}/>
            <Route path="/postskill" element={<Skill/>}/>
            <Route path="/post-skill" element={<PostSkill/>}/>
            <Route path="/skill-details" element={<SkillDetails/>}/>

          </Routes>
        </div>
      </div>
   
  );
};

export default Dashboard;
