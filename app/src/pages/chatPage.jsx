import { useState, useEffect }  from 'react';
import '../App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import { useParams } from 'react-router-dom';
import { processMessages } from '../backend/processMessage'
import { loadChat } from '../backend/loadChat'
import { auth } from '../firebase'


const ChatPage = () => {
  const [messageList, setMessageList] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const {chatId} = useParams();

  // initialize messageList
  useEffect(() => {
    const waitLoadChat = async () => {
      const messages = await loadChat(chatId)
      console.log(messages)
      setMessageList(messages)
    }
    if (auth.currentUser){
      waitLoadChat()
    }
  }, [])

  const handleSendRequest = async (message) => {
    const newMessage = {
      text: message,
      sender: "user",
    };
    setMessageList(prev => [...prev, newMessage])
    setIsTyping(true);
    const response = await processMessages([...messageList, newMessage], chatId);
    setMessageList(prev => [...prev, response])
    setIsTyping(false);
  };

  return (
    <div className="App">
      <div style={{ position:"relative", height: "800px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
          <MessageList 
            scrollBehavior="smooth" 
            typingIndicator={isTyping ? <TypingIndicator content="The Council is responding" /> : null}
          >
            {messageList.slice(1).map((message, index) => {
              // Here we assume that "CouncilAI" messages should be incoming and "user" messages should be outgoing.
              const direction = message.sender === "CouncilAI" ? "incoming" : "outgoing";
              
              // If the sender is "CouncilAI", split the content and map it to Message components.
              if (message.sender === "CouncilAI" && message.text) {
                const personaResponses = message.text.split('\n\n');
                return personaResponses.map((personaResponse, i) => (
                  <Message key={`${index}-${i}`} model={{ message: personaResponse, direction: direction, position: "single" }} />
                ));
              } else {
                // If the sender is not "CouncilAI", just return a single Message component.
                return (
                  <Message key={index} model={{ message: message.text, direction: direction, position: "single" }} />
                );
              }
            })}
          </MessageList>
            <MessageInput placeholder="Send a Message" onSend={handleSendRequest} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default ChatPage;
