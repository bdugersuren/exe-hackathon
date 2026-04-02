import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

const GEMINI_API_KEY = "AIzaSyCb5D9kDVYThh5m2344YF_UEWClQ_da9Ig";

export async function GET() {
  try {
    const db = await getDB();
    const lessons = db.lessons || [];
    return NextResponse.json({ success: true, lessons });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Хичээл татаж авахад алдаа гарлаа: " + error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { materialText, subject, grade, teacherId, fileBase64, fileMimeType } = body;

    if (!teacherId || (!materialText && !fileBase64)) {
      return NextResponse.json({ success: false, error: "Дутуу мэдээлэл байна (teacherId эсвэл materialText)" }, { status: 400 });
    }

    // Call Gemini API via fetch (since npm is unavailable)
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const prompt = `
Та бол боловсролын салбарын мэргэжилтэн багш. Дараах текстийг ашиглан маш сонирхолтой, хүүхдэд ойлгомжтой бяцхан интерактив хичээл болон шалгалт (quiz) бэлтгэж өг.
Хичээл нь ${grade}-р ангийн ${subject} хичээлийн сэдэвт зориулагдсан. 
ГАВУУ ДҮРЭМ: Зөвхөн доорх JSON бүтцээр ямар нэгэн нэмэлт markdown, тайлбаргүйгээр буцаана уу.

{
  "summary": "Хичээлийн товч танилцуулга (1 өгүүлбэр)",
  "slides": [
    { "id": 1, "content": "1-р слайдын агуулга... сонирхолтой жишээтэй" },
    { "id": 2, "content": "2-р слайдын агуулга... " }
  ],
  "quizzes": [
    {
      "question": "Сэдэвтэй холбоотой асуулт 1",
      "options": ["Сонголт 1", "Сонголт 2", "Сонголт 3"],
      "correctAnswer": "Сонголт 2",
      "difficulty": "easy"
    },
    {
      "question": "Арай хүндрэлтэй асуулт 2",
      "options": ["Сонголт 1", "Сонголт 2", "Сонголт 3"],
      "correctAnswer": "Сонголт 1",
      "difficulty": "medium"
    }
  ]
}

ОРУУЛСАН МАТЕРИАЛ:
${materialText || "Зөвхөн хавсралт файл дээр тулгуурлана уу."}
`;

    const parts: any[] = [];
    
    if (fileBase64 && fileMimeType) {
        parts.push({
            inlineData: {
                data: fileBase64,
                mimeType: fileMimeType
            }
        });
    }
    
    parts.push({ text: prompt });

    const payload = {
      contents: [{ role: "user", parts }],
      generationConfig: {
        responseMimeType: "application/json"
      }
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error("Gemini API error: " + await res.text());
    }

    const data = await res.json();
    const rawContent = data.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
    
    let generatedData;
    try {
        generatedData = JSON.parse(rawContent);
    } catch(e) {
        // Fallback or cleanup markdown just in case (though responseMimeType usually guarantees json)
        const cleaned = rawContent.replace(/```json/g, "").replace(/```/g, "").trim();
        generatedData = JSON.parse(cleaned);
    }

    // Save to local JSON Database
    const db = await getDB();
    const newLessonId = "lesson-" + Date.now();
    const newLesson = {
        id: newLessonId,
        title: `${subject} - ${grade} анги`,
        subject: subject,
        grade: grade,
        generatedContent: {
           summary: generatedData.summary,
           slides: generatedData.slides
        },
        quizzes: generatedData.quizzes,
        createdById: teacherId,
        createdAt: new Date().toISOString()
    };
    
    if(!db.lessons) db.lessons = [];
    db.lessons.push(newLesson);
    await saveDB(db);

    return NextResponse.json({ success: true, lesson: newLesson });
    
  } catch (error: any) {
    console.error("AI Generation error:", error);
    return NextResponse.json({ success: false, error: "Хиймэл оюун хичээл үүсгэхэд алдаа гарлаа: " + error.message }, { status: 500 });
  }
}
