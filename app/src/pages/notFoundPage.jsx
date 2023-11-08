import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/home-page'); // Navigate to the home page
  };

  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
      <button onClick={navigateToHome}>Go to Home</button> {/* Button to navigate to home */}
    </div>
  );
};

export default NotFoundPage;