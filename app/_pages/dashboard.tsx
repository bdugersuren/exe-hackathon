export default function StudentDashboard() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Сурагчийн самбар</h1>
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Миний хичээлүүд</h2>
        <p className="text-gray-700">
          Энд багшийн оноосон хичээлүүд, даалгаврууд харагдана. (Тун удахгүй)
        </p>
        <h2 className="text-xl font-bold text-gray-800 mt-6 mb-4">AI Туслах</h2>
        <p className="text-gray-700">
          Хичээлтэй холбоотой асуултаа эндээс асуугаарай. (Тун удахгүй)
        </p>
      </div>
    </div>
  );
}