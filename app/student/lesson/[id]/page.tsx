"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, MessageSquare, PlayCircle, Sparkles, CheckCircle } from "@/components/ui/icons";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock lesson slides
const slides = [
  {
    title: "Эсийн тухай ойлголт",
    content: "Амьд бие махбодын бүтээцийн болон үйл ажиллагааны үндсэн нэгжийг эс гэнэ. Бүх амьд бие махбод эсээс тогтоно.",
    image: "🦠"
  },
  {
    title: "Эсийн үндсэн хэсгүүд",
    content: "Эс нь бүрхүүл, цитоплазм, бөөм гэсэн 3 үндсэн хэсгээс тогтоно. Цитоплазм дотор эсийн бөөм ба эрхтэнцрүүд байрлана.",
    image: "🔬"
  },
  {
    title: "Ургамал ба амьтны эс",
    content: "Ургамлын эс нь зузаан эсийн ханатай, хлоропласттай байдаг бол амьтны эст эдгээр нь байхгүй. Энэ нь тэдний хооллох онцлогтой холбоотой.",
    image: "🌱"
  }
];

export default function LessonPlayer() {
  const params = useParams();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswered, setQuizAnswered] = useState<boolean | null>(null);
  
  // Chat state
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Сайн уу? Энэ хичээлийн талаар асуух зүйл гарвал надаас хэзээ ч асуугаарай. Би чамд туслахад бэлэн байна! ✨" }
  ]);
  const [chatInput, setChatInput] = useState("");

  const handleNextSlide = () => {
    if (currentSlide === 1 && !showQuiz && quizAnswered === null) {
      // Show quiz after slide 2
      setShowQuiz(true);
    } else if (currentSlide < slides.length - 1) {
      setCurrentSlide(s => s + 1);
      setShowQuiz(false);
    } else {
      // Done with lesson
      alert("Хичээл амжилттай дууслаа!");
    }
  };

  const handlePrevSlide = () => {
    if (currentSlide > 0) setCurrentSlide(s => s - 1);
  };

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { role: "user", text: chatInput }]);
    const currentInput = chatInput;
    setChatInput("");

    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "Би ойлголоо. Эсийг энгийнээр тайлбарлавал барилгын тоосготой адил юм. Амьд бие махбод бүхэн эсээс тогтдог.";
      
      if (currentInput.includes("ялгаа")) {
        aiResponse = "Ургамлын эс нь нарны гэрлээр хооллохын тулд хлоропласттай байдаг, харин амьтанд тэр нь хэрэггүй тул байхгүй гэж ойлгож болно.";
      }
      
      setMessages(prev => [...prev, { role: "assistant", text: aiResponse }]);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col bg-[#071314] text-slate-100 font-sans">
      {/* Top action bar */}
      <header className="h-14 border-b border-white/10 bg-slate-950/50 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-4">
          <Link href="/student/dashboard" className="text-slate-400 hover:text-white transition-colors">
            ← Буцах
          </Link>
          <div className="w-px h-6 bg-white/10" />
          <h1 className="font-semibold hidden sm:block">Биологи: Эсийн бүтэц</h1>
        </div>
        <div className="flex items-center gap-4 text-sm font-medium">
          <span className="text-emerald-400">Слайд {currentSlide + 1} / {slides.length}</span>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main lesson content */}
        <main className="flex-1 overflow-y-auto relative isolate flex flex-col">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(16,185,129,0.05),_transparent_70%)] pointer-events-none" />
          
          <div className="flex-1 flex flex-col items-center justify-center p-8">
            {!showQuiz ? (
              <div className="max-w-3xl w-full animate-[rise_0.5s_ease-out]">
                <div className="text-9xl mb-8 text-center">{slides[currentSlide].image}</div>
                <h2 className="text-3xl font-bold text-white mb-6 text-center">{slides[currentSlide].title}</h2>
                <p className="text-xl text-slate-300 leading-relaxed text-center">
                  {slides[currentSlide].content}
                </p>
              </div>
            ) : (
              <div className="max-w-2xl w-full animate-[rise_0.4s_ease-out]">
                <Card className="bg-slate-900/80 border-emerald-500/30 p-8 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Sparkles className="w-32 h-32 text-emerald-500" />
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300 mb-6">
                    Мэдлэг шалгах сорил
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-8">Эсийн бөөм нь хаана байрладаг вэ?</h3>
                  
                  <div className="space-y-4 relative z-10">
                    {["Эсийн хананд", "Цитоплазм дотор", "Хлоропласт дотор", "Эсийн гадна"].map((option, i) => (
                      <button 
                        key={i}
                        onClick={() => {
                          if (i === 1) setQuizAnswered(true); // Index 1 is Correct
                          else setQuizAnswered(false);
                        }}
                        className={`w-full text-left p-4 rounded-xl border transition-all ${
                          quizAnswered === null 
                            ? "bg-slate-950/50 border-white/10 hover:bg-slate-800 hover:border-emerald-500/50" 
                            : i === 1 
                              ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-100" // Correct answer
                              : quizAnswered === false && i !== 1
                                ? "bg-slate-950/50 border-white/10 opacity-50" // Dim others when wrong
                                : "bg-slate-950/50 border-white/10"
                        }`}
                      >
                        <span className="font-semibold text-emerald-500/50 mr-4">{String.fromCharCode(65 + i)}.</span>
                        {option}
                      </button>
                    ))}
                  </div>

                  {quizAnswered !== null && (
                     <div className={`mt-8 p-4 flex items-start gap-4 rounded-xl border ${quizAnswered ? "bg-emerald-950/40 border-emerald-500/20" : "bg-amber-950/40 border-amber-500/20"}`}>
                        {quizAnswered ? (
                           <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0" />
                        ) : (
                           <Sparkles className="w-6 h-6 text-amber-400 shrink-0" />
                        )}
                        <div>
                          <p className={`font-semibold ${quizAnswered ? "text-emerald-400" : "text-amber-400"}`}>
                            {quizAnswered ? "Зөв байна! Сайн байлаа." : "Буруу байна."}
                          </p>
                          <p className="text-sm mt-1 text-slate-300">
                             Цитоплазм дотор эсийн бүх эрхтэнцрүүд болон бөөм байрладаг. Энэ нь эсийн дотоод орчин юм.
                          </p>
                          <Button 
                            className="mt-4" 
                            variant="default"
                            onClick={() => {
                              setShowQuiz(false);
                              if(quizAnswered) setCurrentSlide(s => s + 1); // move forward
                            }}
                          >
                            Үргэлжлүүлэх
                          </Button>
                        </div>
                     </div>
                  )}

                </Card>
              </div>
            )}
          </div>

          <div className="h-20 border-t border-white/10 bg-slate-950/80 flex items-center justify-between px-8 absolute bottom-0 w-full left-0 backdrop-blur-md">
            <Button variant="ghost" disabled={currentSlide === 0 || showQuiz} onClick={handlePrevSlide}>Түрүүчийн</Button>
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <div key={i} className={`h-2 rounded-full transition-all ${i === currentSlide && !showQuiz ? 'w-8 bg-emerald-500' : showQuiz && i === 1 ? 'w-2 bg-emerald-500/50' : 'w-2 bg-slate-700'}`} />
              ))}
            </div>
            <Button variant="premium" disabled={showQuiz && quizAnswered === null} onClick={handleNextSlide}>
              {currentSlide === slides.length - 1 ? 'Дуусгах' : 'Дараах'} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </main>

        {/* Right Sidebar - AI Tutor */}
        <aside className="w-96 border-l border-white/10 bg-slate-950/80 flex flex-col hidden lg:flex">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center p-0.5">
               <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
               </div>
            </div>
            <div>
              <h3 className="font-semibold text-white">AI Багш</h3>
              <p className="text-xs text-indigo-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-indigo-400 inline-block animate-pulse" /> Одоо онлайн
              </p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user" 
                    ? "bg-emerald-600 font-medium text-white rounded-br-none" 
                    : "bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none shadow-sm"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-white/10 bg-slate-950">
            <form onSubmit={handleChatSubmit} className="relative">
              <input 
                type="text" 
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Надаас асуугаарай..."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-12 pl-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-indigo-500 text-white flex items-center justify-center disabled:opacity-50 disabled:bg-slate-700"
              >
                ↑
              </button>
            </form>
            <p className="text-[10px] text-center text-slate-500 mt-2">AI алдаа гаргах боломжтой. Мэдээллийг шалгана уу.</p>
          </div>
        </aside>
      </div>
    </div>
  );
}
