// src/app/components/StoryDisplay.tsx
"use client";

import { StorySegment } from "@/types/story";

interface StoryDisplayProps {
  segments: StorySegment[];
  currentTurn: number;
  maxTurns: number;
}

export default function StoryDisplay({
  segments,
  currentTurn,
  maxTurns,
}: StoryDisplayProps) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Your Story</h2>
          <span className="text-sm text-gray-500">
            Turn {currentTurn + 1} of {maxTurns}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentTurn + 1) / maxTurns) * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`p-4 rounded-lg border-l-4 ${
              index === segments.length - 1
                ? "border-blue-500 bg-blue-50"
                : "border-gray-300 bg-gray-50"
            }`}
          >
            <p className="text-gray-800 leading-relaxed text-lg">
              {segment.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
