import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavChat from './NavChat';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const ema=localStorage.getItem('email')
  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5000/fri/friend/requests', {
        params: { email: ema },
      });
       
      setRequests(response.data.requests);
      console.log(requests)
    } catch (err) {
      setError('Failed to fetch friend requests');
    }
  };

  const handleFriendRequest = async (requestId, responsed) => {
    try {
      setMessage('');
      setError('');

      const response = await axios.post('http://localhost:5000/fri/handleRequest', {
        requestId,
        responsed,
      });

      setMessage(response.data.message);
      setRequests((prevRequests) => prevRequests.filter((req) => req._id !== requestId));
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to handle the request');
    }
  };

  return (
    <>
    <NavChat/>
    <div className="friend-requests-page">
      <div className="friend-requests-card">
        <h2 className="friend-requests-title">Sent Friend Requests</h2>

        {message && <p className={`friend-requests-message ${message.includes('success') ? 'success' : 'error'}`}>{message}</p>}
        {error && <p className="friend-requests-message error">{error}</p>}

        <ul className="friend-requests-list">
          {requests.length > 0 ? (
            requests.map((request) => (
              <li key={request._id} className="friend-request-item">
                <span className="friend-request-email">{request.sender.username}-{request.sender.local}</span>
                <div className="friend-request-buttons">
                  <button
                    className="friend-request-button accept"
                    onClick={() => handleFriendRequest(request._id, 'accept')}
                  >
                    Accept
                  </button>
                  <button
                    className="friend-request-button reject"
                    onClick={() => handleFriendRequest(request._id, 'reject')}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="no-requests-message">No friend requests sent yet</p>
          )}
        </ul>
      </div>
    </div>
    </>
  );
};

export default FriendRequests;
