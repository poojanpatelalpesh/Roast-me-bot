import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 9898;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

app.post('/roast', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: `Roast ${name} in a very brutal hinglish language . don't give any text in bold .`
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const roast = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!roast) {
      return res.status(500).json({ error: 'No roast generated 😓' });
    }

    res.json({ roast });
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Error contacting Gemini 😓' });
  }
});

app.listen(PORT, () => {
  console.log(`🔥 Roast Me Gemini API running at http://localhost:${PORT}`);
});
