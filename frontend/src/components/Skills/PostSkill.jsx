import React, { useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation

export const PostSkill = () => {
  const email = localStorage.getItem("email");
  const location = useLocation(); // Access location state
  const skillName = location.state?.skillName || ""; // Retrieve skillName safely

  const [formData, setFormData] = useState({
    problemDetails: "",
    neededDate: "",
  });

  const [message, setMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.problemDetails || !formData.neededDate) {
      setMessage("All fields are required!");
      return;
    }

    if (!email) {
      setMessage("User email is missing. Please log in again.");
      return;
    }

    if (!skillName) {
      setMessage("Skill name is missing. Please select a skill properly.");
      return;
    }

    const postData = { ...formData, email, skillName }; // Add email and skillName to the request body

    try {
      console.log(postData)
      const response = await fetch("http://localhost:5000/skill/post-skill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Skill request posted successfully!");
        setFormData({ problemDetails: "", neededDate: "" }); // Reset form
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage("Failed to post skill. Please try again later.");
    }
  };

  return (
    <div className="post-skill-container">
      <h2>Post a Skill Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Problem Details:</label>
          <textarea
            name="problemDetails"
            value={formData.problemDetails}
            onChange={handleChange}
            placeholder="Describe the issue..."
            required
          />
        </div>
        <div className="form-group">
          <label>Needed Date:</label>
          <input
            type="date"
            name="neededDate"
            value={formData.neededDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Skill Name:</label>
          <input
            type="text"
            value={skillName}
            disabled // Disable editing since it's coming from location.state
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}

      <style jsx>{`
        .post-skill-container {
          text-align: center;
          max-width: 400px;
          margin: auto;
          padding: 20px;
          background: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          margin-bottom: 15px;
          text-align: left;
        }
        label {
          display: block;
          font-weight: bold;
          margin-bottom: 5px;
        }
        textarea,
        input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
        input[disabled] {
          background: #e9ecef;
          cursor: not-allowed;
        }
        .submit-button {
          background-color: #007bff;
          color: white;
          padding: 10px 15px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
        }
        .submit-button:hover {
          background-color: #0056b3;
        }
        .message {
          margin-top: 10px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
};

export default PostSkill;
