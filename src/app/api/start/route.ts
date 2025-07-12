// src/app/api/start/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { genre, characters, setting } = await request.json();

    const prompt = `You are a creative storytelling AI. Create an engaging interactive story.

Genre: ${genre}
Characters: ${characters}
Setting: ${setting}

Write a compelling opening paragraph (2-3 sentences) that sets the scene and introduces conflict or intrigue. Then provide exactly 3 choices for what happens next. Each choice should be different and lead to interesting story developments.

Format your response as JSON:
{
  "story": "Your opening paragraph here...",
  "choices": [
    {"id": "1", "text": "First choice option"},
    {"id": "2", "text": "Second choice option"},
    {"id": "3", "text": "Third choice option"}
  ]
}

Keep the story paragraph under 100 words. Make choices concise but intriguing.`;

    // Using Groq API \
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3-8b-8192",
          messages: [
            {
              role: "system",
              content:
                "You are a creative storytelling AI that responds only in valid JSON format.",
            },
            { role: "user", content: prompt },
          ],
          max_tokens: 500,
          temperature: 0.8,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("AI service error");
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Parse the JSON response
    const storyData = JSON.parse(aiResponse);

    return NextResponse.json(storyData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate story" },
      { status: 500 }
    );
  }
}
