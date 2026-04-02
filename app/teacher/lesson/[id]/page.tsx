"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, CheckCircle, ArrowRight, Edit2, Trash2, Plus } from "@/components/ui/icons";

export default function TeacherLessonEditPage() {
  const params = useParams();
  const router = useRouter();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetch(`/api/lesson/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.success && data.lesson) {
          setLesson(data.lesson);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [params.id]);

  const handleSave = async () => {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch(`/api/lesson/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: lesson.title,
          summary: lesson.generatedContent.summary,
          slides: lesson.generatedContent.slides,
          quizzes: lesson.quizzes
        })
      });
      const data = await res.json();
      if (data.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      } else {
        alert("Алдаа гарлаа: " + data.error);
      }
    } catch (error) {
      alert("Сүлжээний алдаа гарлаа.");
    } finally {
      setSaving(false);
    }
  };

  const updateSlide = (index: number, field: string, value: string) => {
    const newSlides = [...lesson.generatedContent.slides];
    newSlides[index] = { ...newSlides[index], [field]: value };
    setLesson({
      ...lesson,
      generatedContent: { ...lesson.generatedContent, slides: newSlides }
    });
  };

  const updateQuiz = (index: number, field: string, value: any) => {
    const newQuizzes = [...lesson.quizzes];
    newQuizzes[index] = { ...newQuizzes[index], [field]: value };
    setLesson({ ...lesson, quizzes: newQuizzes });
  };

  const updateQuizOption = (quizIndex: number, optionIndex: number, value: string) => {
    const newQuizzes = [...lesson.quizzes];
    const newOptions = [...newQuizzes[quizIndex].options];
    newOptions[optionIndex] = value;
    newQuizzes[quizIndex].options = newOptions;

    // if the correct answer was explicitly this old option, we might need to update it too...
    // Let's just update the option and leave the teacher to update the correct answer explicitly if they want.
    setLesson({ ...lesson, quizzes: newQuizzes });
  };

  const handleAddSlide = () => {
    const newSlides = [...(lesson.generatedContent.slides || []), { title: "Шинэ слайд", content: "", image: "📄" }];
    setLesson({
      ...lesson,
      generatedContent: { ...lesson.generatedContent, slides: newSlides }
    });
  };

  const handleRemoveSlide = (index: number) => {
    const newSlides = [...lesson.generatedContent.slides];
    newSlides.splice(index, 1);
    setLesson({
      ...lesson,
      generatedContent: { ...lesson.generatedContent, slides: newSlides }
    });
  };

  const handleAddQuiz = () => {
    const newQuizzes = [...(lesson.quizzes || []), { 
        question: "Шинэ асуулт", 
        options: ["Сонголт A", "Сонголт B", "Сонголт C", "Сонголт D"], 
        correctAnswer: "Сонголт A" 
    }];
    setLesson({ ...lesson, quizzes: newQuizzes });
  };

  const handleRemoveQuiz = (index: number) => {
    const newQuizzes = [...lesson.quizzes];
    newQuizzes.splice(index, 1);
    setLesson({ ...lesson, quizzes: newQuizzes });
  };

  if (loading) {
    return (
      <DashboardLayout activePath={`/teacher/lesson/${params.id}`}>
        <div className="flex items-center justify-center p-20 text-[#00f5ff] animate-pulse">Түр хүлээнэ үү...</div>
      </DashboardLayout>
    );
  }

  if (!lesson) {
    return (
      <DashboardLayout activePath={`/teacher/lesson/${params.id}`}>
        <div className="p-10 text-center text-slate-400">Хичээл олдсонгүй эсвэл устгагдсан байна.</div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activePath={`/teacher/lesson/${params.id}`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
           <div>
             <Link href="/teacher/dashboard" className="text-sm text-slate-400 hover:text-white mb-2 inline-flex items-center gap-1">
               <ArrowRight className="w-3 h-3 rotate-180" /> Буцах
             </Link>
             <h2 className="text-2xl font-bold text-white flex items-center gap-2">
               <Edit2 className="w-5 h-5 text-[#b05cfd]" /> Хичээл засварлах
             </h2>
           </div>
           <div className="flex items-center gap-3">
             <Link href={`/student/lesson/${lesson.id}`}>
                <Button variant="outline" className="border-[#00f5ff]/30 text-[#00f5ff] hover:bg-[#00f5ff]/10">Урьдчилан харах</Button>
             </Link>
             <Button onClick={handleSave} disabled={saving} className="bg-[#b05cfd] hover:bg-purple-600 text-white gap-2 px-6">
                {saving ? "Хадгалж байна..." : saveSuccess ? <><CheckCircle className="w-4 h-4" /> Хадгаллаа</> : "Хадгалах"}
             </Button>
           </div>
        </div>

        <Card className="p-6 bg-slate-900/40 border-slate-800 space-y-4">
           <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Хичээлийн гарчиг</label>
              <input 
                type="text" 
                value={lesson.title} 
                onChange={e => setLesson({...lesson, title: e.target.value})}
                className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-[#00f5ff]/50"
              />
           </div>
           <div>
              <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Товч танилцуулга</label>
              <textarea 
                value={lesson.generatedContent.summary} 
                onChange={e => setLesson({...lesson, generatedContent: {...lesson.generatedContent, summary: e.target.value}})}
                className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00f5ff]/50 resize-none h-24"
              />
           </div>
        </Card>

        {lesson.generatedContent.slides?.length > 0 && (
           <h3 className="text-lg font-bold text-white mt-8 mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#00f5ff]" /> Слайдууд
           </h3>
        )}

        <div className="space-y-6">
           {lesson.generatedContent.slides?.map((slide: any, index: number) => (
             <Card key={index} className="p-6 bg-slate-900/40 border-slate-800 relative">
                <Button variant="ghost" size="icon" onClick={() => handleRemoveSlide(index)} className="absolute top-4 right-4 h-8 w-8 text-slate-500 hover:text-red-400 hover:bg-red-500/10">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="flex items-start gap-4 pr-8">
                   <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-2xl shrink-0">
                      {slide.image}
                   </div>
                   <div className="flex-1 space-y-4">
                     <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Слайд {index + 1} - Гарчиг</label>
                        <input 
                          type="text" 
                          value={slide.title} 
                          onChange={e => updateSlide(index, "title", e.target.value)}
                          className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-[#00f5ff]/50"
                        />
                     </div>
                     <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Агуулга</label>
                        <textarea 
                          value={slide.content} 
                          onChange={e => updateSlide(index, "content", e.target.value)}
                          className="w-full bg-[#110c22]/80 border border-slate-700/50 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#00f5ff]/50 h-32 resize-none"
                        />
                     </div>
                   </div>
                </div>
             </Card>
           ))}
        </div>
        
        <Button onClick={handleAddSlide} variant="outline" className="w-full border-dashed border-slate-700 text-slate-400 hover:text-white hover:border-slate-500 bg-transparent flex items-center justify-center gap-2 py-6">
           <Plus className="w-4 h-4" /> Шинэ слайд нэмэх
        </Button>

        {lesson.quizzes?.length > 0 && (
           <h3 className="text-lg font-bold text-white mt-12 mb-4 border-b border-slate-800 pb-2 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" /> Сорилууд (Quizzes)
           </h3>
        )}

        <div className="space-y-6 mb-12">
           {lesson.quizzes?.map((quiz: any, qIndex: number) => (
             <Card key={qIndex} className="p-6 bg-emerald-950/20 border-emerald-900/30 relative">
               <Button variant="ghost" size="icon" onClick={() => handleRemoveQuiz(qIndex)} className="absolute top-4 right-4 h-8 w-8 text-emerald-700 hover:text-red-400 hover:bg-red-500/10">
                 <Trash2 className="h-4 w-4" />
               </Button>
               <div className="space-y-4">
                  <div className="pr-10">
                    <label className="block text-xs text-emerald-500 font-bold uppercase mb-2">Асуулт {qIndex + 1}</label>
                    <input 
                      type="text" 
                      value={quiz.question} 
                      onChange={e => updateQuiz(qIndex, "question", e.target.value)}
                      className="w-full bg-[#110c22]/80 border border-emerald-900/50 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-emerald-500/50 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-semibold uppercase mb-2">Сонголтууд</label>
                    <div className="space-y-2">
                       {quiz.options?.map((opt: string, oIndex: number) => (
                          <div key={oIndex} className="flex items-center gap-3">
                             <div className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-800 text-xs text-slate-400 font-bold shrink-0">
                               {String.fromCharCode(65 + oIndex)}
                             </div>
                             <input 
                                type="text" 
                                value={opt} 
                                onChange={e => updateQuizOption(qIndex, oIndex, e.target.value)}
                                className="flex-1 bg-[#110c22]/50 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/30"
                             />
                             <div className="flex items-center gap-2">
                                <input 
                                   type="radio" 
                                   name={`correct-answer-${qIndex}`} 
                                   checked={quiz.correctAnswer === opt}
                                   onChange={() => updateQuiz(qIndex, "correctAnswer", opt)}
                                   className="w-4 h-4 accent-emerald-500"
                                />
                                <span className="text-xs text-slate-500">Зөв үү?</span>
                             </div>
                          </div>
                       ))}
                    </div>
                  </div>
               </div>
             </Card>
           ))}
        </div>

        <Button onClick={handleAddQuiz} variant="outline" className="w-full border-dashed border-emerald-900 text-emerald-500 hover:text-emerald-400 hover:border-emerald-700 bg-transparent flex items-center justify-center gap-2 py-6">
           <Plus className="w-4 h-4" /> Шинэ сорил нэмэх
        </Button>
        
      </div>
    </DashboardLayout>
  );
}
