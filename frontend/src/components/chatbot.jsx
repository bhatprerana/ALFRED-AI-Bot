import React, { useState } from 'react';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

function Chatbot() {
  const [conversation, setConversation] = useState([
    {
      speaker: 'AI',
      message:
        'Hello, I am an AI created by OpenAI. How can I help you today? ',
    },
  ]);
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Human: ${input}\nAI:`,
      temperature: 0.9,
      max_tokens: 150,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0.6,
      stop: [' Human:', ' AI:'],
    });

    const newMessage = {
      speaker: 'AI',
      message: response.choices[0].text.trim(),
    };

    setConversation((prevConversation) => [...prevConversation, newMessage]);
    setInput('');
  };

  return (
    <div>
      {conversation.map((message, index) => (
        <div key={index}>
          <span>{message.speaker}: </span>
          <span>{message.message}</span>
        </div>
      ))}
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={input} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chatbot;
