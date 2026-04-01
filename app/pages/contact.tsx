export default function ContactPage() {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Холбоо барих</h1>
      <div className="bg-white p-6 rounded-lg shadow border">
        <p className="text-gray-700">
          Сургууль, байгууллагын хамтын ажиллагаа, түншлэлийн талаар бидэнтэй холбогдоно уу.
        </p>
        <form className="space-y-4 mt-6">
          {/* Form fields here */}
          <p className="text-sm text-gray-500">Холбоо барих форм (Тун удахгүй)</p>
        </form>
      </div>
    </div>
  );
}