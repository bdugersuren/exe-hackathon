import fs from 'fs/promises';
import path from 'path';

// This is a simple JSON file database customized for the hackathon MVP
// It bypasses the need for Prisma/PostgreSQL which had npm installation issues.

const dbFilePath = path.join(process.cwd(), 'database.json');

const defaultData = {
  users: [
    {
      id: "teacher-1",
      email: "teacher@edugen.ai",
      password: "password123", // In a real app, hash this!
      role: "teacher",
      name: "Багш Бат"
    },
    {
      id: "student-1",
      email: "student@edugen.ai",
      password: "password123",
      role: "student",
      name: "Сурагч Анар"
    }
  ],
  lessons: [],
  progress: [],
  chats: [],
  mistakes: [],
  progressAnalyses: []
};

// Initialize DB if it doesn't exist
export async function initDB() {
  try {
    await fs.access(dbFilePath);
  } catch {
    await fs.writeFile(dbFilePath, JSON.stringify(defaultData, null, 2), 'utf-8');
  }
}

// Read whole DB
export async function getDB() {
  await initDB();
  const rawData = await fs.readFile(dbFilePath, 'utf-8');
  return JSON.parse(rawData);
}

// Write to DB
export async function saveDB(data: any) {
  await fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), 'utf-8');
}
