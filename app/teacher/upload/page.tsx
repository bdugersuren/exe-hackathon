"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, CheckCircle, Sparkles, BookOpen, ArrowRight } from "@/components/ui/icons";
import { useState } from "react";
import Link from "next/link";
// Mocking file upload and AI generation flow
export default function TeacherUploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadState, setUploadState] = useState<"idle" | "uploading" | "analyzing" | "generating" | "done">("idle");
  const [progress, setProgress] = useState(0);

  const simulateProcess = () => {
    setUploadState("uploading");
    setProgress(10);
    
    setTimeout(() => {
      setUploadState("analyzing");
      setProgress(40);
    }, 1500);
    
    setTimeout(() => {
      setUploadState("generating");
      setProgress(75);
    }, 3500);
    
    setTimeout(() => {
      setUploadState("done");
      setProgress(100);
    }, 6000);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <DashboardLayout activePath="/teacher/lessons">
      <div className="max-w-4xl mx-auto mt-4">
        <h2 className="text-2xl font-bold tracking-tight text-white mb-2 flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-emerald-400" />
          AI Хичээл үүсгэх
        </h2>
        <p className="text-slate-400 mb-8">PDF, PPT, Word эсвэл текст оруулаад интерактив хичээл болгон хувиргана.</p>

        {uploadState === "idle" && (
          <div className="space-y-6">
            <Card className="border-2 border-dashed border-slate-700 bg-slate-900/20 shadow-none hover:bg-slate-900/40 transition-colors">
              <div 
                className="flex flex-col items-center justify-center py-20 px-4 text-center cursor-pointer"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => document.getElementById("file-upload")?.click()}
              >
                <div className="h-16 w-16 mb-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-emerald-400" />
                </div>
                <p className="text-lg font-medium text-white mb-1">Файлаа энд чирэх эсвэл сонгох</p>
                <p className="text-sm text-slate-400 mb-4">PDF, PPTX, DOCX, TXT (Max 50MB)</p>
                <input id="file-upload" type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                
                {file && (
                  <div className="mt-4 px-4 py-2 bg-emerald-500/20 text-emerald-300 rounded-lg flex items-center gap-2 border border-emerald-500/30">
                    <CheckCircle className="h-4 w-4" />
                    {file.name} сонгогдлоо
                  </div>
                )}
              </div>
            </Card>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setFile(null)}>Цуцлах</Button>
              <Button 
                variant="premium" 
                disabled={!file} 
                className="gap-2 px-6"
                onClick={simulateProcess}
              >
                <Sparkles className="h-4 w-4" />
                Генераци эхлүүлэх
              </Button>
            </div>
          </div>
        )}

        {(uploadState === "uploading" || uploadState === "analyzing" || uploadState === "generating") && (
          <Card className="p-12 border-slate-800 bg-slate-900 flex flex-col items-center text-center">
            <div className="relative h-24 w-24 mb-8">
              <div className="absolute inset-0 rounded-full border-4 border-slate-800" />
              <div 
                className="absolute inset-0 rounded-full border-4 border-emerald-400 border-t-transparent animate-spin" 
                style={{ clipPath: "polygon(50% 50%, 50% 0, 100% 0, 100% 100%, 0 100%, 0 0, 50% 0)" }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-bold text-emerald-400">
                {progress}%
              </div>
            </div>

            <h3 className="text-xl font-bold text-white mb-2">
              {uploadState === "uploading" && "Файл хуулж байна..."}
              {uploadState === "analyzing" && "Агуулгыг шинжилж байна..."}
              {uploadState === "generating" && "AI хичээл үүсгэж байна..."}
            </h3>
            
            <p className="text-slate-400 max-w-sm mb-8">
              {uploadState === "uploading" && "EduGen платформ руу аюулгүй татаж байна"}
              {uploadState === "analyzing" && "Гол утга санаа, түлхүүр үгсийг ялгаж байна"}
              {uploadState === "generating" && "Интерактив тайлбар, асуултууд болон адаптив замыг гаргаж байна"}
            </p>

            <div className="w-full max-w-md h-2 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </Card>
        )}

        {uploadState === "done" && (
          <Card className="p-10 border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-slate-900 shadow-2xl shadow-emerald-900/20">
            <div className="flex flex-col items-center text-center">
              <div className="h-20 w-20 rounded-full bg-emerald-500 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-[rise_0.5s_ease-out]">
                <CheckCircle className="h-10 w-10 text-emerald-950" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">Хичээл амжилттай үүслээ!</h3>
              <p className="text-slate-300 max-w-md mb-8">
                AI таны оруулсан материалаас 12 слайд бүхий хичээл, 3 түвшний 15 асуулт бүхий тест үүсгэлээ.
              </p>

              <div className="grid grid-cols-2 gap-4 w-full max-w-lg mb-8 text-left">
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-1">
                    <BookOpen className="h-4 w-4" /> Тайлбар унших
                  </div>
                  <p className="text-2xl font-bold text-white">4 хэсэг</p>
                </div>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center gap-2 text-amber-400 text-sm font-medium mb-1">
                    <Sparkles className="h-4 w-4" /> Тест
                  </div>
                  <p className="text-2xl font-bold text-white">15 асуулт</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Link href="/teacher/dashboard">
                  <Button variant="outline" className="h-12 px-6">Самбар руу буцах</Button>
                </Link>
                <Link href="/student/lesson/1">
                  <Button variant="premium" className="h-12 px-6 gap-2">
                    Урьдчилан харах <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
