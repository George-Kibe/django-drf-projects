import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration)

export default async function (req, res) {
  const {priceMin, priceMax, gender, age, hobbies } = req.body;
  const prompt = generatePrompt(priceMin, priceMax, gender, age, hobbies);
  console.log(prompt)
  
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.6,
    max_tokens: 2048,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(priceMin, priceMax, gender, age, hobbies) {
  return `suggest 3 three christmas gift ideas between ${priceMin}$ and ${priceMax}$ for a ${age} year old ${gender} who is in ${hobbies}`
}

//curl -X POST localhost:3000/api/generate -H "Content-Type: application/json" -d '{"priceMin": 50, "priceMax": 500, "gender":"female", "age":25, "hobbies": "coding, travelling, cooking, reading"}'