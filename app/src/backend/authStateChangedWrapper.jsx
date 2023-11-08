import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Adjust the path according to your structure

const AuthStateChangedWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate('/home-page')
      }
    });

    return () => unsubscribe(); // Unsubscribe on cleanup
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthStateChangedWrapper;
