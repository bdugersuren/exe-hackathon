import { NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { materialText, subject, grade, teacherId } = body;

    if (!teacherId) {
      return NextResponse.json({ success: false, error: "Багшийн ID шаардлагатай (teacherId)" }, { status: 400 });
    }

    // Энд бодит байдал дээр OpenAI / Gemini API руу текстээ явуулж боловсруулалт хийнэ
    // Жнь: const completion = await openai.chat.completions.create({...})

    // Хакатон MVP-д зориулсан Mock дата:
    const generatedContent = {
      summary: "Энэхүү хичээлээр оруулсан материалын үндсэн ойлголтуудыг интерактив хэлбэрээр үзэх болно.",
      slides: [
        { id: 1, content: "Оршил хэсэг: Гол ойлголтууд..." },
        { id: 2, content: "Дэлгэрэнгүй тайлбар ба жишээ..." }
      ],
      adaptiveRules: {
        ifIncorrect: "Хэрэв буруу хариулбал Слайд 1-ийн ойлголтыг илүү хялбаршуулж тайлбарлана."
      }
    };

    const quizData = [
      {
        question: "Дээрх материалын хамгийн гол санаа юу байсан бэ?",
        options: ["Сонголт А", "Сонголт Б", "Сонголт В"],
        correctAnswer: "Сонголт А",
        difficulty: "easy"
      }
    ];

    // Prisma ашиглаж Database руу хадгалах
    const newLesson = await prisma.lesson.create({
      data: {
        title: `${subject} - ${grade} анги (AI Generated)`,
        subject: subject,
        generatedContent: generatedContent,
        difficultyLevel: "medium",
        createdById: teacherId, 
        quizzes: {
          create: {
            questions: quizData,
            scoringRule: "100 онооны систем"
          }
        }
      },
      include: {
        quizzes: true
      }
    });

    return NextResponse.json({ success: true, lesson: newLesson });
    
  } catch (error) {
    console.error("AI Generation error:", error);
    return NextResponse.json({ success: false, error: "Хичээл үүсгэхэд алдаа гарлаа" }, { status: 500 });
  }
}
