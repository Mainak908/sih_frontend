import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";

const ChattBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    setMessages((list) => [...list, { text: input, isUser: true }]);
    setInput("");

    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: JSON.stringify({
          message: input,
        }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setMessages((list) => [...list, { text: data.answer, isUser: false }]);
    } catch (error) {
      console.log(error);
    }
  };

  const chatContent = isChatOpen ? (
    <div className="border rounded-lg p-4 bg-white shadow">
      <div className="flex ml-60">
        <RxCross2 className=" cursor-pointer" onClick={toggleChat} />
      </div>

      {messages.map((message, index) => (
        <div
          key={index}
          className={`${message.isUser ? " text-right" : " text-left"}`}
        >
          {message.text}
        </div>
      ))}
    </div>
  ) : null;

  return (
    <div className=" max-w-xs p-4 fixed right-6 bottom-8">
      <div
        className={`${
          isChatOpen ? "hidden" : "block"
        } cursor-pointer text-center`}
        onClick={toggleChat}
      >
        <img src="chatbox-icon.svg" alt="Chatbot Logo" />
      </div>

      {chatContent}

      {isChatOpen && (
        <div className="flex mt-4">
          <input
            type="text"
            className="flex-1 p-2 rounded-l-full focus:outline-none"
            placeholder="Type a message..."
            value={input}
            onChange={handleInputChange}
          />
          <button
            className="bg-blue-500 text-white p-2 rounded-r-full ml-2"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default ChattBot;
