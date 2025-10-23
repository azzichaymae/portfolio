import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaComments, FaTimes } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Chaymae, your virtual assistant. Ask me anything about me or my work!" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false); // 👈 typing state
  const scrollRef = useRef(null);

  // Gemini setup
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true); // 👈 start typing animation

    try {
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [
              {
                text: `
                You are Chaymae Azzi, a Full Stack Developer and software engineering student.
                Skills: React, Django, SpringBoot, Laravel, JavaFX, Symfony, MySQL.
                You are most comfortable with JavaScript frameworks and Python for backend.
                For desktop apps, you use JavaFX.
                Projects: Mugs Atelier (final year project), Contactly (Symfony), BuildFolio (Spring Boot), 
                Insurance Platform (internship), Task Master, and others.
                Education: Technical specialist diploma, Bachelor in English Studies, and currently a 
                5th-year software engineering student at SUPMTI.
                Interests: Technology, problem-solving, and continuous learning.
                Respond as Chaymae would — professional, concise, friendly, and natural.
                Ask for clarification if a question is vague.
                `,
              },
            ],
          },
          ...messages.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          })),
        ],
      });

      const result = await chat.sendMessage(input);
      const aiResponse = result.response.text();

      setMessages([...newMessages, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Oops! Something went wrong. Please try again." },
      ]);
    } finally {
      setIsTyping(false); // 👈 stop typing animation
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 text-white p-3 rounded-full shadow-lg hover:bg-orange-600 transition"
        >
          <FaComments size={20} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden max-h-[32rem]">
          {/* Header */}
          <div className="bg-orange-500 px-4 py-3 flex items-center justify-between text-white font-bold rounded-t-xl">
            <div className="flex items-center gap-2">
              <FaRobot /> Chaymae AI
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-gray-200">
              <FaTimes />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[90%] px-3 py-2 rounded-xl break-words ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white rounded-br-none flex items-center gap-2"
                      : "bg-white text-gray-800 rounded-bl-none shadow flex items-center gap-2"
                  }`}
                >
                  {msg.role === "user" ? <FaUser /> : <FaRobot />}
                  <span>{msg.content}</span>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500">
                <FaRobot className="text-orange-500" />
                <div className="flex space-x-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-200">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me something..."
              className="flex-1 px-4 py-3 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              className="bg-orange-500 px-4 py-3 text-white font-bold hover:bg-orange-600 transition"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;
