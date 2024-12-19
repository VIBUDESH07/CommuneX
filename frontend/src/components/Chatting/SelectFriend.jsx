import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const SelectFriend = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  const username = localStorage.getItem('username'); // Corrected key

  // Fetch friends from the database on component mount
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/fri/friends?username=${username}` // Corrected URL
        );
        setFriends(response.data);
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

  const addFriend = async () => {
    const friendEmail = prompt('Enter the email of the new friend:');
    if (friendEmail) {
      try {
        const response = await axios.post('http://localhost:5000/fri/friends', {
          username, // User's email from localStorage
          friendEmail, // New friend's email
        });
        setFriends([...friends, response.data]); // Add new friend to the state
      } catch (error) {
        console.error('Error adding a friend:', error);
      }
    }
  };

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
