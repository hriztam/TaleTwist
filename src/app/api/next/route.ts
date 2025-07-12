// src/app/api/next/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { previousStory, selectedChoice, turnNumber, maxTurns } =
      await request.json();

    const isLastTurn = turnNumber >= maxTurns - 1;

    const prompt = `Continue this interactive story based on the user's choice.

Previous story: ${previousStory}
User chose: ${selectedChoice}
Turn: ${turnNumber + 1}/${maxTurns}

${
  isLastTurn
    ? "This is the FINAL turn - wrap up the story with a satisfying conclusion. Do not provide choices."
    : "Continue the story based on their choice and provide exactly 3 new choices for what happens next."
}

Format your response as JSON:
{
  "story": "Your continuation paragraph here...",
  ${
    isLastTurn
      ? ""
      : '"choices": [{"id": "1", "text": "First choice"}, {"id": "2", "text": "Second choice"}, {"id": "3", "text": "Third choice"}]'
  }
}

Keep the story paragraph under 100 words. ${
      isLastTurn
        ? "Focus on a satisfying ending."
        : "Make choices compelling and diverse."
    }`;
    // Using OpenAI API (replace with your preferred AI service)
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
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
    });

    if (!response.ok) {
      throw new Error("AI service error");
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    const storyData = JSON.parse(aiResponse);

    return NextResponse.json(storyData);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to continue story" },
      { status: 500 }
    );
  }
}
