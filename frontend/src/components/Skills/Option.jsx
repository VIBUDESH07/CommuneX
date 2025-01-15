import React from 'react';
import { useNavigate } from 'react-router-dom';

function Option() {
  const navigate = useNavigate();

  const handleSelect = () => {
    navigate('/dash/select-skill'); // Navigate to the select skill page
  };

  const handlePost = () => {
    navigate('/dash/post-skill'); // Navigate to the post skill page
  };

  return (
    <div className="option-container">
      <h1 className="option-title">Choose an Option</h1>
      <div className="option-buttons">
        <button className="option-btn select-btn" onClick={handleSelect}>
          Select
        </button>
        <button className="option-btn post-btn" onClick={handlePost}>
          Post
        </button>
      </div>
    </div>
  );
}

export default Option;
