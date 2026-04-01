"use client";
import { useState } from 'react';

// Mock data for demonstration
const mockLessons = [
  { id: 1, title: "Биологи - Эс (AI Generated)", grade: "9", createdAt: "2026-03-28" },
  { id: 2, title: "Математик - Квадрат тэгшитгэл (AI Generated)", grade: "8", createdAt: "2026-03-25" },
];

const mockProgress = [
    { student: "Б. Болд", lesson: "Биологи - Эс", score: 85, progress: 100 },
    { student: "Д. Сарнай", lesson: "Биологи - Эс", score: 95, progress: 100 },
    { student: "Г. Төмөр", lesson: "Биологи - Эс", score: 60, progress: 75, risk: true },
];

export default function TeacherDashboard() {
  const [materialText, setMaterialText] = useState("");
  const [subject, setSubject] = useState("");
  const [grade, setGrade] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setResult(null);
    try {
      // API хаяг /api/lesson байх ёстой.
      const res = await fetch('/api/lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          materialText, 
          subject, 
          grade, 
          teacherId: "dummy-teacher-id-xyz" // MVP хувилбарт hardcode хийсэн, цаашид Auth системээс хэрэглэгчийн id авна
        })
      });
      const data = await res.json();
      if (data.success) {
        setResult(data);
        // Reset form after success
        setMaterialText("");
        setSubject("");
        setGrade("");
      } else {
        setResult({ success: false, error: data.error || "Алдаа гарлаа" });
      }
    } catch (error) {
      console.error(error);
      setResult({ success: false, error: "Сүлжээний алдаа эсвэл сервер унтарсан байна." });
    }
    setIsLoading(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Багшийн самбар</h1>
        <p className="text-gray-500">EduGen AI-д тавтай морил! Эндээс та шинэ хичээл үүсгэж, сурагчдынхаа ахицыг хянах боломжтой.</p>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Generator */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md border">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Шинэ хичээл үүсгэх</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Хичээлийн сэдэв</label>
                <input type="text" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition" value={subject} onChange={e => setSubject(e.target.value)} placeholder="Жишээ нь: Биологи - Эсийн бүтэц" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Анги</label>
                <input type="text" className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 transition" value={grade} onChange={e => setGrade(e.target.value)} placeholder="Жишээ нь: 9-р анги" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Хичээлийн материал</label>
                <textarea className="w-full border p-2 rounded-lg h-40 focus:ring-2 focus:ring-blue-500 transition" value={materialText} onChange={e => setMaterialText(e.target.value)} placeholder="Энд хичээлийнхээ агуулгыг текст хэлбэрээр хуулж тавих, эсвэл файл upload хийх (тун удахгүй)..." />
              </div>
              
              <button onClick={handleGenerate} disabled={isLoading || !materialText || !subject || !grade} className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105">
                {isLoading ? "AI хичээл үүсгэж байна..." : "🤖 Хичээл үүсгэх"}
              </button>
            </div>
          </div>

          {result && (
            <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
              <h3 className={`font-bold ${result.success ? 'text-green-800' : 'text-red-800'}`}>
                {result.success ? "Амжилттай үүслээ!" : "Алдаа гарлаа"}
              </h3>
              <p className="text-sm text-gray-600">{result.success ? "Таны шинэ хичээл 'Миний хичээлүүд' хэсэгт нэмэгдлээ." : result.error}</p>
              {result.success && result.lesson && (
                 <details className="mt-2 text-xs">
                    <summary className="cursor-pointer">Үүссэн датаг харах</summary>
                    <pre className="bg-white mt-2 p-2 rounded border overflow-auto text-xs text-gray-600 max-h-48">
                        {JSON.stringify(result.lesson, null, 2)}
                    </pre>
                 </details>
              )}
            </div>
          )}
        </div>

        {/* Right Column: My Lessons & Progress */}
        <div className="lg:col-span-2 space-y-8">
            {/* My Lessons */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Миний хичээлүүд</h2>
                <div className="space-y-3">
                    {mockLessons.map(lesson => (
                        <div key={lesson.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border hover:bg-gray-100 transition">
                            <div>
                                <p className="font-semibold text-gray-800">{lesson.title}</p>
                                <p className="text-sm text-gray-500">{lesson.grade}-р анги • {lesson.createdAt}</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200">Засварлах</button>
                                <button className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200">Ангид түгээх</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Student Progress */}
            <div className="bg-white p-6 rounded-xl shadow-md border">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Сурагчийн ахиц (Жишээ)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="p-2">Сурагч</th>
                                <th className="p-2">Хичээл</th>
                                <th className="p-2">Оноо</th>
                                <th className="p-2">Гүйцэтгэл</th>
                            </tr>
                        </thead>
                        <tbody>
                            {mockProgress.map((prog, i) => (
                                <tr key={i} className={`border-b hover:bg-gray-50 ${prog.risk ? 'bg-red-50' : ''}`}>
                                    <td className="p-2 font-medium text-gray-800">{prog.student} {prog.risk && <span className="text-red-500 text-xs">(Эрсдэлтэй)</span>}</td>
                                    <td className="p-2 text-gray-600">{prog.lesson}</td>
                                    <td className="p-2 font-semibold text-gray-700">{prog.score}%</td>
                                    <td className="p-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                                            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${prog.progress}%` }}></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}