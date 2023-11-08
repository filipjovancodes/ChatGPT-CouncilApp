import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithRedirect, getRedirectResult } from 'firebase/auth';
import { provider } from '../firebase';

const LoginPage = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    // Check for the result of the redirect
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          // User is signed in, redirect to the home page or another appropriate page
          navigate('/home-page');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error(error);
      });
  }, [navigate, auth]);

  const handleLogin = () => {
    // Start a sign in process for an unauthenticated user.
    signInWithRedirect(auth, provider);
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
};

export default LoginPage;
