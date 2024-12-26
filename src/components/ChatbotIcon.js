import React, { useState } from "react";
import "./ChatbotIcon.css";

// Exemple de données en Darija pour les réponses du chatbot
const chatbotData = [
  { question: "salam", response: "Salam! Kif n3awnak?" },
  { question: "hi", response: "Salam! Kif n3awnak?" },
  { question: "prix", response: "Chno smiya dyal lmaison li bghiti tchouf?" },
  { question: "thaman", response: "Chno smiya dyal lmaison li bghiti tchouf?" },
  { question: "location", response: "Fin kayn lmaison li bghiti?" },
  { question: "maison", response: "Shno smiya dyal lmaison li bghiti?" },
  { question: "chambre", response: "Sh7al mn ghorfa f lmaison?" },
  { question: "difficulté", response: "Ma fahmtch mzyan, shno bghiti?" },
  { question: "merci", response: "3afak! Wach bghiti chi 7aja akhira?" }
];

const ChatbotIcon = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);

  const handleClick = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = message;
      setMessage(""); // Clear input field after sending message

      let chatbotResponse = "Ma fahmtch mzyan, shno bghiti?"; // Default response

      // Cherche la réponse dans les données en Darija
      const matchedData = chatbotData.find(data =>
        userMessage.toLowerCase().includes(data.question)
      );

      if (matchedData) {
        chatbotResponse = matchedData.response;
      }

      setResponses([
        ...responses,
        { sender: "user", text: userMessage },
        { sender: "chatbot", text: chatbotResponse },
      ]);
    }
  };

  return (
    <>
      <div className="chatbot-icon" onClick={handleClick}>
        <i className="fa-solid fa-robot"></i>
      </div>

      {isChatbotOpen && (
        <div className="chatbot-container">
          <div className="chatbot-header">
            <i className="fa-solid fa-times" onClick={handleClick}></i>
          </div>
          <div className="chatbot-body">
            <div className="messages">
              {responses.map((response, index) => (
                <div
                  key={index}
                  className={`message ${response.sender === "user" ? "user-message" : "chatbot-message"}`}
                >
                  {response.text}
                </div>
              ))}
            </div>
            <div className="chatbot-footer">
              <input
                type="text"
                placeholder="S2al li bghiti"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <i className="fa-solid fa-paper-plane" onClick={handleSendMessage}></i>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatbotIcon;
