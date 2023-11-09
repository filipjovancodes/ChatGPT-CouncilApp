import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, getDocs } from "firebase/firestore";

const HomePage = () => {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("running")
    if (auth.currentUser) {
      // Fetch the list of chats when the user is signed in
      const fetchChats = async () => {
        const userId = auth.currentUser.uid
        const querySnapshot = await getDocs(collection(db, "users", userId, "chats"));
        const chatsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChats(chatsData);
      };

      fetchChats();
    }
  }, []);

  const handleStartNewChat = () => {
    navigate('/council-selection');
  };

  const handleEnterChat = (chatId) => {
    // Navigate to ChatPage with props to load the selected chat
    navigate(`/chat/${chatId}`);
  };

  return (
    <div>
      {
        <div>
          <button onClick={handleStartNewChat}>Start New Chat</button>
          <div>
            <h2>Previous Chats</h2>
            <ul>
              {chats.map(chat => (
                <li key={chat.id} onClick={() => handleEnterChat(chat.id)}>
                  {chat.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      }
    </div>
  );
};

export default HomePage;
