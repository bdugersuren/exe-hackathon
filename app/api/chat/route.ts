import { NextResponse } from 'next/server';

const GEMINI_API_KEY = "AIzaSyDFkGKMsto24b8WQtBWmi76BpZcX83P7vk";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, lessonContext, userProfile } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ success: false, text: "Буруу хүсэлт байна" }, { status: 400 });
    }

    // Smart Teacher Prompt with User Awareness
    const systemPrompt = `Та бол EduGen AI-ийн "Ухаалаг Багш" юм. 
Чиний үндсэн зорилго: Сурагчдын асуултад монгол хэлээр, маш найрсаг, ойлгомжтой хариулах.

ХЭРЭГЛЭГЧИЙН МЭДЭЭЛЭЛ:
- Нэр: ${userProfile?.name || 'Тодорхойгүй'}
- Анги: ${userProfile?.grade || 'Тодорхойгүй'}
- Хэрэглэгчийн үүрэг: ${userProfile?.role || 'student'}

Одоогийн хичээлийн агуулга: "${lessonContext || 'Ерөнхий мэдлэг'}"

ЧУХАЛ: 
- Сурагчийг нэрээр нь дуудаж, түүний ангид нь тохирсон түвшинд (9-р анги бол 9-р ангийн түвшинд) тайлбарлах.
- Хариултаа Markdown формат (bold, жагсаалт) ашиглан маш цэгцтэй гаргана. 
- Түлхүүр үгсийг заавал **bold** болгох.
- Сурагчийн асуултад товч бөгөөд тодорхой хариулах.`;

    const processedMessages: any[] = [];
    const rawGeminiMessages = messages.map((m: any) => ({
      role: m.isAi ? "model" : "user",
      parts: [{ text: m.text }]
    }));

    let startIndex = 0;
    while (startIndex < rawGeminiMessages.length && rawGeminiMessages[startIndex].role !== "user") {
      startIndex++;
    }

    for (let i = startIndex; i < rawGeminiMessages.length; i++) {
        const current = rawGeminiMessages[i];
        if (processedMessages.length > 0 && processedMessages[processedMessages.length - 1].role === current.role) {
            processedMessages[processedMessages.length - 1].parts[0].text += "\n" + current.parts[0].text;
        } else {
            processedMessages.push(current);
        }
    }

    if (processedMessages.length === 0) {
        return NextResponse.json({ success: false, text: "Мессежийн түүх хоосон байна." });
    }

    processedMessages[0].parts[0].text = `СИСТЕМИЙН ЗААВАР: ${systemPrompt}\n\nАСУУЛТ: ${processedMessages[0].parts[0].text}`;

    const payload = {
      contents: processedMessages
    };

    // Use Gemini 2.5 Flash on stable v1 endpoint
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
        const errorData = await res.text();
        return NextResponse.json({ 
            success: false, 
            text: `Gemini 2.5 API-д холболтын алдаа гарлаа: ${res.status}. Error: ${errorData}`
        });
    }

    const data = await res.json();
    
    if (!data.candidates || data.candidates.length === 0) {
        return NextResponse.json({ success: false, text: "AI хариу үүсгэж чадсангүй (Safety Filter байж магадгүй)." });
    }

    const aiText = data.candidates[0].content?.parts?.[0]?.text || "Багш нь одоогоор хариулж чадсангүй.";
    
    return NextResponse.json({ success: true, text: aiText });
    
  } catch (error: any) {
    console.error("AI Chat error:", error);
    return NextResponse.json({ success: false, text: "Системийн дотоод алдаа гарлаа: " + error.message });
  }
}
