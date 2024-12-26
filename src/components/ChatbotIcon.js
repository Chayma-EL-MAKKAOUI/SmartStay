import React from "react";
import "./ChatbotIcon.css";

const ChatbotIcon = () => {
  const handleClick = () => {
    alert("Chatbot ouvert!"); 
  };

  return (
    <div className="chatbot-icon" onClick={handleClick}>
      <i className="fa-solid fa-robot"></i>
    </div>
  );
};

export default ChatbotIcon;
