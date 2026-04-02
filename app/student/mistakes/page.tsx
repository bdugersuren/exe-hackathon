"use client";

import { StudentLayout } from "@/components/layout/student-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, BrainCircuit, ArrowRight, MessageSquare } from "@/components/ui/icons";
import { useState, useEffect } from "react";
import Link from "next/link";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

export default function StudentMistakesPage() {
  const [mistakes, setMistakes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [explainingId, setExplainingId] = useState<string | null>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  useEffect(() => {
    const userStr = localStorage.getItem("edugen_user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        fetch(`/api/student/mistakes?userId=${user.id}`)
          .then(res => res.json())
          .then(data => {
            if (data.success) setMistakes(data.mistakes);
            setLoading(false);
          });
      } catch (e) {
        setLoading(false);
      }
    }
  }, []);

  const getAIExplanation = async (mistake: any) => {
    setExplainingId(mistake.id);
    setExplanation(null);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            { isAi: false, text: `Би энэ асуулт дээр алдчихлаа: "${mistake.question}". Миний хариулт "${mistake.wrongAnswer}" байсан ч зөв нь "${mistake.correctAnswer}" юм байна. Яагаад гэдгийг маш ойлгомжтой тайлбарлаж өгөөч.` }
          ],
          lessonContext: `Хичээл: ${mistake.lessonTitle}, Сэдэв: ${mistake.subject}`
        })
      });
      const data = await res.json();
      if (data.success) {
        setExplanation(data.text);
      }
    } catch (e) {
      setExplanation("Уучлаарай, тайлбар авахад алдаа гарлаа.");
    } finally {
      setExplainingId(null);
    }
  };

  return (
    <StudentLayout activePath="/student/mistakes">
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-rose-500" /> Алдаа засах & Давтах
        </h2>
        <p className="text-slate-400">Таны гаргаж байсан алдаанууд дээр тулгуурлан хиймэл оюун тайлбар өгөх хэсэг.</p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-20">
          <Loader2 className="w-12 h-12 text-[#b05cfd] animate-spin mb-4" />
          <p className="text-slate-400">Алдаануудыг уншиж байна...</p>
        </div>
      ) : mistakes.length === 0 ? (
        <Card className="bg-slate-900/40 border-slate-800 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <Sparkles className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Гайхалтай! Алдаа алга.</h3>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
               Та одоогоор ямар нэгэн асуулт дээр алдаа гаргаагүй байна. Хичээлээ үргэлжлүүлэн суралцаарай!
            </p>
            <Link href="/student/dashboard">
                <Button className="button-gradient rounded-full px-8">Хичээл үзэх</Button>
            </Link>
        </Card>
      ) : (
        <div className="grid gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
               {mistakes.map((mistake) => (
                  <Card key={mistake.id} className={`bg-[#110c22] border transition-all cursor-pointer overflow-hidden ${explainingId === mistake.id || (explanation && mistakes.find(m => m.id === explainingId)?.id === mistake.id) ? 'border-[#b05cfd]' : 'border-white/5 hover:border-white/20'}`} onClick={() => getAIExplanation(mistake)}>
                     <div className="p-5">
                        <div className="flex justify-between items-start mb-3">
                           <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-400 text-[10px] font-bold uppercase tracking-wider border border-rose-500/20">
                              {mistake.subject}
                           </span>
                           <span className="text-[10px] text-slate-500 font-mono">
                              {new Date(mistake.timestamp).toLocaleDateString()}
                           </span>
                        </div>
                        <h4 className="text-white font-bold mb-4 line-clamp-2">{mistake.question}</h4>
                        <div className="flex flex-col gap-2">
                           <div className="text-xs flex items-center gap-2 text-rose-400 bg-rose-500/5 p-2 rounded-lg border border-rose-500/10">
                              <span className="font-bold opacity-50">Таны хариулт:</span> {mistake.wrongAnswer}
                           </div>
                           <div className="text-xs flex items-center gap-2 text-emerald-400 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                              <span className="font-bold opacity-50">Зөв хариулт:</span> {mistake.correctAnswer}
                           </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                           <Button variant="ghost" size="sm" className="text-[#b05cfd] hover:bg-[#b05cfd]/10 gap-2">
                              {explainingId === mistake.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <BrainCircuit className="w-4 h-4" />}
                              AI Тайлбар авах
                           </Button>
                        </div>
                     </div>
                  </Card>
               ))}
            </div>

            <div className="lg:sticky lg:top-8 h-fit">
               <Card className="bg-[#110c22] border border-[#b05cfd]/30 overflow-hidden min-h-[400px] flex flex-col glow-card">
                  <div className="p-5 border-b border-white/5 bg-gradient-to-r from-[#b05cfd]/10 to-transparent flex items-center gap-3">
                     <Sparkles className="w-5 h-5 text-[#b05cfd]" />
                     <h3 className="font-bold text-white">AI Ухаалаг Тайлбар</h3>
                  </div>
                  <div className="flex-1 p-6">
                     {explainingId ? (
                        <div className="h-full flex flex-col items-center justify-center text-center py-20">
                           <BrainCircuit className="w-16 h-16 text-[#b05cfd] animate-pulse mb-4" />
                           <p className="text-slate-300 font-medium">AI хариултыг боловсруулж байна...</p>
                        </div>
                     ) : explanation ? (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                           <MarkdownRenderer content={explanation} />
                           <div className="mt-8 p-4 bg-[#b05cfd]/5 rounded-2xl border border-[#b05cfd]/20 flex items-start gap-3">
                              <MessageSquare className="w-5 h-5 text-[#b05cfd] shrink-0 mt-0.5" />
                              <p className="text-xs text-slate-400 leading-relaxed">
                                  Дээрх тайлбарыг AI таны өмнөх алдаан дээр тулгуурлан зөвхөн танд зориулж бэлдлээ. Дахин ийм алдаа гаргахгүй байхыг хичээгээрэй!
                              </p>
                           </div>
                        </div>
                     ) : (
                        <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-20">
                           <div className="w-20 h-20 rounded-full bg-slate-800 flex items-center justify-center mb-4">
                              <ArrowRight className="w-10 h-10 rotate-180" />
                           </div>
                           <p className="text-slate-500 max-w-[200px]">Зүүн талын жагсаалтаас алдаагаа сонгож AI-аар тайлбарлуулна уу.</p>
                        </div>
                     )}
                  </div>
               </Card>
            </div>
          </div>
        </div>
      )}
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

function AlertCircle(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}
