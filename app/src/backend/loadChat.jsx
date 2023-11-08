import { collection, query, getDocs, orderBy } from "firebase/firestore";
import { db, auth } from '../firebase';

// This is the function that handles the chat initialization logic.
export const loadChat = async (chatId) => {
    try {
        const userId = auth.currentUser.uid
        const messagesRef = collection(db, "users", userId, "chats", chatId, "messages");
        const q = query(messagesRef, orderBy('createdAt', 'asc'));
        // Get the snapshot of the 'messages' subcollection
        const messagesSnapshot = await getDocs(q);
        // Map through the documents to get the message data
        const messages = messagesSnapshot.docs.map(doc => ({ text:doc.data().text, sender:doc.data().sender }));
        
        return messages;
    } catch (error) {
      console.error("Error fetching chat document: ", error);
    }
};