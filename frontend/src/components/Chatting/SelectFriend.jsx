import React, { useState, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

const SelectFriend = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch friends from the database on component mount
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fri/friends'); // Replace with your actual API endpoint
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  const addFriend = async () => {
    const newFriendName = prompt('Enter the name of the new friend:');
    if (newFriendName) {
      try {
        const response = await axios.post('http://localhost:5000/fri/addfriend', { name: newFriendName }); // Replace with your actual API endpoint
        setFriends([...friends, response.data]);
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
            <li key={friend.id} className="friend-item">
              <span>{friend.name}</span>
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
