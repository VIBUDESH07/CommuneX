import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import useLocation

const skills = [
  { id: 1, name: 'Plumber', image: 'https://via.placeholder.com/150?text=Plumber' },
  { id: 2, name: 'Cardiologist', image: 'https://via.placeholder.com/150?text=Cardiologist' },
  { id: 3, name: 'Teacher', image: 'https://via.placeholder.com/150?text=Teacher' },
  { id: 4, name: 'Electrician', image: 'https://via.placeholder.com/150?text=Electrician' },
  { id: 5, name: 'Software Engineer', image: 'https://via.placeholder.com/150?text=Software+Engineer' },
  { id: 6, name: 'Mechanic', image: 'https://via.placeholder.com/150?text=Mechanic' },
  { id: 7, name: 'Architect', image: 'https://via.placeholder.com/150?text=Architect' },
  { id: 8, name: 'Nurse', image: 'https://via.placeholder.com/150?text=Nurse' },
  { id: 9, name: 'Dentist', image: 'https://via.placeholder.com/150?text=Dentist' },
  { id: 10, name: 'Chef', image: 'https://via.placeholder.com/150?text=Chef' },
];

const email = localStorage.getItem('email'); // Get the email from localStorage

function Skill() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 
  const location = useLocation(); 

  const option = location.state?.option || 'select'; // Get the option ('select' or 'post')

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSkillClick = (skillName) => {
    if (!email) {
      alert('No email found in localStorage. Please log in first.');
      return;
    }

    const data = { skill: skillName, email, option };

    fetch('http://localhost:5000/skill/fetch-skill', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(result => {
        console.log('Success:', result);

        if (option === 'post') {
          navigate('/dash/post-skill', { state: { skillName, result } });
        } else {
          navigate('/dash/skill-details', { state: { skillName, result } });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your skill.');
      });
  };

  return (
    <div className="skill-container">
      <header>
        <h1>Skills Directory ({option})</h1>
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
            onClick={() => handleSkillClick(skill.name)}
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
