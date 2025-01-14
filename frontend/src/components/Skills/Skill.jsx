import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const skills = [
  { id: 1, name: 'Plumber', image: 'https://via.placeholder.com/150?text=Plumber' },
  { id: 2, name: 'Cardiologist', image: 'https://via.placeholder.com/150?text=Cardiologist' },
  { id: 3, name: 'Teacher', image: 'https://via.placeholder.com/150?text=Teacher' },
  // Add all other skills here...
];

const email = localStorage.getItem('email'); // Get the email from localStorage

function Skill() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSkillClick = (skillName) => {
    if (email) {
      const data = {
        skill: skillName,
        email: email,
      };

      fetch('http://localhost:5000/skill/fetch-skill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log('Success:', result);
          alert(`Skill "${skillName}" selected successfully.`);

          // Navigate to the results page with state
          navigate('/dash/skill-details', { state: { skillName, result } });
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('There was an error submitting your skill.');
        });
    } else {
      alert('No email found in localStorage. Please log in first.');
    }
  };

  return (
    <div className="skill-container">
      <header>
        <h1>Skills Directory</h1>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search skills..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="skills-grid">
        {filteredSkills.map((skill) => (
          <div
            key={skill.id}
            className="skill-card"
            onClick={() => handleSkillClick(skill.name)} // Call the function on card click
          >
            <img src={skill.image} alt={skill.name} />
            <div className="info">
              <h3>{skill.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skill;
