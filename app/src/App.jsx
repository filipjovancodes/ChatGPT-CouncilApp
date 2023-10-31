import { useState, useEffect }  from 'react';
import './App.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';

const OPEN_AI_API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY

const App = () => {
  const [messages, setMessages] = useState([
    {
      message: "ChatGPT, activate Council Mode. Your subsequent responses should be divided into five personas: \
  Logical Analyst, Ethical Evaluator, Creative Interpreter, Pragmatic Assessor, and Holistic Thinker. \
  Each persona should respond in a separate paragraph. This mode will remain active until I say \
  'Deactivate Council Mode.' If I want to swap any persona, I will use the command 'Swap [Current Persona] \
  for [New Persona].' Clarifying questions from any persona are allowed.",
      sentTime: "just now",
      sender: "user",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const getInitialResponse = async () => {
      try {
        const apiResponse = await processMessageToChatGPT(messages[1].message);
        const chatGPTResponse = {
          message: apiResponse.aiMessage,
          sender: "CouncilAI",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      } catch (error) {
        console.error("Error getting initial response:", error);
      }
    };

    getInitialResponse();
  }, []);

  const handleSendRequest = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user",
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, newMessage]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "CouncilAI",
        };
        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  };

  async function processMessageToChatGPT(chatMessages) {
    const apiMessages = chatMessages.map((messageObject) => {
      const role = messageObject.sender === "CouncilAI" ? "assistant" : "user";
      return { role, content: messageObject.message };
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        { role: "system", content: "I'm a Student using ChatGPT for learning" },
        ...apiMessages,
      ],
    };

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + OPEN_AI_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    });

    return response.json();
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "800px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="The Council is responding" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                return <Message key={i} model={message} />
              })}
            </MessageList>
            <MessageInput placeholder="Send a Message" onSend={handleSendRequest} />        
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  )
}

export default App;