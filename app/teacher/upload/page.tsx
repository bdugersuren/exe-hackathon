"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload as UploadIcon, CheckCircle, Sparkles, BookOpen, ArrowRight } from "@/components/ui/icons";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TeacherUploadPage() {
  const router = useRouter();
  const [materialText, setMaterialText] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [fileBase64, setFileBase64] = useState<string | null>(null);
  const [fileMimeType, setFileMimeType] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "generating" | "done">("idle");
  const [progress, setProgress] = useState(0);
  const [lessonData, setLessonData] = useState<any>(null);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!materialText || !subject || !grade) return;
    
    setUploadState("generating");
    setProgress(10);
    setError("");
    
    // Simulate initial progress while waiting for API
    const progressInterval = setInterval(() => {
        setProgress(p => p < 85 ? p + 5 : p);
    }, 500);

    try {
        const userStr = localStorage.getItem("edugen_user");
        const user = userStr ? JSON.parse(userStr) : { id: "demo-teacher" };

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 90000); // 90 seconds timeout

        const res = await fetch("/api/lesson", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                materialText: materialText.slice(0, 15000), // Protect against massive payloads which crash Next.js
                subject,
                grade,
                teacherId: user.id,
                fileBase64,
                fileMimeType
            }),
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!res.ok) {
            let serverError = `API response error: ${res.status}`;
            try {
                const errorData = await res.clone().json();
                if (errorData.error) serverError = errorData.error;
            } catch (e) {
                const text = await res.clone().text();
                serverError = `Error ${res.status}: ${text.slice(0, 100)}`;
            }
            throw new Error(serverError);
        }

        const data = await res.json();
        clearInterval(progressInterval);
        
        if (data.success) {
            setProgress(100);
            setLessonData(data.lesson);
            setTimeout(() => setUploadState("done"), 500);
        } else {
            setError(data.error);
            setUploadState("idle");
            setProgress(0);
        }
    } catch (err: any) {
        clearInterval(progressInterval);
        
        if (err.name === 'AbortError') {
            setError("Уучлаарай, файл хэт том байна эсвэл AI хариу өгөхөөс хоцорлоо. Та файлаа жижигрүүлж үзнэ үү.");
        } else {
            setError("Сервертэй холбогдож чадсангүй: " + err.message);
        }
        
        setUploadState("idle");
        setProgress(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      if (file.size > 5 * 1024 * 1024) {
          alert("Хакатоны зорилгоор 5MB-аас бага хэмжээтэй файл оруулна уу.");
          e.target.value = '';
          return;
      }
      
      const type = file.type;
      const isPdfOrImage = type === 'application/pdf' || type.startsWith('image/');
      
      if (isPdfOrImage) {
          const reader = new FileReader();
          reader.onload = (event) => {
              const result = event.target?.result as string;
              if (result) {
                  const base64 = result.split(',')[1];
                  setFileBase64(base64);
                  setFileMimeType(type);
                  setFileName(file.name);
                  setMaterialText(prev => prev ? prev + `\n[${file.name} хавсаргасан - Gemini-аар шууд уншина]` : `[${file.name} хавсаргасан - Gemini-аар шууд уншина]`);
              }
          };
          reader.readAsDataURL(file);
      } else if (file.name.endsWith('.docx') || file.name.endsWith('.pptx')) {
          const reader = new FileReader();
          reader.onload = (event) => {
              const binaryStr = event.target?.result as string;
              // Naive printable string extraction for Office Open XML
              const matches = binaryStr.match(/[a-zA-Zа-яА-ЯөӨүҮ0-9\s.,?!-]{15,}/g);
              let extracted = matches ? matches.join(" ") : "Текст танигдсангүй.";
              extracted = extracted.replace(/\s+/g, ' ').trim();
              
              setMaterialText(prev => prev ? prev + "\n" + extracted : extracted);
              setFileName(file.name);
          };
          reader.readAsBinaryString(file);
      } else {
          // Standard text fallback
          const reader = new FileReader();
          reader.onload = (event) => {
              const text = event.target?.result;
              if (typeof text === 'string') {
                  setMaterialText(prev => prev ? prev + "\n" + text : text);
                  setFileName(file.name);
              }
          };
          reader.readAsText(file);
      }
  };

  return (
    <DashboardLayout activePath="/teacher/upload">
      <div className="max-w-4xl mx-auto mt-4 relative z-10">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-[#00f5ff]" />
          <span className="glow-text-cyan">AI Хичээл үүсгэх</span>
        </h2>
        <p className="text-slate-400 mb-8">Хичээлийн текст материалыг энд хуулж тавиад Gemini AI-аар интерактив хичээл болгон хувиргана.</p>

        {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
               ⚠️ {error}
            </div>
         )}

        {uploadState === "idle" && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Хичээлийн сэдэв</label>
                    <input 
                        type="text" 
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="w-full bg-[#110c22]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f5ff]/50"
                        placeholder="Жишээ: Биологи - Эсийн бүтэц"
                    />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase">Анги</label>
                    <input 
                        type="text" 
                        value={grade}
                        onChange={e => setGrade(e.target.value)}
                        className="w-full bg-[#110c22]/50 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f5ff]/50"
                        placeholder="Жишээ: 9-р анги"
                    />
                </div>
            </div>

            <Card className="border border-[#b05cfd]/30 bg-[#0b0a1a]/80 shadow-[0_0_20px_rgba(176,92,253,0.1)] transition-colors p-4">
               <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase glow-text-purple">Материал (Текст)</label>
               <textarea 
                  value={materialText}
                  onChange={e => setMaterialText(e.target.value)}
                  className="w-full h-48 bg-transparent border-none text-slate-200 resize-none focus:outline-none"
                  placeholder="Шинжлэх ухааны баримт, номын хэсэг, эсвэл хичээлийн төлөвлөгөөгөө энд хуулж тавина уу..."
               />
               
               <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                  <div className="text-xs text-slate-500 flex items-center gap-2">
                     <UploadIcon className="w-4 h-4" /> Эсвэл Файл (PDF, DOCX, PPTX, TXT, Зураг):
                     <input type="file" accept=".txt,.pdf,.png,.jpg,.jpeg,.doc,.docx,.ppt,.pptx" onChange={handleFileChange} className="text-xs ml-2 text-slate-400 file:mr-4 file:py-1.5 file:px-4 file:rounded-xl file:border file:border-[#00f5ff]/30 file:bg-[#00f5ff]/10 file:text-[#00f5ff] hover:file:bg-[#00f5ff]/20 file:transition-colors file:cursor-pointer" />
                  </div>
                  {fileName && (
                      <div className="text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded border border-emerald-500/20">
                          {fileName}
                      </div>
                  )}
               </div>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" className="border-white/20 text-white" onClick={() => {setMaterialText(""); setSubject(""); setGrade(""); setFileName(null); setFileBase64(null); setFileMimeType(null);}}>Цэвэрлэх</Button>
              <button 
                disabled={!materialText || !subject || !grade} 
                className="gap-2 px-8 py-2.5 rounded-full button-gradient disabled:opacity-50 disabled:cursor-not-allowed flex items-center font-bold"
                onClick={handleGenerate}
              >
                <Sparkles className="h-4 w-4" />
                Генераци эхлүүлэх
              </button>
            </div>
          </div>
        )}

        {uploadState === "generating" && (
          <Card className="p-12 border-[#00f5ff]/30 bg-[#0b0a1a]/90 glow-card flex flex-col items-center text-center">
            <div className="relative h-24 w-24 mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-[#b05cfd]/20" />
              <div 
                className="absolute inset-0 rounded-full border-4 border-[#00f5ff] border-t-transparent animate-spin" 
                style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-[#00f5ff] glow-text-cyan">
                {progress}%
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2 glow-text-cyan">Gemini AI боловсруулж байна...</h3>
            <p className="text-slate-400 max-w-sm mb-8">Гол утга санааг ялгаж, интерактив тайлбар болон шалгалт үүсгэж байна.</p>

            <div className="w-full max-w-md h-2 bg-white/10 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#00f5ff] to-[#b05cfd] transition-all duration-300 ease-out shadow-[0_0_10px_rgba(0,245,255,0.5)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </Card>
        )}

        {uploadState === "done" && lessonData && (
          <Card className="p-10 border-[#00f5ff]/30 bg-gradient-to-br from-[#00f5ff]/10 to-[#0b0a1a] glow-card text-center">
            <div className="flex flex-col items-center text-center animate-[rise_0.5s_ease-out]">
              <div className="h-20 w-20 rounded-full bg-[#00f5ff]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,245,255,0.4)] border border-[#00f5ff]/50">
                <CheckCircle className="h-10 w-10 text-[#00f5ff]" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 glow-text-cyan">Хичээл амжилттай үүслээ!</h3>
              <p className="text-slate-300 max-w-md mb-8">
                {lessonData.generatedContent?.summary || "Gemini-аас амжилттай контент үүсгэлээ."}
              </p>

              <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-8 text-left">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                  <div className="flex items-center justify-center gap-2 text-[#00f5ff] text-sm font-medium mb-1">
                    <BookOpen className="h-4 w-4" /> Слайдын тоо
                  </div>
                  <p className="text-2xl font-bold text-white">{lessonData.generatedContent?.slides?.length || 0} хэсэг</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                  <div className="flex items-center justify-center gap-2 text-[#b05cfd] text-sm font-medium mb-1">
                    <Sparkles className="h-4 w-4" /> Тест асуулт
                  </div>
                  <p className="text-2xl font-bold text-white">{lessonData.quizzes?.length || 0} асуулт</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/teacher/dashboard">
                  <Button variant="outline" className="h-12 px-6 border-[#b05cfd]/30 text-white hover:bg-[#b05cfd]/10">Самбар руу буцах</Button>
                </Link>
                <Link href={`/student/lesson/${lessonData.id}`}>
                  <button className="h-12 px-8 py-2.5 rounded-full button-gradient font-bold flex items-center gap-2">
                    Сурагчийн нүдээр харах <ArrowRight className="h-4 w-4" />
                  </button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
