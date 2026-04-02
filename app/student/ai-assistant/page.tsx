"use client";

import { useState, useRef, useEffect } from "react";
import { StudentLayout } from "@/components/layout/student-layout";
import { Sparkles, ArrowRight, MessageSquare, BookOpen } from "@/components/ui/icons";

export default function AiAssistantPage() {
  const [messages, setMessages] = useState([
    { isAi: true, text: "Сайн уу? Би бол EduGen AI багш байна. Танд ямар хичээл дээр, юуг ойлгоход туслах вэ? Юу ч асуусан болно шүү! ✨" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMsg = { isAi: false, text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    try {
      const payloadMessages = [...messages, userMsg];

      const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              messages: payloadMessages,
              lessonContext: "Ерөнхий мэдлэг болон бүх төрлийн хичээл. Сурагчийн нас болон сэтгэхүйд тохируулан тайлбарлана."
          })
      });

      const data = await res.json();
      if (data.success) {
          setMessages(prev => [...prev, { isAi: true, text: data.text }]);
      } else {
          setMessages(prev => [...prev, { isAi: true, text: "Уучлаарай, холболт салсан байна. Дахин оролдоно уу." }]);
      }
    } catch (error) {
        setMessages(prev => [...prev, { isAi: true, text: "Сүлжээний алдаа гарлаа. Та интернэтээ шалгана уу." }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <StudentLayout activePath="/student/ai-assistant">
      <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#b05cfd]/20 bg-[#0b0a1a]/90 shadow-[0_0_40px_rgba(176,92,253,0.1)] relative">
        {/* Chat Header */}
        <div className="p-5 border-b border-white/5 bg-gradient-to-r from-[#b05cfd]/10 to-transparent flex items-center gap-4 z-10 relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#b05cfd] to-[#00f5ff] flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(176,92,253,0.4)]">
               <div className="w-full h-full bg-[#0b0a1a] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#00f5ff]" />
               </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-xl glow-text-purple">Төгс AI Багш</h3>
              <p className="text-xs text-[#00f5ff] flex items-center gap-1.5 font-medium mt-1">
                <span className="w-2 h-2 rounded-full bg-[#00f5ff] inline-block shadow-[0_0_5px_#00f5ff] animate-pulse" /> Одоо танд туслахад бэлэн
              </p>
            </div>
        </div>

        {/* Chat Background Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#b05cfd]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col z-10 scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${!msg.isAi ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] md:max-w-[75%] rounded-2xl px-6 py-4 text-base leading-relaxed ${
                  !msg.isAi 
                    ? "bg-gradient-to-r from-[#b05cfd] to-purple-600 font-medium text-white shadow-[0_4px_15px_rgba(176,92,253,0.3)] rounded-br-[4px]" 
                    : "bg-[#110c22] text-slate-200 border border-white/10 rounded-tl-[4px] glow-card"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-[#110c22] border border-white/10 px-6 py-5 rounded-2xl rounded-tl-[4px] flex gap-1.5 items-center glow-card">
                     <span className="w-2 h-2 bg-[#00f5ff] rounded-full animate-bounce" />
                     <span className="w-2 h-2 bg-[#00f5ff] rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                     <span className="w-2 h-2 bg-[#00f5ff] rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                   </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-[#00f5ff]/20 bg-[#070914] z-10 relative">
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />
            
            {messages.length === 1 && (
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
                    <button onClick={() => setChatInput("Биологийн хичээл дээр ДНХ гэж юу болохыг хялбархан тайлбарлаж өгөөч")} className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs hover:bg-white/10 transition-colors">🧬 ДНХ гэж юу вэ?</button>
                    <button onClick={() => setChatInput("Уран зохиолын хичээлд туслаач")} className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs hover:bg-white/10 transition-colors">📚 Уран зохиол</button>
                    <button onClick={() => setChatInput("Математикийн интеграл гэж яг юу юм бэ?")} className="whitespace-nowrap px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-300 text-xs hover:bg-white/10 transition-colors">➕ Интеграл</button>
                </div>
            )}

            <form onSubmit={handleChatSubmit} className="relative flex items-end gap-3">
              <textarea 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleChatSubmit(e);
                    }
                }}
                placeholder="Ямар ч сэдвээр асуугаарай... (Enter дараад илгээнэ)"
                className="w-full bg-[#110c22] border border-white/10 rounded-2xl px-5 py-4 text-sm text-white focus:outline-none focus:border-[#b05cfd]/50 focus:bg-[#1a1435] transition-all placeholder:text-slate-500 shadow-inner resize-none min-h-[60px] max-h-[150px]"
                rows={Math.min(chatInput.split('\n').length, 5)}
              />
              <button 
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-[#00f5ff] to-[#b05cfd] text-white flex items-center justify-center disabled:opacity-50 disabled:grayscale transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(0,245,255,0.3)] mb-0.5"
              >
                <ArrowRight className="w-6 h-6 -rotate-45" />
              </button>
            </form>
            <p className="text-[11px] text-center text-slate-500 mt-4 flex items-center justify-center gap-1.5">
               <Sparkles className="w-3.5 h-3.5 text-[#00f5ff]/50" /> Gemini 2.5 AI-аар тоноглогдсон ухаалаг туслах
            </p>
        </div>
      </div>
    </StudentLayout>
  );
}
