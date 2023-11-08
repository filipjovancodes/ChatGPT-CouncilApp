import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createChat } from '../backend/createChat'

const CouncilSelectionPage = () => {
  const [councilName, setCouncilName] = useState(''); // Initialize with an empty string
  const [selectedCouncils, setSelectedCouncils] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleNameChange = (e) => {
    setCouncilName(e.target.value);
  };

  const handleSubmit = async () => {
    if (councilName.trim() === '') {
      alert('Please enter a name for the chat.');
      return;
    }

    setIsLoading(true); // Start loading
    try {
      const chatId = await createChat(councilName, selectedCouncils);
      navigate(`/chat/${chatId}`); // Removed the ':' to navigate correctly
    } catch (error) {
      alert('Failed to create chat. Please try again.', error); // Provide user feedback
    } finally {
      setIsLoading(false); // End loading whether there's an error or not
    }
  };

  return (
    <div>
      <h1>Select Council Members</h1>
      <input
        type="text"
        value={councilName}
        onChange={handleNameChange}
        placeholder="Enter chat name"
      />
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
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Submit'}
      </button>
    </div>
  );
};

export default CouncilSelectionPage;
