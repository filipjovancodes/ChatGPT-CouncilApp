

const OPEN_AI_API_KEY = import.meta.env.VITE_OPEN_AI_API_KEY

function waitOneSecond() {
    return new Promise(resolve => setTimeout(resolve, 1000));
}

const processMessageToChatGPT = async (chatMessages, currentRetry = 0) => {
    try {
        await waitOneSecond();

        console.log(chatMessages);

        const apiMessages = chatMessages.map((messageObject) => {
            const role = messageObject.sender === "CouncilAI" ? "assistant" : "user";
            return { role, content: messageObject.message };
        });

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [...apiMessages],
        };

        const apiRequest = {
            method: "POST",
            headers: {
            "Authorization": "Bearer " + OPEN_AI_API_KEY,
            "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
        };

        console.log(apiRequest);

        const response = await fetch("https://api.openai.com/v1/chat/completions", apiRequest);

        console.log(response);

        return response.json();
    } catch (error) {
        if (error.response && error.response.status === 429) {
            if (currentRetry < 3) {
                const retryAfter = error.response.headers['retry-after'];
                if (retryAfter) {
                // Wait for 'retryAfter' seconds before trying again
                await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
                return processMessageToChatGPT(messages); // Recursive retry call
                }
            }
            else {
                throw new Error('Max retries exceeded');
            }
        }
        else {
            throw error;
        }
    }
};

export default processMessageToChatGPT;