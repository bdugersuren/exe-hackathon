"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, BrainCircuit, ArrowRight, CheckCircle } from "@/components/ui/icons";

function Loader2(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}
function AlertCircle(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
import { StudentLayout } from "@/components/layout/student-layout";

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Intro, 2: Loading, 3: Quiz, 4: Result
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [assignedLevel, setAssignedLevel] = useState("");

  useEffect(() => {
    const userStr = localStorage.getItem("edugen_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        setUserProfile(user);
        if (user.onboardingCompleted) router.push("/student/dashboard"); // Already done
      } catch (e) {}
    } else {
        router.push("/login");
    }
  }, [router]);

  const startAssessment = async () => {
    setStep(2);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/student/onboarding");
      const data = await res.json();
      if (data.success) {
        setQuestions(data.questions);
        setStep(3);
      } else {
        setError(data.error || "Тест үүсгэхэд алдаа гарлаа.");
        setStep(1);
      }
    } catch (e: any) {
      setError("Сүлжээний алдаа гарлаа: " + e.message);
      setStep(1);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      finishAssessment();
    }
  };

  const finishAssessment = async () => {
    setLoading(true);
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) score++;
    });

    try {
      const res = await fetch("/api/student/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userProfile.id,
          score,
          totalQuestions: questions.length
        })
      });
      const data = await res.json();
      if (data.success) {
        setAssignedLevel(data.level);
        
        // Update local storage
        const updatedUser = { ...userProfile, level: data.level, onboardingCompleted: true };
        localStorage.setItem("edugen_user", JSON.stringify(updatedUser));
        
        setStep(4);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0a1a] text-slate-200 p-4 flex items-center justify-center font-sans overflow-hidden">
      {/* Background Glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-[#b05cfd]/5 blur-[150px] rounded-full pointer-events-none z-0" />
      
      <div className="max-w-xl w-full z-10 relative">
        {step === 1 && (
          <Card className="bg-[#110c22] border border-[#b05cfd]/20 p-10 text-center rounded-3xl glow-card animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#b05cfd] to-[#00f5ff] flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(176,92,253,0.4)]">
                <Sparkles className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-4 glow-text-purple">EduGen-д тавтай морил!</h1>
            <p className="text-slate-400 mb-8 leading-relaxed">
                Танд хамгийн тохиромжтой хичээлүүдийг санал болгохын тулд хиймэл оюунаар дамжуулж таны мэдлэгийн түвшинг тодорхойлох богинохон тест авах шаардлагатай байна.
            </p>
            {error && (
              <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-sm flex items-center gap-3">
                 <AlertCircle className="w-5 h-5 shrink-0" />
                 {error}
              </div>
            )}
            <Button 
                onClick={startAssessment}
                className="button-gradient w-full h-14 rounded-2xl font-bold text-lg hover:scale-[1.02] transition-transform active:scale-[0.98] shadow-[0_0_20px_rgba(176,92,253,0.3)]"
            >
                Эхлэх <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        )}

        {step === 2 && (
          <div className="text-center animate-in fade-in duration-500">
             <Loader2 className="w-16 h-16 text-[#00f5ff] animate-spin mx-auto mb-6" />
             <h2 className="text-2xl font-bold text-white mb-2">Асуултуудыг бэлтгэж байна...</h2>
             <p className="text-slate-400">AI танд зориулж ерөнхий мэдлэгийн тест үүсгэж байна.</p>
          </div>
        )}

        {step === 3 && questions.length > 0 && (
          <Card className="bg-[#110c22] border border-white/5 rounded-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-500">
             {/* Progress Bar */}
             <div className="h-1.5 w-full bg-white/5">
                <div 
                    className="h-full bg-gradient-to-r from-[#b05cfd] to-[#00f5ff] transition-all duration-500 shadow-[0_0_10px_#00f5ff]"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                />
             </div>
             <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-sm font-bold text-[#b05cfd] uppercase tracking-wider">
                        {questions[currentQuestionIndex].category}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                        {currentQuestionIndex + 1} / {questions.length}
                    </span>
                </div>
                <h2 className="text-xl font-bold text-white mb-8 leading-snug">
                   {questions[currentQuestionIndex].question}
                </h2>
                <div className="space-y-3">
                   {questions[currentQuestionIndex].options.map((option: string, idx: number) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 relative group overflow-hidden ${
                          answers[currentQuestionIndex] === option
                            ? "bg-[#b05cfd]/10 border-[#b05cfd] text-white shadow-[0_0_15px_rgba(176,92,253,0.2)]"
                            : "bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:border-white/20"
                        }`}
                      >
                         <div className="flex items-center gap-4 relative z-10">
                            <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm ${
                                answers[currentQuestionIndex] === option
                                  ? "bg-[#b05cfd] text-white"
                                  : "bg-white/10 text-slate-300 group-hover:bg-white/20"
                            }`}>
                                {String.fromCharCode(65 + idx)}
                            </div>
                            {option}
                         </div>
                      </button>
                   ))}
                </div>
                <Button 
                    onClick={nextQuestion}
                    disabled={!answers[currentQuestionIndex] || loading}
                    className="button-gradient w-full h-14 rounded-2xl font-bold text-lg mt-10 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    {currentQuestionIndex === questions.length - 1 ? "Дуусгах" : "Дараагийнх"} 
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
             </div>
          </Card>
        )}

        {step === 4 && (
          <Card className="bg-[#110c22] border border-emerald-500/20 p-12 text-center rounded-3xl glow-card shadow-[0_0_40px_rgba(16,185,129,0.1)] animate-in zoom-in duration-500">
             <div className="w-24 h-24 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)] animate-pulse">
                <CheckCircle className="w-12 h-12" />
             </div>
             <h2 className="text-3xl font-extrabold text-white mb-2">Шинжилгээ дууслаа!</h2>
             <p className="text-slate-400 mb-8">Таны мэдлэгийн түвшинг AI дараах байдлаар тогтоолоо:</p>
             
             <div className="bg-gradient-to-r from-emerald-500/20 to-[#00f5ff]/20 p-8 rounded-3xl border border-emerald-500/30 mb-10 shadow-inner">
                <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2 block">Таны түвшин</span>
                <h3 className="text-4xl font-black text-white glow-text-purple tracking-tight">
                    {assignedLevel === 'Beginner' ? 'АНХАН' : assignedLevel === 'Intermediate' ? 'ДУНД' : 'АХИСАН'}
                </h3>
             </div>

             <Button 
                onClick={() => router.push("/student/dashboard")}
                className="button-gradient w-full h-14 rounded-2xl font-bold text-base shadow-[0_0_20px_rgba(16,185,129,0.3)]"
             >
                Dashboard-руу шилжих <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
