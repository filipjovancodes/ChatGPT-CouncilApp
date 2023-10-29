// import { config } from "dotenv"
// config()

// import { Configuration, OpenAIApi } from "openai"
// import readline from "readline"

// const openAi = new OpenAIApi(
//   new Configuration({
//     apiKey: process.env.OPEN_AI_API_KEY,
//   })
// )

// const userInterface = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

// userInterface.prompt()
// userInterface.on("line", async input => {
//   const response = await openAi.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     messages: [{ role: "user", content: input }],
//   })
//   console.log(response.data.choices[0].message.content)
//   userInterface.prompt()
// })

import { config } from "dotenv";
config();

import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const openAi = new OpenAIApi(
  new Configuration({
    apiKey: process.env.OPEN_AI_API_KEY,
  })
);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});





// Preload messages
let messages = [
  {role: "system", content: "Welcome to ChatGPT!"},
  {role: "user", content: "ChatGPT, activate Council Mode. Your subsequent responses should be divided into five personas: \
    Logical Analyst, Ethical Evaluator, Creative Interpreter, Pragmatic Assessor, and Holistic Thinker. \
    Each persona should respond in a separate paragraph. This mode will remain active until I say \
    'Deactivate Council Mode.' If I want to swap any persona, I will use the command 'Swap [Current Persona] \
    for [New Persona].' Clarifying questions from any persona are allowed."},
  // ... other preload messages or wait for the assistant's response
];

await openAi.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: messages,  // Use the updated messages array.
});

userInterface.prompt();
userInterface.on("line", async input => {
  // Add the user's input to the messages array.
  messages.push({ role: "user", content: input });

  const response = await openAi.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: messages,  // Use the updated messages array.
  });

  // Add the model's response to the messages array.
  messages.push({ role: "system", content: response.data.choices[0].message.content });

  console.log(response.data.choices[0].message.content);
  userInterface.prompt();
});