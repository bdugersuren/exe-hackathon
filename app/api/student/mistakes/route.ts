import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) return NextResponse.json({ success: false, error: "userId required" }, { status: 400 });

    const db = await getDB();
    const mistakes = (db.mistakes || []).filter((m: any) => m.userId === userId);

    return NextResponse.json({ success: true, mistakes });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { userId, lessonId, lessonTitle, subject, question, wrongAnswer, correctAnswer } = await req.json();

    if (!userId || !question) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });
    }

    const db = await getDB();
    if (!db.mistakes) db.mistakes = [];

    // Check if this specific mistake already exists to avoid duplicates
    const exists = db.mistakes.some((m: any) => 
        m.userId === userId && 
        m.lessonId === lessonId && 
        m.question === question && 
        m.wrongAnswer === wrongAnswer
    );

    if (!exists) {
        db.mistakes.push({
            id: "err-" + Date.now(),
            userId,
            lessonId,
            lessonTitle,
            subject,
            question,
            wrongAnswer,
            correctAnswer,
            timestamp: new Date().toISOString()
        });
        await saveDB(db);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
