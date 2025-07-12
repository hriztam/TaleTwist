// src/app/components/PromptForm.tsx
"use client";

import { useState } from "react";
import { StoryInput } from "@/types/story";

interface PromptFormProps {
  onSubmit: (input: StoryInput) => void;
  isLoading: boolean;
}

const GENRE_OPTIONS = [
  "Fantasy",
  "Sci-Fi",
  "Mystery",
  "Horror",
  "Romance",
  "Adventure",
  "Comedy",
  "Thriller",
];

export default function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [input, setInput] = useState<StoryInput>({
    genre: "",
    characters: "",
    setting: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.genre && input.characters && input.setting) {
      onSubmit(input);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
        AI Story Generator
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Create your own interactive adventure story
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Genre
          </label>
          <select
            value={input.genre}
            onChange={(e) => setInput({ ...input, genre: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a genre...</option>
            {GENRE_OPTIONS.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Main Characters
          </label>
          <input
            type="text"
            value={input.characters}
            onChange={(e) => setInput({ ...input, characters: e.target.value })}
            placeholder="e.g., A brave knight and a wise wizard"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Setting
          </label>
          <input
            type="text"
            value={input.setting}
            onChange={(e) => setInput({ ...input, setting: e.target.value })}
            placeholder="e.g., A mysterious ancient castle"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isLoading ? "Generating Story..." : "Start My Adventure!"}
        </button>
      </form>
    </div>
  );
}
