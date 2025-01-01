import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SelectFriend = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const email = localStorage.getItem('email');  // Now fetching email from localStorage
  const navigate = useNavigate();

  // Fetch friends from the database on component mount
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/fri/friends?email=${email}`  // Updated query param
        );
        setFriends(response.data.friends);
        
        setUser(response.data.user);
        console.log(response.data.user)  // Set user info
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      fetchFriends();
    } else {
      console.error('Email is not found in localStorage.');
    }
  }, [email]);

  const startChat = (friendId) => {
    navigate(`/dash/chat/${friendId}`, { state: { user, friendId } });  // Pass email and friend ID
  };

  return (
    <div className="add-friend">
      <h2>My Friends</h2>
      {loading ? (
        <p>Loading...</p>
      ) : friends.length > 0 ? (
        <ul className="friend-list">
          {friends.map((friend) => (
            <li key={friend.id} className="friend-item">  {/* Use friend.id here */}
              <span>{friend.username}</span>
              <button onClick={() => startChat(friend._id)}>Chat</button>  {/* Pass friend.id */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends yet. Add some!</p>
      )}
      <div className="add-friend-button">
        <button onClick={() => navigate('/dash/add', { state: { user } })}>
          <FaPlus size={20} /> Add Friend
        </button>
      </div>
    </div>
  );
};

export default SelectFriend;
