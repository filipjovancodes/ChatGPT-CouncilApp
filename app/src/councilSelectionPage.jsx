import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CouncilSelectionPage = ({ setCouncilMembers }) => {
  const [selectedCouncils, setSelectedCouncils] = useState([]);
  const navigate = useNavigate();

  const councils = [
    "Logical Analyst", 
    "Ethical Evaluator", 
    "Creative Interpreter", 
    "Pragmatic Assessor", 
    "Holistic Thinker"
  ];

  const handleSelectionChange = (council) => {
    setSelectedCouncils(prev => {
      if (prev.includes(council)) {
        return prev.filter(c => c !== council);
      } else {
        return [...prev, council];
      }
    });
  };

  const handleSubmit = () => {
    setCouncilMembers(selectedCouncils);
    navigate('/chat');
  };

  return (
    <div>
      <h1>Select Council Members</h1>
      {councils.map((council) => (
        <label key={council}>
          <input 
            type="checkbox"
            checked={selectedCouncils.includes(council)}
            onChange={() => handleSelectionChange(council)}
          />
          {council}
        </label>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default CouncilSelectionPage;