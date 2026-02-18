import React, { useState, useRef, useEffect } from "react";
import { FaPaperPlane, FaRobot, FaUser, FaComments, FaTimes } from "react-icons/fa";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useI18n } from "../hooks/useI18n";

const AIChat = () => {
  const { t, i18n } = useI18n(); 
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [exampleQuestions, setExampleQuestions] = useState([]);
  const scrollRef = useRef(null);

  const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);

  const allQuestions = [
    "What technologies do you use?",
    "Can you tell me about your final year project?",
    "What’s your favorite programming language?",
    "Where did you study?",
    "Tell me about your internships",
    "What projects have you done with JavaFX?",
    "How did you build the Insurance Platform?",
    "Which frontend frameworks do you prefer?",
  ];

  useEffect(() => {
    if (isOpen) {
      const shuffled = allQuestions.sort(() => 0.5 - Math.random());
      setExampleQuestions(shuffled.slice(0, 4));
    }
  }, [isOpen, allQuestions]);

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
        <div className="w-96 sm:w-[400px] bg-white shadow-2xl rounded-xl flex flex-col overflow-hidden max-h-[32rem]">
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

            {/* Typing Indicator */}
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

            {/* Example Questions */}
            {!isTyping && messages.length === 1 && (
              <div className="mt-3">
                <p className="text-gray-600 text-sm mb-2 font-medium">Try asking me:</p>
                <div className="flex flex-wrap gap-2">
                  {exampleQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => sendMessage(q)}
                      className="text-sm bg-orange-100 text-orange-700 px-3 py-1 rounded-full hover:bg-orange-200 transition"
                    >
                      {q}
                    </button>
                  ))}
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
              onClick={() => sendMessage()}
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