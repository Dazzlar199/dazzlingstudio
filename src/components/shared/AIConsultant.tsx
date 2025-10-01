"use client";

import { useState, useRef, useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Minimize2,
  Maximize2,
  X,
  Headphones,
  Monitor,
  UserRound,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AIConsultantProps {
  consultantType: "general" | "audio" | "webdev";
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

const consultantInfo = {
  general: {
    name: "SIGMA",
    subtitle: "Professional Consultant",
    avatar: UserRound,
    greeting:
      "안녕하세요! DAZZLING STUDIO의 전문 컨설턴트 SIGMA입니다. 음향 엔지니어링과 웹 개발 서비스에 대한 전문적인 상담을 도와드리겠습니다. 어떤 분야에 관심이 있으신가요?",
    bgColor: "bg-slate-900",
    accentColor: "bg-blue-600",
    theme: "bg-white",
  },
  audio: {
    name: "SIGMA",
    subtitle: "Audio Specialist",
    avatar: Headphones,
    greeting:
      "안녕하세요! DAZZLING STUDIO의 오디오 전문가 SIGMA입니다. 음악 녹음, 믹싱/마스터링, AI 작곡, 축가 녹음 등 모든 음향 관련 상담을 도와드리겠습니다. 어떤 음악 작업에 대해 궁금한 점이 있으신가요?",
    bgColor: "bg-slate-900",
    accentColor: "bg-amber-600",
    theme: "bg-white",
  },
  webdev: {
    name: "DAZZLAR",
    subtitle: "Development Expert",
    avatar: Monitor,
    greeting:
      "안녕하세요! Dazzlar의 풀스택 개발 전문가입니다. 웹사이트, 웹 애플리케이션, 모바일 앱 개발에 대한 기술적 상담을 도와드리겠습니다. 어떤 프로젝트를 계획하고 계신가요?",
    bgColor: "bg-slate-900",
    accentColor: "bg-emerald-600",
    theme: "bg-white",
  },
};

const AIConsultant = memo(function AIConsultant({
  consultantType,
  isOpen,
  onClose,
  onToggle,
}: AIConsultantProps) {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const info = consultantInfo[consultantType];

  // 초기 인사 메시지 설정
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "greeting",
          role: "assistant",
          content: info.greeting,
          timestamp: new Date(),
        },
      ]);
    }
  }, [info.greeting, messages.length]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(
            ({ id: _, timestamp: __, ...msg }) => msg
          ),
          consultantType,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error("No reader available");
      }

      let assistantContent = "";
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              if (parsed.choices?.[0]?.delta?.content) {
                assistantContent += parsed.choices[0].delta.content;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessage.id
                      ? { ...msg, content: assistantContent }
                      : msg
                  )
                );
              }
            } catch {
              // Ignore parse errors for partial chunks
            }
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: "assistant",
        content:
          "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const target = e.currentTarget as HTMLInputElement;
      if (target.form) {
        const submitEvent = new Event("submit", {
          bubbles: true,
          cancelable: true,
        });
        target.form.dispatchEvent(submitEvent);
      }
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 right-8 z-50">
        {/* Floating Label with gradient */}
        <motion.div
          initial={{ opacity: 0, x: 20, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 20 }}
          className="absolute right-20 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-2xl whitespace-nowrap font-medium text-sm"
        >
          💬 전문가와 상담하세요!
          <div className="absolute right-0 top-1/2 transform translate-x-2 -translate-y-1/2">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rotate-45"></div>
          </div>

          {/* Sparkle effects */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-ping"></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-300 rounded-full animate-bounce"></div>
        </motion.div>

        {/* Main Chat Button with multiple layers */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative"
        >
          {/* Outer glow ring - pointer-events-none to allow clicks through */}
          <div className={`absolute inset-0 w-20 h-20 ${info.accentColor} rounded-full opacity-20 animate-pulse -m-2 pointer-events-none`}></div>

          {/* Middle ring - pointer-events-none to allow clicks through */}
          <div className={`absolute inset-0 w-18 h-18 bg-gradient-to-r ${info.bgColor} to-gray-700 rounded-full opacity-30 animate-spin-slow -m-1 pointer-events-none`}></div>

          {/* Main button - with z-index to ensure it's clickable */}
          <motion.button
            whileHover={{
              y: -4,
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
              rotateY: 10
            }}
            whileTap={{ scale: 0.95, rotateY: -10 }}
            onClick={onToggle}
            className={`relative z-20 w-16 h-16 bg-gradient-to-br ${info.bgColor} to-gray-800 text-white shadow-2xl rounded-2xl flex flex-col items-center justify-center font-bold backdrop-blur-sm transition-all duration-300 group overflow-hidden cursor-pointer`}
            style={{
              background: `linear-gradient(135deg, ${consultantType === 'audio' ? '#f59e0b, #d97706' : consultantType === 'webdev' ? '#10b981, #059669' : '#3b82f6, #1d4ed8'})`
            }}
          >
            {/* Animated background gradient - pointer-events-none */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

            {/* Floating particles - pointer-events-none */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-2 left-2 w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0s'}}></div>
              <div className="absolute top-3 right-3 w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-2 left-3 w-1 h-1 bg-white/50 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
            </div>

            {/* Icon with glow - pointer-events-none */}
            <div className="relative z-10 pointer-events-none">
              <info.avatar className="w-7 h-7 mb-1 drop-shadow-lg filter group-hover:scale-110 transition-transform duration-200" />
            </div>

            {/* Text with shimmer effect - pointer-events-none */}
            <div className="relative z-10 text-xs font-bold tracking-wide bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent group-hover:from-yellow-200 group-hover:to-white transition-all duration-300 pointer-events-none">
              상담
            </div>

            {/* Corner decorations - pointer-events-none */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/30 rounded-tr-2xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/30 rounded-bl-2xl pointer-events-none"></div>
          </motion.button>

          {/* Floating sparkles around button - pointer-events-none to allow clicks through */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 w-16 h-16 pointer-events-none"
          >
            <div className="absolute -top-2 left-1/2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            <div className="absolute top-1/2 -right-2 w-1.5 h-1.5 bg-pink-400 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="absolute -bottom-2 left-1/2 w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute top-1/2 -left-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '1.5s'}}></div>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: 1,
        y: 0,
        height: isMinimized ? "auto" : "580px",
      }}
      exit={{ opacity: 0, y: 20 }}
      className={`fixed bottom-8 right-8 w-[400px] ${
        isMinimized ? "h-auto" : "h-[580px]"
      } bg-white rounded-lg shadow-xl border border-gray-100 flex flex-col z-50 overflow-hidden`}
    >
      {/* Header */}
      <div className={`${info.bgColor} px-6 py-4 text-white`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`w-10 h-10 ${info.accentColor} rounded-full flex items-center justify-center font-bold text-lg`}>
              <info.avatar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">{info.name}</h3>
              <p className="text-sm opacity-75 font-medium">{info.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/10 rounded-md transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6 bg-gray-50/30">
            <AnimatePresence>
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-3 max-w-[85%] ${
                      message.role === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        message.role === "user"
                          ? "bg-gray-200 text-gray-600"
                          : `${info.bgColor} text-white`
                      }`}
                    >
                      {message.role === "user" ? (
                        <UserRound className="w-4 h-4" />
                      ) : (
                        <info.avatar className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`rounded-lg px-4 py-3 ${
                        message.role === "user"
                          ? "bg-gray-100 text-gray-900"
                          : "bg-white text-gray-900 border border-gray-100 shadow-sm"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap font-medium">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-3 max-w-[85%]">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${info.bgColor} text-white`}
                  >
                    <info.avatar className="w-4 h-4" />
                  </div>
                  <div className="bg-white rounded-lg px-4 py-3 border border-gray-100 shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
            <form onSubmit={handleSubmit} className="flex items-center space-x-3">
              <input
                ref={inputRef}
                value={input}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="메시지를 입력하세요..."
                className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 text-sm bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className={`w-11 h-11 rounded-lg ${info.bgColor} text-white flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 transition-all duration-200`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </>
      )}
    </motion.div>
  );
});

export default AIConsultant;
