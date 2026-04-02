import { NextResponse } from 'next/server';
import { prisma } from '../../pages/prisma'; // Prisma тохиргоо руу чиглүүлсэн зам.

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { materialText, subject, grade, teacherId, materialUrl } = body; // materialUrl нэмэгдсэн

    if (!teacherId) {
      return NextResponse.json({ success: false, error: "Багшийн ID шаардлагатай (teacherId)" }, { status: 400 });
    }

    // --- AI Боловсруулалт (Processing) ---
    // Энэ хэсэгт AI Engine ажиллана.

    // 1. Content Analyzer: Текстийг задлан, гол ойлголтуудыг ялгаж, хичээлийн бүтэц гаргана.
    // const analysis = await ai.analyze(materialText);

    // 2. Lesson Generator: Интерактив хичээл, слайд, жишээ, тайлбар үүсгэнэ.
    // const generatedContent = await ai.generateLesson(analysis);
    
    // 3. Quiz Generator: Асуулт, сонголт, зөв хариултыг үүсгэнэ (easy, medium, hard).
    // const quizData = await ai.generateQuiz(analysis);

    // Хакатон MVP-д зориулсан Mock дата (Дээрх бодит AI-г орлоно):
    const generatedContent = {
      summary: `Энэхүү хичээлээр "${subject}" сэдвийн үндсэн ойлголтуудыг интерактив хэлбэрээр үзэх болно.`,
      slides: [
        { id: 1, content: "Оршил: Сэдвийн гол агуулга, зорилго." },
        { id: 2, content: "Дэлгэрэнгүй тайлбар: Үндсэн ойлголтууд ба жишээнүүд." },
        { id: 3, content: "Дүгнэлт: Өнөөдрийн хичээлээр юу сурсан бэ?" }
      ],
      adaptiveRules: {
        ifIncorrect: "Хэрэв сурагч буруу хариулбал, 2-р слайдын ойлголтыг илүү хялбаршуулсан жишээгээр тайлбарлана."
      }
    };

    const quizData = [
      {
        question: `"${subject}" сэдвийн хамгийн гол санаа юу вэ?`,
        options: ["Гол санаа А", "Гол санаа Б", "Гол санаа В"],
        correctAnswer: "Гол санаа А",
        difficulty: "easy"
      },
      {
        question: "Дэлгэрэнгүй асуулт?",
        options: ["Сонголт 1", "Сонголт 2", "Сонголт 3"],
        correctAnswer: "Сонголт 2",
        difficulty: "medium"
      }
    ];

    // Prisma ашиглаж Database руу хадгалах
    const newLesson = await prisma.lesson.create({
      data: {
        title: `${subject} - ${grade} анги (AI Generated)`,
        subject: subject,
        uploadedMaterialUrl: materialUrl, // Оруулсан файлын URL (хэрэв байгаа бол)
        generatedContent: generatedContent, // JSON object
        difficultyLevel: "medium", // AI-аар тодорхойлж болно
        createdById: teacherId, 
        quizzes: {
          create: {
            questions: quizData, // JSON array
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