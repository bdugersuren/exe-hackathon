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
