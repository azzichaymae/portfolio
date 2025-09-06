import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaComments, FaTimes } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";

const AIChat = () => {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Chaymae, your virtual assistant. Ask me anything about me or my work!" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef(null);

  // Gemini setup
  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
  if (!input.trim()) return;

  const newMessages = [...messages, { role: "user", content: input }];
  setMessages(newMessages);
  setInput("");

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [
            {
              text: `
              You are Chaymae Azzi, a Full Stack Developer and software engineering student.
              Skills: React, Django, SpringBoot, Laravel, JavaFX, Symfony, MySQL.
              Projects: Mugs Atelier, Contactly, BuildFolio, Insurance Platform, Task Master.
              Certificates: React Developer Certification (Meta), Symfony Certification (SymfonyCasts).
              Education: Technical specialist diploma, Bachelor in English Studies, 
              4th-year software engineering student at SUPMTI.
              Interests: Technology, problem-solving, continuous learning.
              Answer questions as Chaymae would, friendly and professional.
              `,
            },
          ],
        },
        ...messages.map((msg) => ({
          role: msg.role === "assistant" ? "model" : "user", // 🔥 map assistant → model
          parts: [{ text: msg.content }],
        })),
      ],
    });

    const result = await chat.sendMessage(input);

    setMessages([
      ...newMessages,
      { role: "assistant", content: result.response.text() }, // still use assistant in UI
    ]);
  } catch (error) {
    setMessages([
      ...newMessages,
      {
        role: "assistant",
        content: "Oops! Something went wrong. Please try again.",
      },
    ]);
    console.error(error);
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
