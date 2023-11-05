import { useState, useEffect }  from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import processMessageToChatGPT from './processMessage.js';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import ChatPage from './chatPage';
import CouncilSelectionPage from './councilSelectionPage';

const App = () => {
  const [councilMembers, setCouncilMembers] = useState([]);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<CouncilSelectionPage setCouncilMembers={setCouncilMembers} />} />
          <Route path="/chat" element={<ChatPage councilMembers={councilMembers} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;