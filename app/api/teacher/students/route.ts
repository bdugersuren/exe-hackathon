import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

const GEMINI_API_KEY = "AIzaSyDFkGKMsto24b8WQtBWmi76BpZcX83P7vk";

export async function GET() {
  try {
    const db = await getDB();
    const students = db.users.filter((u: any) => u.role === "student");
    const progress = db.progress || [];
    const mistakes = db.mistakes || [];

    // 1. Process each student's data
    const studentStats = students.map((s: any) => {
      const sProgress = progress.filter((p: any) => p.userId === s.id);
      const sMistakes = mistakes.filter((m: any) => m.userId === s.id);
      
      const avgScore = sProgress.length > 0 
        ? Math.round(sProgress.reduce((acc: number, p: any) => acc + (p.progressPercent || 0), 0) / sProgress.length)
        : 0;

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        level: s.level || "Beginner",
        onboardingCompleted: s.onboardingCompleted || false,
        avgScore,
        lessonsCompleted: sProgress.filter((p: any) => p.completed).length,
        mistakesCount: sMistakes.length,
        recentMistakes: sMistakes.slice(-3) // Last 3 mistakes for preview
      };
    });

    // 2. Class Overview
    const totalStudents = studentStats.length;
    const classAvgScore = totalStudents > 0 
      ? Math.round(studentStats.reduce((acc: number, s: any) => acc + s.avgScore, 0) / totalStudents)
      : 0;
    
    const levelDistribution = {
        Beginner: studentStats.filter((s: any) => s.level === "Beginner").length,
        Intermediate: studentStats.filter((s: any) => s.level === "Intermediate").length,
        Advanced: studentStats.filter((s: any) => s.level === "Advanced").length,
    };

    // 3. Class-wide AI Insight (Weakest Topic Detection)
    let classInsight = "Анги нийтээрээ жигд суралцаж байна.";
    if (mistakes.length > 5) {
        try {
            const mistakeSamples = mistakes.slice(-15).map((m: any) => m.question).join("\n");
            const res = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ role: "user", parts: [{ text: `Би багш хүн байна. Миний сурагчид дараах асуултууд дээр хамгийн их алдаж байна:\n${mistakeSamples}\n\nЭдгээр алдаанууд дээр тулгуурлан ангийн нийт сул талыг 1-2 өгүүлбэрт маш тодорхой дүгнэж өгөөч. (Монгол хэлээр)` }] }]
                })
            });
            const data = await res.json();
            if (data.candidates?.[0]?.content?.parts?.[0]?.text) {
                classInsight = data.candidates[0].content.parts[0].text;
            }
        } catch (e) {}
    }

    return NextResponse.json({ 
        success: true, 
        students: studentStats,
        overview: {
            totalStudents,
            classAvgScore,
            levelDistribution,
            classInsight
        }
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
