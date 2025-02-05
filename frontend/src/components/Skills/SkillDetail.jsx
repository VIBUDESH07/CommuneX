import React from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation to access state

function SkillDetails() {
  const location = useLocation(); // Get the state from navigation
  const { skillName, result } = location.state || {}; // Destructure the received state

  if (!skillName || !result) {
    return <p>No skill selected or data available.</p>;
  }

  // Extract necessary details from the result data
  const necessaryDetails = result.data.map((user) => ({
    username: user.username,
    email: user.email,
    contactNumber: user.contactNumber,
    localCommunity: user.localCommunity,
  }));

  return (
    <div className="skill-details-container">
      <h1>Skill Details</h1>
      <h2>{skillName}</h2>
      <div>
        {necessaryDetails.length > 0 ? (
          <ul>
            {necessaryDetails.map((user, index) => (
              <li key={index} className="user-card">
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Contact Number:</strong> {user.contactNumber}</p>
                <p><strong>Community:</strong> {user.localCommunity}</p>
                <div className="actions">
                  <a href={`tel:${user.contactNumber}`} className="call-button">📞 Call</a>
                  <button className="book-button" onClick={() => alert(`Booking appointment with ${user.username}`)}>
                    📅 Book {skillName}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching users found.</p>
        )}
      </div>

      <style jsx>{`
        .skill-details-container {
          text-align: center;
          padding: 20px;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        .user-card {
          border: 1px solid #ddd;
          padding: 15px;
          margin: 10px 0;
          border-radius: 8px;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
        .actions {
          margin-top: 10px;
        }
        .call-button, .book-button {
          padding: 10px 15px;
          margin: 5px;
          text-decoration: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .call-button {
          background-color: #28a745;
          color: white;
        }
        .book-button {
          background-color: #007bff;
          color: white;
          border: none;
        }
      `}</style>
    </div>
  );
}

export default SkillDetails;
