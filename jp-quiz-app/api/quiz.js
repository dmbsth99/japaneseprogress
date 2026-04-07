export default async function handler(req, res) {
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      input: `
Generate 5 Japanese quiz questions.

Return ONLY valid JSON:
{
 "questions": [
  {
   "prompt": "Japanese question",
   "options": ["A","B","C","D"],
   "correct": 0,
   "level": "n5"
  }
 ]
}
`
    })
  });

  const data = await response.json();

  // extract clean JSON
  const text = data.output[0].content[0].text.replace(/```json|```/g, "");
  const parsed = JSON.parse(text);

  res.status(200).json(parsed);
}