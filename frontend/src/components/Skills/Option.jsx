import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Option() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [skillRequests, setSkillRequests] = useState([]);
  const [error, setError] = useState("");

  // Fetch skill requests for approval
  useEffect(() => {
    const fetchSkillRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/skill/fetch-pending-skills", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });

        const data = await response.json();
        console.log(data)
        if (response.ok) {
          setSkillRequests(data.data);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Failed to fetch skill requests.");
      }
    };

    if (email) {
      fetchSkillRequests();
    }
  }, [email]);

  // Handle skill request status update (Accept/Reject)
  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/skill/update-status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId, newStatus }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Update UI immediately
        setSkillRequests((prevRequests) =>
          prevRequests.map((req) =>
            req._id === requestId ? { ...req, status: newStatus } : req
          )
        );
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  // Handle Navigation
  const handleSelect = () => {
    navigate("/dash/selectskill", { state: { option: "select" } });
  };

  const handlePost = () => {
    navigate("/dash/postskill", { state: { option: "post" } });
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

      <h2>Pending Skill Requests</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {skillRequests.map((request) => (
          <li key={request._id}>
            <strong>Skill:</strong> {request.skillName} <br />
            <strong>Problem:</strong> {request.problemDetails} <br />
            <strong>Needed Date:</strong> {request.neededDate} <br />
            <strong>Status:</strong> {request.status} <br />

            {/* Accept and Reject Buttons */}
            {request.status === "pending" && (
              <div>
                <button
                  className="accept-btn"
                  onClick={() => handleStatusUpdate(request._id, "accepted")}
                >
                  Accept
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleStatusUpdate(request._id, "rejected")}
                >
                  Reject
                </button>
              </div>
            )}

            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Option;
