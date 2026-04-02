"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, MessageSquare, PlayCircle, Sparkles, CheckCircle } from "@/components/ui/icons";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export default function LessonPlayer() {
  const params = useParams();
  const router = useRouter();
  
  const [slides, setSlides] = useState<any[]>([]);
  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [loading, setLoading] = useState(true);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  
  useEffect(() => {
    fetch(`/api/lesson/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
           const lesson = data.lesson;
           setLessonTitle(lesson.title);
           
           // Format slides from Gemini output
           let rawSlides = lesson.generatedContent?.slides || [];
           // Gemini might return string or object for slides. Normalize:
           rawSlides = rawSlides.map((s: any, i: number) => ({
              title: s.title || `Хэсэг ${i+1}`,
              content: s.content || s,
              image: ["🔬", "🧬", "🌍", "📚", "🚀", "💡"][i % 6]
           }));
           
           if(rawSlides.length === 0) {
               rawSlides = [{ title: "Слайд үүсээгүй", content: lesson.generatedContent?.summary || "Мэдээлэл олдсонгүй.", image: "⚠️" }];
           }
           
           setSlides(rawSlides);
           setQuizzes(lesson.quizzes || []);
        } else {
           alert("Хичээл олдсонгүй.");
           router.push("/student/dashboard");
        }
        setLoading(false);
      })
      .catch(() => {
         setLoading(false);
      });
  }, [params.id, router]);
  
  // Chat state
  const [messages, setMessages] = useState([
    { isAi: true, text: "Сайн уу? Энэ хичээлийн талаар асуух зүйл гарвал надаас хэзээ ч асуугаарай. Би чамд туслахад бэлэн байна! ✨" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleNextSlide = () => {
    // Show a quiz every 2 slides if available
    const isQuizTime = !showQuiz && quizzes.length > 0 && currentQuizIndex < quizzes.length && (currentSlide + 1) % 2 === 0;
    
    if (isQuizTime) {
      setShowQuiz(true);
      setQuizAnswered(null);
      setSelectedOption(null);
    } else if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1);
      setShowQuiz(false);
    } else {
      alert("Хичээл амжилттай дууслаа! Дараагийн шат руу шилжинэ үү.");
      router.push("/student/dashboard");
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(s => s - 1);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const userMsg = { isAi: false, text: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setIsTyping(true);

    try {
      const currentContext = slides[currentSlide].content;
      
      const payloadMessages = [...messages, userMsg];

      const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
              messages: payloadMessages,
              lessonContext: currentContext
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
    <div className="h-screen flex flex-col bg-[#070914] text-slate-100 font-sans selection:bg-[#00f5ff]/30">
      {/* Top action bar */}
      <header className="h-14 border-b border-[#00f5ff]/20 bg-[#0b0a1a]/80 backdrop-blur-md flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <Link href="/student/dashboard" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
            <ArrowRight className="w-4 h-4 rotate-180" /> Буцах
          </Link>
          <div className="w-px h-6 bg-white/10" />
          <h1 className="font-semibold hidden sm:block glow-text-cyan flex items-center gap-2">
             {loading ? "Уншиж байна..." : lessonTitle}
          </h1>
        </div>
        {!loading && slides.length > 0 && (
          <div className="flex items-center gap-4 text-sm font-medium">
            <span className="text-[#00f5ff]">Слайд {currentSlide + 1} / {slides.length}</span>
          </div>
        )}
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main lesson content */}
        <main className="flex-1 overflow-y-auto relative isolate flex flex-col pt-10">
          <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-[#00f5ff]/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">
            {loading ? (
                <div className="text-white">Хичээл татаж байна...</div>
            ) : slides.length > 0 && !showQuiz ? (
              <div className="max-w-4xl w-full animate-[rise_0.5s_ease-out]">
                <div className="text-9xl mb-8 text-center filter drop-shadow-[0_0_20px_rgba(0,245,255,0.2)]">{slides[currentSlide]?.image}</div>
                <h2 className="text-4xl font-extrabold text-white mb-6 text-center glow-text-cyan">{slides[currentSlide]?.title}</h2>
                <div className="glow-card p-10 bg-[#0b0a1a]/90 border border-[#00f5ff]/30 text-xl text-slate-200 leading-relaxed text-center shadow-[0_0_30px_rgba(0,245,255,0.05)]">
                  {slides[currentSlide]?.content}
                </div>
              </div>
            ) : slides.length > 0 && showQuiz && quizzes[currentQuizIndex] ? (
              <div className="max-w-2xl w-full animate-[rise_0.4s_ease-out]">
                <div className="glow-card bg-[#0b0a1a]/90 border-[#00f5ff]/30 p-10 shadow-[0_0_40px_rgba(0,245,255,0.1)] relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-40 h-40 text-[#00f5ff]" />
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#00f5ff]/30 bg-[#00f5ff]/10 px-4 py-2 text-sm font-medium text-[#00f5ff] mb-8">
                    Мэдлэг шалгах сорил
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-8">{quizzes[currentQuizIndex].question}</h3>
                  
                  <div className="space-y-4 relative z-10">
                    {quizzes[currentQuizIndex].options.map((option: string, i: number) => {
                      const isCorrectAnswer = option === quizzes[currentQuizIndex].correctAnswer;
                      return (
                      <button 
                        key={i}
                        disabled={quizAnswered !== null}
                        onClick={() => {
                          setSelectedOption(i);
                          if (isCorrectAnswer) setQuizAnswered(true);
                          else setQuizAnswered(false);
                        }}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          quizAnswered === null 
                            ? "bg-[#110c22]/50 border-white/10 hover:bg-[#110c22] hover:border-[#00f5ff]/50 hover:shadow-[0_0_15px_rgba(0,245,255,0.1)]" 
                            : isCorrectAnswer
                              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300 shadow-[0_0_10px_rgba(16,185,129,0.2)]" 
                              : quizAnswered === false && selectedOption === i
                                ? "bg-red-500/20 border-red-500/50 text-red-300" 
                                : "bg-black/30 border-white/10 opacity-40"
                        }`}
                      >
                        <span className="font-bold text-[#b05cfd] mr-4">{String.fromCharCode(65 + i)}.</span>
                        {option}
                      </button>
                    )})}
                  </div>

                  {quizAnswered !== null && (
                     <div className={`mt-8 p-6 flex flex-col gap-4 rounded-xl border ${quizAnswered ? "bg-emerald-950/40 border-emerald-500/30" : "bg-red-950/40 border-red-500/30"}`}>
                        <div className="flex gap-4 items-start">
                           {quizAnswered ? (
                              <CheckCircle className="w-8 h-8 text-emerald-400 shrink-0 drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                           ) : (
                              <Sparkles className="w-8 h-8 text-red-400 shrink-0 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                           )}
                           <div>
                             <p className={`font-bold text-lg mb-1 ${quizAnswered ? "text-emerald-400" : "text-red-400"}`}>
                               {quizAnswered ? "Зөв байна! Сайн байлаа." : "Буруу байна."}
                             </p>
                             {!quizAnswered && (
                                <p className="text-sm text-slate-300 mt-2">
                                    Зөв хариулт нь: <span className="font-medium text-emerald-400">{quizzes[currentQuizIndex].correctAnswer}</span>
                                </p>
                             )}
                           </div>
                        </div>
                        <button 
                          onClick={() => {
                            setShowQuiz(false);
                            setCurrentQuizIndex(q => q + 1);
                            if(quizAnswered) setCurrentSlide(s => s + 1);
                          }}
                          className={`mt-2 py-3 w-full rounded-xl font-bold flex justify-center items-center gap-2 ${quizAnswered ? 'bg-emerald-500 hover:bg-emerald-600 text-white' : 'bg-white/10 hover:bg-white/20'}`}
                        >
                          Үргэлжлүүлэх <ArrowRight className="w-4 h-4" />
                        </button>
                     </div>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {!loading && slides.length > 0 && (
          <div className="h-24 border-t border-[#00f5ff]/20 bg-[#0b0a1a]/95 flex items-center justify-between px-8 absolute bottom-0 w-full left-0 backdrop-blur-xl">
            <button 
               className="px-6 py-2.5 rounded-full border border-white/20 font-medium hover:bg-white/10 transition-colors disabled:opacity-30" 
               disabled={currentSlide === 0 || showQuiz} 
               onClick={handlePrevSlide}
            >
               Түрүүчийн
            </button>
            <div className="flex gap-3">
              {slides.map((_, i) => (
                <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide && !showQuiz ? 'w-10 bg-[#00f5ff] shadow-[0_0_10px_#00f5ff]' : showQuiz && i === 1 ? 'w-3 bg-[#00f5ff]/50' : 'w-3 bg-white/20'}`} />
              ))}
            </div>
            <button 
               className="button-gradient px-8 py-3 flex items-center gap-2 disabled:opacity-50 disabled:grayscale" 
               disabled={showQuiz && quizAnswered === null} 
               onClick={handleNextSlide}
            >
              {currentSlide === slides.length - 1 && !showQuiz ? 'Дуусгах' : 'Дараах'} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          )}
        </main>

        {/* Right Sidebar - True AI Tutor connected to Gemini */}
        <aside className="w-[400px] border-l border-[#b05cfd]/20 bg-[#0b0a1a]/90 flex flex-col hidden lg:flex shadow-[-20px_0_40px_rgba(0,0,0,0.5)] z-20">
          <div className="p-5 border-b border-white/5 bg-gradient-to-r from-[#b05cfd]/10 to-transparent flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#b05cfd] to-[#00f5ff] flex items-center justify-center p-0.5 shadow-[0_0_15px_rgba(176,92,253,0.4)]">
               <div className="w-full h-full bg-[#0b0a1a] rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#00f5ff]" />
               </div>
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">AI Багш</h3>
              <p className="text-xs text-[#00f5ff] flex items-center gap-1.5 font-medium mt-0.5">
                <span className="w-2 h-2 rounded-full bg-[#00f5ff] inline-block shadow-[0_0_5px_#00f5ff] animate-pulse" /> Одоо онлайн
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5 flex flex-col scroll-smooth">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${!msg.isAi ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed ${
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
                   <div className="bg-[#110c22] border border-white/10 px-5 py-4 rounded-2xl rounded-tl-[4px] flex gap-1.5 items-center">
                     <span className="w-2 h-2 bg-[#00f5ff] rounded-full animate-bounce" />
                     <span className="w-2 h-2 bg-[#00f5ff] rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                     <span className="w-2 h-2 bg-[#00f5ff] rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
                   </div>
                </div>
            )}
          </div>

          <div className="p-5 border-t border-[#00f5ff]/20 bg-[#070914] relative">
            <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />
            <form onSubmit={handleChatSubmit} className="relative">
              <input 
                type="text" 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Юу ч хамаагүй асуугаарай..."
                className="w-full bg-[#110c22] border border-white/10 rounded-2xl pr-14 pl-5 py-4 text-sm text-white focus:outline-none focus:border-[#b05cfd]/50 focus:bg-[#1a1435] transition-all placeholder:text-slate-500 shadow-inner"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim() || isTyping}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-br from-[#00f5ff] to-blue-500 text-white flex items-center justify-center disabled:opacity-50 disabled:grayscale transition-transform hover:scale-105 active:scale-95 shadow-[0_0_10px_rgba(0,245,255,0.3)]"
              >
                <ArrowRight className="w-5 h-5 -rotate-45" />
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-500 mt-3 flex items-center justify-center gap-1">
               <Sparkles className="w-3 h-3 text-slate-600" /> AI Багш Gemini-тэй холбогдсон 
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
