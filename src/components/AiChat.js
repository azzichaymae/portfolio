import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaComments, FaTimes } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useI18n } from "../hooks/useI18n";

const ALL_QUESTIONS = [
  "What technologies do you use?",
  "Can you tell me about your final year project?",
  "What’s your favorite programming language?",
  "Where did you study?",
  "Tell me about your internships",
  "What projects have you done with JavaFX?",
  "How did you build the Insurance Platform?",
  "Which frontend frameworks do you prefer?",
];

const AIChat = () => {
  const { t, i18n } = useI18n(); 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [exampleQuestions, setExampleQuestions] = useState([]);
  const scrollRef = useRef(null);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  useEffect(() => {
    if (isOpen) {
      const shuffled = [...ALL_QUESTIONS].sort(() => 0.5 - Math.random());
      setExampleQuestions(shuffled.slice(0, 4));
    }
  }, [isOpen]);

  useEffect(() => {
    setMessages([{ role: "assistant", content: t("AIssistant.content") }]);
  }, [t, i18n.language]); 

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (customInput) => {
    const question = customInput || input;
    if (!question.trim()) return;

    const newMessages = [...messages, { role: "user", content: question }];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      const chat = model.startChat({
        history: [
          {
            role: "user",
            parts: [{ text: t("AIssistant.description") }],
          },
          ...messages.map((msg) => ({
            role: msg.role === "assistant" ? "model" : "user",
            parts: [{ text: msg.content }],
          })),
        ],
      });

      const result = await chat.sendMessage(question);
      const aiResponse = result.response.text();

      setMessages([...newMessages, { role: "assistant", content: aiResponse }]);
    } catch (error) {
      console.error(error);
      setMessages([...newMessages, { role: "assistant", content: "Oops! Something went wrong. Please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-orange-500 text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-orange-600 transition transform hover:scale-110 active:scale-95"
          aria-label="Open chat"
        >
          <FaComments size={20} className="sm:w-6 sm:h-6" />
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-5 sm:right-5 sm:w-96 lg:w-[400px] bg-white shadow-2xl flex flex-col overflow-hidden sm:rounded-xl max-h-screen sm:max-h-[32rem]">
          <div className="bg-orange-500 px-4 py-3 sm:py-4 flex items-center justify-between text-white font-bold">
            <div className="flex items-center gap-2 text-base sm:text-lg">
              <FaRobot className="text-lg sm:text-xl" /> Chaymae AI
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="hover:text-gray-200 p-2 -mr-2" 
              aria-label="Close chat"
            >
              <FaTimes size={18} className="sm:w-5 sm:h-5" />
            </button>
          </div>

          <div 
            ref={scrollRef} 
            className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50"
            style={{ maxHeight: 'calc(100vh - 130px)' }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-start ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] sm:max-w-[90%] px-3 py-2 rounded-xl break-words text-sm sm:text-base ${
                    msg.role === "user"
                      ? "bg-orange-500 text-white rounded-br-none flex items-center gap-2"
                      : "bg-white text-gray-800 rounded-bl-none shadow flex items-center gap-2"
                  }`}
                >
                  {msg.role === "user" ? (
                    <FaUser className="flex-shrink-0 text-xs sm:text-sm" />
                  ) : (
                    <FaRobot className="flex-shrink-0 text-orange-500 text-xs sm:text-sm" />
                  )}
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-gray-500">
                <FaRobot className="text-orange-500 text-sm sm:text-base" />
                <div className="flex space-x-1">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                </div>
              </div>
            )}

            {!isTyping && messages.length === 1 && (
              <div className="mt-3">
                <p className="text-gray-600 text-xs sm:text-sm mb-2 font-medium">Try asking me:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-xs sm:text-sm bg-orange-100 text-orange-700 px-2 sm:px-3 py-1.5 rounded-full hover:bg-orange-200 transition whitespace-nowrap"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex border-t border-gray-200 bg-white">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask me something..."
              className="flex-1 px-3 sm:px-4 py-3 sm:py-4 focus:outline-none text-sm sm:text-base"
            />
            <button
              onClick={() => sendMessage()}
              className="bg-orange-500 px-4 sm:px-6 py-3 sm:py-4 text-white font-bold hover:bg-orange-600 transition active:bg-orange-700 flex items-center justify-center"
              aria-label="Send message"
            >
              <FaPaperPlane size={16} className="sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChat;