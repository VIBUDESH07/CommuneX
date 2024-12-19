import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SelectFriend = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user,setUser]=useState(null);
  const username = localStorage.getItem('username'); // Corrected key
 const navigate = useNavigate();
  // Fetch friends from the database on component mount
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/fri/friends?username=${username}` // Corrected URL
        );
       
        setFriends(response.data.friends);
        setUser(response.data.user)
        console.log(user)
        console.log(friends)
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchFriends();
    } else {
      console.error('Username is not found in localStorage.');
    }
  }, [username]);
  
 const addFriend =() =>{
        navigate('/dash/add' ,{state:{user}})
 }

  return (
    <div className="add-friend">
      <h2>My Friends</h2>
      {loading ? (
        <p>Loading...</p>
      ) : friends.length > 0 ? (
        <ul className="friend-list">
          {friends.map((friend) => (
            <li key={friend._id} className="friend-item">
              <span>{friend.username}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No friends yet. Add some!</p>
      )}
      <div className="add-friend-button">
        <button onClick={addFriend}>
          <FaPlus size={20} /> Add Friend
        </button>
      </div>
    </div>
  );
};

export default SelectFriend;
