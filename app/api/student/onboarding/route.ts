import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

const GEMINI_API_KEY = "AIzaSyDFkGKMsto24b8WQtBWmi76BpZcX83P7vk";

async function fetchFromGemini(model: string, prompt: string) {
  const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
  
  const payload = {
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  };

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Gemini API error (${model}): ${res.status} - ${errorText}`);
  }

  const data = await res.json();
  if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error("Gemini returned an empty response.");
  }

  const text = data.candidates[0].content.parts[0].text;
  
  // Robust JSON extraction
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON from Gemini:", text);
    throw new Error("AI-ийн хариултыг уншихад алдаа гарлаа (Invalid JSON).");
  }
}

export async function GET() {
  const prompt = `
Та бол боловсролын түвшин тогтоох мэргэжилтэн. Шинээр бүртгүүлсэн сурагчийн ерөнхий мэдлэгийн түвшинг (Анхан, Дунд, Ахисан) тогтоохын тулд 5 асуулт бүхий сорил (quiz) бэлтгэ.
Асуултууд нь Математик, Байгалийн ухаан, Түүх, Уран зохиол зэрэг ерөнхий мэдлэгийг хамтарсан, өөр өөр хүндрэлтэй байх ёстой.

Зөвхөн доорх JSON бүтцээр хариулна уу (бусад текст хэрэггүй):
{
  "questions": [
    {
      "id": 1,
      "question": "Асуулт...",
      "options": ["Сонголт A", "Сонголт B", "Сонголт C", "Сонголт D"],
      "correctAnswer": "Сонголт B",
      "category": "Математик",
      "difficulty": "medium"
    }
  ]
}
`;

  try {
    let questions;
    try {
        // Try Gemini 2.5 as requested by user
        questions = await fetchFromGemini("gemini-2.5-flash", prompt);
    } catch (e) {
        console.warn("Gemini 2.5 failed, falling back to 1.5-flash:", e);
        // Fallback to 1.5 if 2.5 doesn't work (might be invalid or regionally restricted)
        questions = await fetchFromGemini("gemini-1.5-flash", prompt);
    }

    if (!questions || !questions.questions) {
      throw new Error("Асуулт үүсгэхэд алдаа гарлаа.");
    }

    return NextResponse.json({ success: true, questions: questions.questions });
  } catch (error: any) {
    console.error("Onboarding API Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, score, totalQuestions } = await req.json();

    if (!userId) return NextResponse.json({ success: false, error: "userId required" }, { status: 400 });

    const percentage = (score / totalQuestions) * 100;
    let level = "Beginner";
    if (percentage >= 80) level = "Advanced";
    else if (percentage >= 40) level = "Intermediate";

    const db = await getDB();
    const userIndex = db.users.findIndex((u: any) => u.id === userId);

    if (userIndex >= 0) {
      db.users[userIndex].level = level;
      db.users[userIndex].onboardingCompleted = true;
      await saveDB(db);

      return NextResponse.json({ success: true, level });
    }

    return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
