import { collection, addDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import { processMessages } from './processMessage';

// This is the function that handles the chat initialization logic.
export const createChat = async (chatName, councilMembers) => {
  if (chatName) {
    try {
      const userId = auth.currentUser.uid;

      const chatDocRef = await addDoc(collection(db, "users", userId, "chats"), {
          name: chatName,
          createdAt: new Date(),
      });
      
      const councilMemberString = councilMembers.join(", ");
      const initialMessage = {
        text: `ChatGPT, activate Council Mode. Your subsequent responses should be divided into these personas:
          ${councilMemberString}.
          Each persona should respond in a separate paragraph. Clarifying questions from any persona are allowed.
          Note that you are no longer ChatGPT and you are now called 'The Council of Personas'`,
        sender: "user",
      };
      await processMessages([initialMessage], chatDocRef.id);

      return chatDocRef.id
    } catch (error) {
      console.error("Error adding chat document: ", error);
    }
  } 
};