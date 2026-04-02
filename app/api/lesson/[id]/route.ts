import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = await getDB();
    const lessons = db.lessons || [];
    const lesson = lessons.find((l: any) => l.id === id);

    if (!lesson) {
        return NextResponse.json({ success: false, error: "Хичээл олдсонгүй" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lesson });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Хичээл татаж авахад алдаа гарлаа: " + error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { title, summary, slides, quizzes } = body;
    
    const { getDB, saveDB } = await import('@/lib/db');
    const db = await getDB();
    const lessonIndex = db.lessons?.findIndex((l: any) => l.id === id);

    if (lessonIndex === undefined || lessonIndex === -1) {
        return NextResponse.json({ success: false, error: "Хичээл олдсонгүй" }, { status: 404 });
    }

    if (title) db.lessons[lessonIndex].title = title;
    if (summary) db.lessons[lessonIndex].generatedContent.summary = summary;
    if (slides) db.lessons[lessonIndex].generatedContent.slides = slides;
    if (quizzes) db.lessons[lessonIndex].quizzes = quizzes;

    await saveDB(db);

    return NextResponse.json({ success: true, lesson: db.lessons[lessonIndex] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: "Хичээл шинэчлэхэд алдаа гарлаа: " + error.message }, { status: 500 });
  }
}
