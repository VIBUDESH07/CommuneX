import React, { useState } from 'react';

const skills = [
  { id: 1, name: 'Plumber', image: 'https://via.placeholder.com/150?text=Plumber' },
  { id: 2, name: 'Cardiologist', image: 'https://via.placeholder.com/150?text=Cardiologist' },
  { id: 3, name: 'Teacher', image: 'https://via.placeholder.com/150?text=Teacher' },
  { id: 4, name: 'Chef', image: 'https://via.placeholder.com/150?text=Chef' },
  { id: 5, name: 'Electrician', image: 'https://via.placeholder.com/150?text=Electrician' },
  { id: 6, name: 'Artist', image: 'https://via.placeholder.com/150?text=Artist' },
  { id: 7, name: 'Nurse', image: 'https://via.placeholder.com/150?text=Nurse' },
  { id: 8, name: 'Developer', image: 'https://via.placeholder.com/150?text=Developer' },
  { id: 9, name: 'Dentist', image: 'https://via.placeholder.com/150?text=Dentist' },
  { id: 10, name: 'Scientist', image: 'https://via.placeholder.com/150?text=Scientist' },
  { id: 11, name: 'Architect', image: 'https://via.placeholder.com/150?text=Architect' },
  { id: 12, name: 'Pilot', image: 'https://via.placeholder.com/150?text=Pilot' },
  { id: 13, name: 'Lawyer', image: 'https://via.placeholder.com/150?text=Lawyer' },
  { id: 14, name: 'Photographer', image: 'https://via.placeholder.com/150?text=Photographer' },
  { id: 15, name: 'Writer', image: 'https://via.placeholder.com/150?text=Writer' },
  { id: 16, name: 'Mechanic', image: 'https://via.placeholder.com/150?text=Mechanic' },
  { id: 17, name: 'Pharmacist', image: 'https://via.placeholder.com/150?text=Pharmacist' },
  { id: 18, name: 'Surgeon', image: 'https://via.placeholder.com/150?text=Surgeon' },
  { id: 19, name: 'Psychologist', image: 'https://via.placeholder.com/150?text=Psychologist' },
  { id: 20, name: 'Veterinarian', image: 'https://via.placeholder.com/150?text=Veterinarian' },
  { id: 21, name: 'Astronaut', image: 'https://via.placeholder.com/150?text=Astronaut' },
  { id: 22, name: 'Firefighter', image: 'https://via.placeholder.com/150?text=Firefighter' },
  { id: 23, name: 'Farmer', image: 'https://via.placeholder.com/150?text=Farmer' },
  { id: 24, name: 'Geologist', image: 'https://via.placeholder.com/150?text=Geologist' },
  { id: 25, name: 'Librarian', image: 'https://via.placeholder.com/150?text=Librarian' },
  { id: 26, name: 'Journalist', image: 'https://via.placeholder.com/150?text=Journalist' },
  { id: 27, name: 'Biologist', image: 'https://via.placeholder.com/150?text=Biologist' },
  { id: 28, name: 'Musician', image: 'https://via.placeholder.com/150?text=Musician' },
  { id: 29, name: 'Translator', image: 'https://via.placeholder.com/150?text=Translator' },
  { id: 30, name: 'Social Worker', image: 'https://via.placeholder.com/150?text=Social+Worker' },
  { id: 31, name: 'Choreographer', image: 'https://via.placeholder.com/150?text=Choreographer' },
  { id: 32, name: 'Hairdresser', image: 'https://via.placeholder.com/150?text=Hairdresser' },
  { id: 33, name: 'Makeup Artist', image: 'https://via.placeholder.com/150?text=Makeup+Artist' },
  { id: 34, name: 'Fashion Designer', image: 'https://via.placeholder.com/150?text=Fashion+Designer' },
  { id: 35, name: 'Zoologist', image: 'https://via.placeholder.com/150?text=Zoologist' },
  { id: 36, name: 'Optometrist', image: 'https://via.placeholder.com/150?text=Optometrist' },
  { id: 37, name: 'Construction Worker', image: 'https://via.placeholder.com/150?text=Construction+Worker' },
  { id: 38, name: 'Security Guard', image: 'https://via.placeholder.com/150?text=Security+Guard' },
  { id: 39, name: 'Pediatrician', image: 'https://via.placeholder.com/150?text=Pediatrician' },
  { id: 40, name: 'Dietician', image: 'https://via.placeholder.com/150?text=Dietician' }
];

const email = localStorage.getItem('email'); // Get the email from localStorage

function Skill() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = skills.filter(skill =>
    skill.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSkillClick = (skillName) => {
    if (email) {
      // Send the skill and user email to the API
      const data = {
        skill: skillName,
        email: email,
      };

      fetch('http://localhost:5000/skill/submit-skill', {
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
