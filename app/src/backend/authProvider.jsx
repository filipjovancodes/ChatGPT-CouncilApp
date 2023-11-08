import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Corrected import for useLocation
import { auth } from '../firebase';

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe(); // Unsubscribe on cleanup
  }, [navigate]);

  // You would need to call `handleLogin` when the user successfully logs in.
  // This could be in a login form component, where after successful login you call `handleLogin`.

  if (loading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthProvider;