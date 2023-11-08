// App.jsx
import { useState } from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/homePage'; // Adjust the path to your actual HomePage file
import ChatPage from './pages/chatPage';
import CouncilSelectionPage from './pages/councilSelectionPage';
import AuthProvider from './backend/authProvider'; // Make sure the path is correct
import LoginPage from './pages/loginPage'

const App = () => {

  return (
    <BrowserRouter>
      <div className="App">
        <AuthProvider>
          <Routes>
            <Route path="/login" element={< LoginPage />}/>
            <Route path="/home-page" element={< HomePage />} />
            <Route path="/council-selection" element={< CouncilSelectionPage />} />
            <Route path="/chat/:chatId" element={< ChatPage />} />
          </Routes>
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
};

export default App;
