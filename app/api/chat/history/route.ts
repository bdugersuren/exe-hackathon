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
    const userChat = db.chats?.find((c: any) => c.userId === userId);

    return NextResponse.json({ 
        success: true, 
        messages: userChat ? userChat.messages : [] 
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, messages } = body;

    if (!userId || !messages) {
      return NextResponse.json({ success: false, error: "userId and messages required" }, { status: 400 });
    }

    const db = await getDB();
    if (!db.chats) db.chats = [];

    const existingChatIndex = db.chats.findIndex((c: any) => c.userId === userId);

    if (existingChatIndex >= 0) {
      db.chats[existingChatIndex].messages = messages;
    } else {
      db.chats.push({ userId, messages });
    }

    await saveDB(db);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
