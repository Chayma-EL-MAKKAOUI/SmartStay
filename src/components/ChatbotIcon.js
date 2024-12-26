import React, { useState, useEffect } from "react";
import Papa from "papaparse"; 
import "./ChatbotIcon.css";

const ChatbotIcon = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [chatbotData, setChatbotData] = useState([]); 

  useEffect(() => {
    Papa.parse("/darija_location.csv", {
      download: true, 
      complete: (result) => {
        const data = result.data.map(row => ({
          mot: row[0],        
          traduction: row[1], 
        }));
        setChatbotData(data);
        console.log(data); // Pour vérifier si les données sont bien chargées
      },
      header: false, 
    });
  }, []);

  const handleClick = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const userMessage = message;
      setMessage(""); 

      let chatbotResponse = "Ma fahmtch mzyan, shno bghiti?"; 

      // Séparer le message de l'utilisateur en mots individuels
      const userWords = userMessage.toLowerCase().split(/\s+/);

      // Trouver la première correspondance avec l'un des mots-clés
      const matchedData = chatbotData.find(data => 
        userWords.some(word => data.mot.toLowerCase().includes(word))
      );

      if (matchedData) {
        chatbotResponse = matchedData.traduction;
      }

      setResponses([
        ...responses,
        { sender: "user", text: userMessage },
        { sender: "chatbot", text: chatbotResponse },
      ]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
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
                placeholder="Sowl li bghiti"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown} 
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
