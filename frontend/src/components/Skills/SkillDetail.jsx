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
              <li key={index}>
                <p><strong>Username:</strong> {user.username}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Contact Number:</strong> {user.contactNumber}</p>
                <p><strong>Community:</strong> {user.localCommunity}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching users found.</p>
        )}
      </div>
    </div>
  );
}

export default SkillDetails;
