import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

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
  { id: 11, name: 'Painter', image: 'https://via.placeholder.com/150?text=Painter' },
  { id: 12, name: 'Carpenter', image: 'https://via.placeholder.com/150?text=Carpenter' },
  { id: 13, name: 'Farmer', image: 'https://via.placeholder.com/150?text=Farmer' },
  { id: 14, name: 'Veterinarian', image: 'https://via.placeholder.com/150?text=Veterinarian' },
  { id: 15, name: 'Graphic Designer', image: 'https://via.placeholder.com/150?text=Graphic+Designer' },
  { id: 16, name: 'Pilot', image: 'https://via.placeholder.com/150?text=Pilot' },
  { id: 17, name: 'Web Developer', image: 'https://via.placeholder.com/150?text=Web+Developer' },
  { id: 18, name: 'Data Analyst', image: 'https://via.placeholder.com/150?text=Data+Analyst' },
  { id: 19, name: 'Photographer', image: 'https://via.placeholder.com/150?text=Photographer' },
  { id: 20, name: 'Journalist', image: 'https://via.placeholder.com/150?text=Journalist' },
  { id: 21, name: 'Musician', image: 'https://via.placeholder.com/150?text=Musician' },
  { id: 22, name: 'Actor', image: 'https://via.placeholder.com/150?text=Actor' },
  { id: 23, name: 'Marketing Specialist', image: 'https://via.placeholder.com/150?text=Marketing+Specialist' },
  { id: 24, name: 'Doctor', image: 'https://via.placeholder.com/150?text=Doctor' },
  { id: 25, name: 'Accountant', image: 'https://via.placeholder.com/150?text=Accountant' },
  { id: 26, name: 'Interior Designer', image: 'https://via.placeholder.com/150?text=Interior+Designer' },
  { id: 27, name: 'Social Worker', image: 'https://via.placeholder.com/150?text=Social+Worker' },
  { id: 28, name: 'Legal Advisor', image: 'https://via.placeholder.com/150?text=Legal+Advisor' },
  { id: 29, name: 'Fitness Trainer', image: 'https://via.placeholder.com/150?text=Fitness+Trainer' },
  { id: 30, name: 'Event Planner', image: 'https://via.placeholder.com/150?text=Event+Planner' },
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
