import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password || !role) {
      return NextResponse.json({ success: false, error: "Бүх талбарыг бөглөнө үү" }, { status: 400 });
    }

    if (role !== "teacher" && role !== "student") {
      return NextResponse.json({ success: false, error: "Буруу бүртгэлийн төрөл байна" }, { status: 400 });
    }

    const db = await getDB();
    if (!db.users) db.users = [];

    const existingUser = db.users.find((u: any) => u.email === email);
    if (existingUser) {
      return NextResponse.json({ success: false, error: "Энэ имэйл хаягаар бүртгэл үүссэн байна" }, { status: 400 });
    }

    const newUser = {
      id: "user-" + Date.now().toString(),
      name,
      email,
      password, // Note: storing plain text for hackathon MVP. In reality, use bcrypt!
      role,
      createdAt: new Date().toISOString()
    };

    db.users.push(newUser);
    await saveDB(db);

    return NextResponse.json({ 
      success: true, 
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } 
    });
    
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json({ success: false, error: "Бүртгүүлэхэд алдаа гарлаа" }, { status: 500 });
  }
}
