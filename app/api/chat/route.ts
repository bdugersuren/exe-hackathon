import { NextResponse } from 'next/server';

const GEMINI_API_KEY = "AIzaSyCb5D9kDVYThh5m2344YF_UEWClQ_da9Ig";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, lessonContext } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, error: "Буруу хүсэлт байна" }, { status: 400 });
    }

    // Format messages for Gemini API. 
    // Gemini expects { role: "user" | "model", parts: [{ text: "..." }] }
    
    // We also inject a system prompt at the very beginning to keep Gemini in character.
    const systemPrompt = `
Та бол EduGen AI-ийн бүтээсэн "Ухаалаг Багш" хэмээх боловсролын AI туслах юм. 
Чиний үндсэн зорилго: Сурагчдын асуултад маш найрсаг, ойлгомжтой, монгол хэлээр шууд хариулах.
Чиний уншиж буй одоогийн хичээлийн агуулга: "${lessonContext || 'Тодорхойгүй хичээл'}"
Чи зөвхөн сурагчийн асууж буй зүйлд төвлөрч, хэт урт биш, товч тодорхой, урамшуулсан өнгө аясаар тайлбарлана уу. Мөн хүүхэд ойлгохгүй бол өөр энгийн жишээ гарга. Олон эможи бүү ашигла.
`;

    // Convert existing message format 
    // From: { id, text, isAi }
    // To: Gemini format
    const geminiMessages = messages.map((m: any) => ({
      role: m.isAi ? "model" : "user",
      parts: [{ text: m.text }]
    }));

    // Insert the system prompt as the first message if needed, or better, inject it into the latest user message
    const lastMessage = geminiMessages[geminiMessages.length - 1];
    if (lastMessage && lastMessage.role === "user") {
        lastMessage.parts[0].text = `СИСТЕМИЙН ЗААВАР: ${systemPrompt}\n\nСУРАГЧИЙН АСУУЛТ: ${lastMessage.parts[0].text}`;
    }

    const payload = {
      contents: geminiMessages
    };

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error("Chat error: " + await res.text());
    }

    const data = await res.json();
    const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Уучлаарай, би ойлгосонгүй.";
    
    return NextResponse.json({ success: true, text: aiText });
    
  } catch (error: any) {
    console.error("AI Chat error:", error);
    return NextResponse.json({ success: false, error: "Чат илгээхэд алдаа гарлаа." }, { status: 500 });
  }
}
