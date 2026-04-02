import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: "userId required" }, { status: 400 });
    }

    const db = await getDB();
    const analyses = (db.progressAnalyses || []).filter((a: any) => a.userId === userId);

    return NextResponse.json({ 
        success: true, 
        analyses: analyses.reverse() // Newest first
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, analysisText } = body;

    if (!userId || !analysisText) {
      return NextResponse.json({ success: false, error: "userId and analysisText required" }, { status: 400 });
    }

    const db = await getDB();
    if (!db.progressAnalyses) db.progressAnalyses = [];

    const newAnalysis = {
        id: "analysis-" + Date.now(),
        userId,
        text: analysisText,
        createdAt: new Date().toISOString()
    };

    db.progressAnalyses.push(newAnalysis);
    await saveDB(db);

    return NextResponse.json({ success: true, analysis: newAnalysis });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
