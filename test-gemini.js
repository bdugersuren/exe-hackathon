const GEMINI_API_KEY = "AIzaSyCb5D9kDVYThh5m2344YF_UEWClQ_da9Ig";
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
const payload = {
  contents: [
    { role: "user", parts: [{ text: "Hello" }] }
  ]
};

fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload)
}).then(res => res.text()).then(text => console.log("Response:", text)).catch(err => console.error(err));
