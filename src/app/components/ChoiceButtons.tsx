// src/app/components/ChoiceButtons.tsx
"use client";

import { Choice } from "@/types/story";

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  isLoading: boolean;
}

export default function ChoiceButtons({
  choices,
  onChoiceSelect,
  isLoading,
}: ChoiceButtonsProps) {
  if (choices.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        What happens next?
      </h3>
      <div className="space-y-4">
        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onChoiceSelect(choice)}
            disabled={isLoading}
            className="w-full p-4 text-left bg-white border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <span className="text-gray-800 font-medium">{choice.text}</span>
          </button>
        ))}
      </div>

      {isLoading && (
        <div className="text-center mt-6">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            <span className="text-blue-800">Generating next part...</span>
          </div>
        </div>
      )}
    </div>
  );
}
