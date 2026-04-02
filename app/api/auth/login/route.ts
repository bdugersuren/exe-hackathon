import { NextResponse } from 'next/server';
import { getDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const db = await getDB();
    
    // Simple mock auth logic
    const user = db.users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      // In a real app we'd set an HTTPOnly JWT cookie here.
      // For MVP we can just return the user object and store it globally/locally.
      const { password: _, ...safeUser } = user;
      
      const response = NextResponse.json({ success: true, user: safeUser });
      // Setting a dummy cookie for Next.js middleware if needed
      response.cookies.set('edugen_session', safeUser.role, {
         path: '/',
         httpOnly: false,
         maxAge: 60 * 60 * 24 // 1 day
      });
      return response;
    } else {
      return NextResponse.json({ success: false, error: "Нэвтрэх нэр эсвэл нууц үг буруу байна" }, { status: 401 });
    }
  } catch (error) {
    return NextResponse.json({ success: false, error: "Серверийн алдаа гарлаа" }, { status: 500 });
  }
}
