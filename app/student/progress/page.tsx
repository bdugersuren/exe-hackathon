"use client";

import { StudentLayout } from "@/components/layout/student-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3, TrendingUp, Sparkles, BookOpen, Clock, BrainCircuit, CheckCircle, ArrowRight, MessageSquare } from "@/components/ui/icons";
import { useState, useEffect } from "react";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import Link from "next/link";

export default function StudentProgressPage() {
  const [stats, setStats] = useState({ xp: 0, streak: 0, lessonsCompleted: 0 });
  const [progressData, setProgressData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [analysisHistory, setAnalysisHistory] = useState<any[]>([]);
  const [selectedAnalysisId, setSelectedAnalysisId] = useState<string | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("edugen_user");
    let uid = "";
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        uid = user.id;
        setUserProfile(user);
      } catch (e) {}
    }

    if (uid) {
        // Fetch stats, progress AND analysis history
        Promise.all([
            fetch(`/api/progress?userId=${uid}`).then(res => res.json()),
            fetch(`/api/progress/analysis?userId=${uid}`).then(res => res.json())
        ]).then(([progData, historyData]) => {
            if (progData.success) {
                setStats(progData.stats || { xp: 0, streak: 0, lessonsCompleted: 0 });
                setProgressData(progData.progress || []);
            }
            if (historyData.success && historyData.analyses && historyData.analyses.length > 0) {
                setAnalysisHistory(historyData.analyses);
                setAnalysis(historyData.analyses[0].text);
                setSelectedAnalysisId(historyData.analyses[0].id);
            }
            setLoading(false);
        }).catch(() => setLoading(false));
    } else {
        setLoading(false);
    }
  }, []);

  const handleGenerateAnalysis = async () => {
      if (!userProfile?.id || analyzing) return;
      
      setAnalyzing(true);
      setAnalysis(null);
      setSelectedAnalysisId(null);

      try {
          // 1. Get Analysis from AI
          const res = await fetch("/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                  messages: [
                      { isAi: false, text: `Миний сурлагын явцад анализ хийж өгнө үү. Би нийт ${stats.lessonsCompleted} хичээл үзэж, ${stats.xp} XP цуглуулсан байна. Миний хамгийн их үзсэн хичээлүүдийн төлөв: ${JSON.stringify(progressData.map(p => p.progressPercent))}. Надад урам зориг өгөх болон зөвлөгөө өгнө үү.` }
                  ],
                  userProfile: { name: userProfile.name }
              })
          });
          const data = await res.json();
          
          if (data.success) {
              const newAnalysisText = data.text;
              
              // 2. Save Analysis to History
              const saveRes = await fetch("/api/progress/analysis", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                      userId: userProfile.id,
                      analysisText: newAnalysisText
                  })
              });
              const saveData = await saveRes.json();
              
              if (saveData.success) {
                  setAnalysis(newAnalysisText);
                  setAnalysisHistory(prev => [saveData.analysis, ...prev]);
                  setSelectedAnalysisId(saveData.analysis.id);
              }
          }
      } catch (e) {}
      finally {
          setAnalyzing(false);
      }
  };

  const handleSelectHistory = (historyItem: any) => {
      setAnalysis(historyItem.text);
      setSelectedAnalysisId(historyItem.id);
  };
  
  return (
    <StudentLayout activePath="/student/progress">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
            <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
                <BarChart3 className="w-6 h-6 text-[#00f5ff]" /> Миний явц
            </h2>
            <p className="text-slate-400">Таны сурлагын үр дүн болон AI-ийн хийсэн анализ.</p>
        </div>
        <Button 
            onClick={handleGenerateAnalysis}
            disabled={analyzing}
            className="button-gradient gap-2 px-6 h-12 rounded-2xl font-bold shadow-[0_0_20px_rgba(176,92,253,0.3)] hover:scale-105 transition-transform"
        >
            {analyzing ? <Loader2 className="w-5 h-5 animate-spin" /> : <BrainCircuit className="w-5 h-5" />}
            Дүгнэлт гаргуулах
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 mb-8">
        <Card className="bg-[#110c22] border-white/5 p-6 flex flex-col items-center justify-center text-center glow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5"><Sparkles className="w-20 h-20" /></div>
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 border border-emerald-500/20">
                <Sparkles className="w-7 h-7" />
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Хуримтлуулсан туршлага</h3>
            <p className="text-4xl font-black text-white">{stats.xp} <span className="text-sm text-emerald-400 font-medium tracking-normal">XP</span></p>
        </Card>
        
        <Card className="bg-[#110c22] border-white/5 p-6 flex flex-col items-center justify-center text-center glow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5"><BookOpen className="w-20 h-20" /></div>
            <div className="w-14 h-14 rounded-2xl bg-[#00f5ff]/10 text-[#00f5ff] flex items-center justify-center mb-4 border border-[#00f5ff]/20">
                <BookOpen className="w-7 h-7" />
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Нийт үзсэн хичээл</h3>
            <p className="text-4xl font-black text-white">{stats.lessonsCompleted} <span className="text-sm text-[#00f5ff] font-medium tracking-normal">цуврал</span></p>
        </Card>

        <Card className="bg-[#110c22] border-white/5 p-6 flex flex-col items-center justify-center text-center glow-card relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-5"><TrendingUp className="w-20 h-20" /></div>
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 border border-amber-500/20">
                <TrendingUp className="w-7 h-7" />
            </div>
            <h3 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Дараалсан өдөр</h3>
            <p className="text-4xl font-black text-white">{stats.streak} <span className="text-sm text-amber-500 font-medium tracking-normal">өдөр 🔥</span></p>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {/* Left Column: Progress Chart (CSS/SVG) */}
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-[#110c22] border-white/5 p-8 flex flex-col min-h-[300px]">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[#00f5ff]" /> Сүүлийн 7 хоногийн идэвх
                </h3>
                <div className="flex-1 flex items-end justify-between gap-2 h-40 px-2">
                {[40, 75, 55, 90, 65, 85, 30].map((val, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                        <div className="w-full bg-slate-800/50 rounded-t-lg relative flex items-end overflow-hidden h-full">
                            <div 
                            className="w-full bg-gradient-to-t from-[#00f5ff] to-[#b05cfd] rounded-t-lg transition-all duration-1000 group-hover:brightness-125"
                            style={{ height: `${val}%` }}
                            />
                            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Өдөр {i+1}</span>
                    </div>
                ))}
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Дундаж оноо</span>
                    <p className="text-xl font-bold text-white">84%</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Сурлагын ахиц</span>
                    <p className="text-xl font-bold text-emerald-400">+12%</p>
                </div>
                </div>
            </Card>

            {/* AI Analysis Card */}
            <Card className="bg-[#110c22] border-[#b05cfd]/30 p-8 flex flex-col shadow-[0_0_50px_rgba(176,92,253,0.05)] relative overflow-hidden min-h-[300px]">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#b05cfd]/20 blur-[80px] rounded-full" />
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                <BrainCircuit className="w-6 h-6 text-[#b05cfd]" /> 
                {selectedAnalysisId ? "Сонгосон дүгнэлт" : "AI Ухаалаг Дүгнэлт"}
                </h3>
                <div className="flex-1 text-slate-300 leading-relaxed text-base relative z-10">
                    {analyzing ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                        <Loader2 className="w-12 h-12 text-[#b05cfd] animate-spin mb-4" />
                        <p className="text-slate-400">AI таны үзүүлэлтэд анализ хийж байна...</p>
                        <p className="text-xs text-slate-500 mt-2 italic">Энэ нь хэдхэн секунд үргэлжлэх болно.</p>
                    </div>
                    ) : analysis ? (
                    <div className="animate-in fade-in slide-in-from-right-4 duration-700">
                        <MarkdownRenderer content={analysis} />
                    </div>
                    ) : (
                    <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
                       <MessageSquare className="w-12 h-12 text-slate-500 mb-4" />
                       <p className="text-slate-500 text-sm max-w-[250px]">
                          Сургалтын явцад анализ хийлгэхийн тулд "Дүгнэлт гаргуулах" товчийг дарна уу.
                       </p>
                    </div>
                    )}
                </div>
                {analysis && !analyzing && (
                    <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium">
                            <Sparkles className="w-3.5 h-3.5" /> Gemini 2.5 AI Тайлбар
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">
                            {selectedAnalysisId && analysisHistory.find(a => a.id === selectedAnalysisId) 
                                ? new Date(analysisHistory.find(a => a.id === selectedAnalysisId).createdAt).toLocaleDateString() + " " + new Date(analysisHistory.find(a => a.id === selectedAnalysisId).createdAt).toLocaleTimeString()
                                : "Одоо"}
                        </span>
                    </div>
                )}
            </Card>
        </div>

        {/* Right Column: History */}
        <div className="space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
               <HistoryIcon className="w-5 h-5 text-indigo-400" /> Өмнөх дүгнэлтүүд
            </h3>
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-hide">
                {loading ? (
                    <div className="p-4 text-center text-slate-500 text-sm italic">Ачаалж байна...</div>
                ) : analysisHistory.length === 0 ? (
                    <div className="p-8 border border-dashed border-white/5 rounded-2xl text-center">
                        <p className="text-slate-500 text-xs">Түүх хараахан байхгүй байна.</p>
                    </div>
                ) : (
                    analysisHistory.map((item) => (
                        <Card 
                            key={item.id} 
                            onClick={() => handleSelectHistory(item)}
                            className={`p-4 cursor-pointer transition-all border border-white/5 group hover:border-[#b05cfd]/40 ${selectedAnalysisId === item.id ? 'bg-[#b05cfd]/10 border-[#b05cfd]/30 shadow-[0_0_15px_rgba(176,92,253,0.1)]' : 'bg-slate-900/40 hover:bg-slate-900'}`}
                        >
                            <div className="flex items-start justify-between gap-3">
                               <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${selectedAnalysisId === item.id ? 'bg-[#b05cfd] text-white' : 'bg-white/5 text-slate-400 group-hover:bg-[#b05cfd]/20 group-hover:text-[#b05cfd]'}`}>
                                     📊
                                  </div>
                                  <div>
                                     <h4 className="text-white text-xs font-bold">Progress Analysis</h4>
                                     <p className="text-[10px] text-slate-500 mt-0.5">
                                        {new Date(item.createdAt).toLocaleDateString()} {new Date(item.createdAt).toLocaleTimeString()}
                                     </p>
                                  </div>
                               </div>
                               <ArrowRight className={`w-3.5 h-3.5 transition-transform ${selectedAnalysisId === item.id ? 'text-[#b05cfd] translate-x-0.5' : 'text-slate-600 opacity-0 group-hover:opacity-100'}`} />
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
      </div>

      <div className="grid gap-6">
         <h3 className="text-lg font-bold text-white">Хичээлийн явц</h3>
         {progressData.length === 0 ? (
            <p className="text-slate-500 italic">Одоогоор үзсэн хичээл алга байна.</p>
         ) : (
            <div className="grid gap-3">
               {progressData.map((p, i) => (
                  <Card key={i} className="bg-slate-900/40 border-white/5 p-4 flex items-center justify-between group hover:border-[#00f5ff]/30 transition-all">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-lg">📚</div>
                        <div>
                           <h4 className="text-white font-medium text-sm">Хичээл ID: {p.lessonId}</h4>
                           <p className="text-xs text-slate-500">{p.completed ? 'Дууссан' : 'Үргэлжилж байна'}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-6">
                        <div className="hidden md:block w-40 h-2 bg-slate-800 rounded-full overflow-hidden">
                           <div className="h-full bg-[#00f5ff] transition-all" style={{ width: `${p.progressPercent}%` }} />
                        </div>
                        <span className="text-sm font-bold text-white w-10 text-right">{p.progressPercent}%</span>
                        <Link href={`/student/lesson/${p.lessonId}`}>
                           <Button variant="ghost" size="icon" className="text-slate-500 group-hover:text-[#00f5ff] transition-colors">
                              <ArrowRight className="w-5 h-5" />
                           </Button>
                        </Link>
                     </div>
                  </Card>
               ))}
            </div>
         )}
      </div>
    </StudentLayout>
  );
}

function Loader2(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

function HistoryIcon(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M12 7v5l4 2" />
    </svg>
  );
}
