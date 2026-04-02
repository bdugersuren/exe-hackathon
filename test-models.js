const GEMINI_API_KEY = "AIzaSyCb5D9kDVYThh5m2344YF_UEWClQ_da9Ig";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`;

fetch(url)
  .then(res => res.json())
  .then(data => {
    if (data.models) {
      console.log("AVAILABLE MODELS:");
      data.models.filter(m => m.supportedGenerationMethods.includes("generateContent")).forEach(m => console.log(m.name));
    } else {
      console.log(data);
    }
  })
  .catch(err => console.error(err));
