// App.jsx
import React from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/homePage'; // Adjust the path to your actual HomePage file
import ChatPage from './pages/chatPage';
import CouncilSelectionPage from './pages/councilSelectionPage';
import AuthProvider from './backend/authProvider'; // Make sure the path is correct
import LoginPage from './pages/loginPage'
import NotFoundPage from './pages/notFoundPage';

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Navigate replace to="/home-page" />} />
            <Route path="/login" element={< LoginPage />}/>
            <Route path="/home-page" element={< HomePage />} />
            <Route path="/council-selection" element={< CouncilSelectionPage />} />
            <Route path="/chat/:chatId" element={< ChatPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
