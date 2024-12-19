import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUserPlus } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

const AddFriend = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const location = useLocation();
  const currentUser = location.state?.user; // Access the current user from the passed state

  useEffect(() => {
    if (!currentUser) {
      setError('Current user details are missing.');
      setLoading(false);
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/fri/allusers');
        console.log(response.data)
        const filteredUss = response.data.filter(
          (user) =>
            user.email !== currentUser.email,
            
        );
        setUsers(filteredUss);
        setFilteredUsers(filteredUss);
        console.log(filteredUss) // Show all users initially
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentUser]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);

    if (value === '') {
      // Reset to show all users except the current user when search is empty
      setFilteredUsers(users);
    } else {
      // Filter users based on the search term
      const filtered = users.filter(
        (user) =>
          user.username.toLowerCase().includes(value) ||
          user.email.toLowerCase().includes(value) ||
          user.localCommunity.toLowerCase().includes(value)
      );
      setFilteredUsers(filtered);
    }
  };

  const handleAddFriend = async (friendEmail) => {
    try {
      await axios.post('http://localhost:5000/fri/addfriend', {
        username: currentUser.email, // Current user's email
        friendEmail, // Email of the friend to add
      });
      alert(`${friendEmail} added as a friend!`);
    } catch (err) {
      console.error('Error adding friend:', err);
      alert('Failed to add friend. Try again.');
    }
  };

  return (
    <div className="add-friend">
      <h2>Add a Friend</h2>
      {loading ? (
        <p>Loading users...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by username, email, or local community"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
          {filteredUsers.length > 0 ? (
            <ul className="user-list">
              {filteredUsers.map((user) => (
                <li key={user._id} className="user-item">
                  <span>
                    {user.username} ({user.email}) - {user.localCommunity}
                  </span>
                  <button
                    onClick={() => handleAddFriend(user.email)}
                    className="add-friend-btn"
                  >
                    <FaUserPlus size={20} /> Add
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found matching your search.</p>
          )}
        </>
      )}
    </div>
  );
};

export default AddFriend;
