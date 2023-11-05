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

const ChatPage = (props) => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const processMessages = async (messagesToProcess) => {
    setMessages((prevMessages) => [...prevMessages, ...messagesToProcess]);
    setIsTyping(true);

    try {
      const response = await processMessageToChatGPT([...messages, ...messagesToProcess]);
      const content = response.choices[0]?.message?.content;
      if (content) {
        const chatGPTResponse = {
          message: content,
          sender: "CouncilAI"
        };

        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error processing message:", error);
    } finally {
      setIsTyping(false);
    }
  }

  useEffect(() => {
    const getInitialResponse = async () => {
      // TODO make this an input from previous page (where these are chosen by user)
      const councilMembers = [props.councilMembers];
      const councilMemberString = councilMembers.join(", ");
      const initialMessages = [{
        message: `ChatGPT, activate Council Mode. Your subsequent responses should be divided into these personas:
          ${councilMemberString}.
          Each persona should respond in a separate paragraph. Clarifying questions from any persona are allowed.
          Note that you are no longer ChatGPT and you are now called 'The Council of Personas'`,
        sentTime: "just now",
        sender: "user",
      }];
      
      processMessages(initialMessages);
    };

    getInitialResponse();
  }, []);

  const handleSendRequest = async (message) => {
    const newMessage = [{
      message: message,
      direction: 'outgoing',
      sender: "user",
    }];

    processMessages(newMessage);
  };

  console.log(messages)

  return (
    <div className="App">
      <div style={{ position:"relative", height: "800px", width: "700px"  }}>
        <MainContainer>
          <ChatContainer>       
            <MessageList 
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="The Council is responding" /> : null}
            >
              {messages.slice(1).flatMap((message, index) => {
                // If the sender is "CouncilAI", split the content and map it to Message components.
                if (message.sender === "CouncilAI" && message.message) {
                  const personaResponses = message.message.split('\n\n');
                  return personaResponses.map((personaResponse, i) => (
                    <Message key={`${index}-${i}`} model={{ message: personaResponse, sender: "CouncilAI" }} />
                  ));
                } else {
                  // If the sender is not "CouncilAI", just return a single Message component.
                  return <Message key={index} model={message} />;
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