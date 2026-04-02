import { NextResponse } from 'next/server';
import { getDB, saveDB } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ success: false, error: 'User ID required' }, { status: 400 });
    }

    const db = await getDB();
    const progress = db.progress || [];
    const statsArray = db.stats || [];

    const userProgress = progress.filter((p: any) => p.userId === userId);
    let userStats = statsArray.find((s: any) => s.userId === userId);

    if (!userStats) {
      userStats = {
        userId,
        xp: 0,
        streak: 0,
        lessonsCompleted: 0,
        lastActive: null
      };
    }

    // Check streak
    if (userStats.lastActive) {
      const lastActiveDate = new Date(userStats.lastActive);
      const today = new Date();
      // Reset milliseconds for accurate day comparison
      lastActiveDate.setHours(0, 0, 0, 0);
      today.setHours(0, 0, 0, 0);
      
      const diffTime = Math.abs(today.getTime() - lastActiveDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      
      // If gap is more than 1 day, reset streak
      if (diffDays > 1) {
          userStats.streak = 1; // Or 0 until they do something today
          // Need to write this to DB if we want it persistent immediately, 
          // but let's just return it and write on next action.
      }
    }

    return NextResponse.json({ success: true, progress: userProgress, stats: userStats });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { userId, lessonId, currentSlideIndex, totalSlides, isEnd } = body;

    if (!userId || !lessonId) {
      return NextResponse.json({ success: false, error: 'Missing parameters' }, { status: 400 });
    }

    const db = await getDB();
    if (!db.progress) db.progress = [];
    if (!db.stats) db.stats = [];

    // Ensure user stats exist
    let userStats = db.stats.find((s: any) => s.userId === userId);
    if (!userStats) {
        userStats = { userId, xp: 0, streak: 0, lessonsCompleted: 0, lastActive: null };
        db.stats.push(userStats);
    }

    // Streak logic update
    const todayStr = new Date().toISOString().split("T")[0];
    const lastActiveStr = userStats.lastActive ? new Date(userStats.lastActive).toISOString().split("T")[0] : null;
    
    if (lastActiveStr !== todayStr) {
        if (lastActiveStr) {
            const date1 = new Date(lastActiveStr);
            const date2 = new Date(todayStr);
            const diffTime = Math.abs(date2.getTime() - date1.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) {
                userStats.streak += 1;
            } else {
                userStats.streak = 1;
            }
        } else {
            userStats.streak = 1;
        }
        userStats.lastActive = new Date().toISOString();
    }

    // Progress update
    let lessonProgress = db.progress.find((p: any) => p.userId === userId && p.lessonId === lessonId);
    
    if (!lessonProgress) {
        lessonProgress = {
            userId,
            lessonId,
            progressPercent: 0,
            completedSlides: 0,
            totalSlides: totalSlides || 1,
            completed: false,
            viewedSlides: [] // Add array to track exact slides viewed
        };
        db.progress.push(lessonProgress);
    }
    
    // Add XP for viewing new slide
    if (currentSlideIndex !== undefined && !lessonProgress.viewedSlides) {
        lessonProgress.viewedSlides = [];
    }

    if (currentSlideIndex !== undefined && !lessonProgress.viewedSlides.includes(currentSlideIndex)) {
        lessonProgress.viewedSlides.push(currentSlideIndex);
        userStats.xp += 10; // 10 XP per new slide!
    }

    // Update slides completed count
    if (lessonProgress.viewedSlides) {
        lessonProgress.completedSlides = lessonProgress.viewedSlides.length;
    }
    
    // Calculate percentage
    const calcSlides = totalSlides || lessonProgress.totalSlides || 1;
    let newPercent = Math.min(100, Math.floor((lessonProgress.completedSlides / calcSlides) * 100));
    
    if (isEnd) {
        if (!lessonProgress.completed) {
            userStats.xp += 50; // 50 XP completion bonus!
            userStats.lessonsCompleted += 1;
        }
        lessonProgress.completed = true;
        newPercent = 100;
    }
    
    lessonProgress.progressPercent = newPercent;
    
    await saveDB(db);

    return NextResponse.json({ 
        success: true, 
        progress: lessonProgress, 
        stats: userStats 
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: 'Failed to update progress: ' + error.message }, { status: 500 });
  }
}
