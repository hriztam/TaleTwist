# TaleTwist

## Overview

TaleTwist is an interactive storytelling platform that leverages artificial intelligence to create dynamic, user-driven narratives. Users input a story prompt (e.g., genre, characters, setting), and the platform generates a unique story with branching choices, allowing users to shape the narrative in real-time. Built in 48 hours for a hackathon under the Entertainment theme, TaleTwist pushes the boundaries of content creation by combining AI with user interactivity, delivering a novel and engaging entertainment experience.

## Features

Dynamic Story Generation: AI generates unique story segments (100-200 words) based on user prompts, ensuring infinite narrative variety.
Interactive Choices: Users select from 2-3 AI-generated choices per segment to guide the story, enhancing engagement.
Story Conclusion: After 3-5 choices, the platform delivers a conclusive ending, resolving the story’s conflict with a user-defined tone (e.g., triumphant).
State Persistence: Story prompts, segments, and choices are saved for seamless user sessions.
Planned Enhancement: Integration of AI-generated images (e.g., via Craiyon API) to visualize key story scenes (in progress).

## Tech Stack

- Frontend: Next.js with Tailwind CSS for a responsive, user-friendly interface.
- Backend: Node.js with Express for API handling and AI integration.
- AI: llama-8b (Groqcloud) for story and choice generation.
- Deployment: Planning on deploying it to Vercel
- Planned: Craiyon API for optional image generation to enhance story immersion and add a database to save the user progress.

## Installation and Setup

### Prerequisites

Node.js (v16 or higher)
GroqCloud API token (free tier, sign up at [qropAPI.co](https://console.groq.com/home))
(Optional) Craiyon API access for image generation

### Steps

Clone the Repository:

```
git clone https://github.com/your-repo/storyweaver-ai.git
cd storyweaver-ai
```

Frontend Setup (Next.js):

```
cd frontend
npm install
```

Create a .env.local file:NEXT_PUBLIC_API_URL=http://localhost:5000

Run the development server:npm run dev

Backend Setup (Node.js/Express):

```
cd backend
npm install
```

Create a .env file:GROQ_API_KEY=your_groqapi_key

## Usage

1. Open the deployed app (e.g., Vercel URL) or http://localhost:3000 in development.
2. Enter a story prompt (e.g., “A sci-fi adventure with a hacker and a rogue AI”).
3. Click “Generate Story” to receive the first story segment with 2-3 choices.
4. Select a choice to progress the story, repeating for 3-5 segments.
5. After the final choice, view a conclusive story ending.
6. Click “Start New Story” to create a new narrative.

## Example Story Flow

Prompt: “A fantasy story with a knight and a dragon.”
Segment 1: “Sir Aldric faces a fire-breathing dragon in a misty valley. Choice 1: Charge with sword. Choice 2: Seek the dragon’s lair.”
Segment 2 (Choice 1): “Aldric charges, dodging flames. Choice 1: Strike the dragon’s heart. Choice 2: Call for allies.”
Conclusion (Choice 1): “Aldric plunges his sword into the dragon’s heart. The beast collapses, and the valley is saved.”

## Future Enhancements

Integrate Craiyon API for AI-generated scene images to enhance immersion.
Add voice input/output using Web Speech API for accessibility.
Support multiplayer storytelling for collaborative narratives.
Use advanced AI models (GPT-4o, Grok, Claude)
Make it multi-modal and even AR-powered to give users a hyper realistic expirence

## Challenges Overcome

AI Coherence: Crafted specific prompts (e.g., “Generate a 150-word segment with 2 choices”) and post-processed outputs to ensure narrative quality.
Time Constraint: Built a functional MVP in 48 hours by focusing on core features (prompt input, branching, conclusion).
