"use client";

import { Choice } from "@/types/story";
import { Card, CardContent } from "./ui/card";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { console } from "inspector";

interface ChoiceButtonsProps {
  choices: Choice[];
  onChoiceSelect: (choice: Choice) => void;
  isLoading: boolean;
}

const className = [
  "from-orange-800 to-red-800 border-orange-400/30",
  "from-purple-800 to-indigo-800 border-purple-400/30",
  "from-emerald-800 to-teal-800 border-emerald-400/30",
];

const choiceIcons = ["mdi:sword", "mdi:crystal-ball", "mdi:leaf"];

const choiceIconsColor = ["orange", "purple", "emerald"];

const choiceTexts = [
  "The Warrior's Way",
  "The Mystic Portal",
  "The Forest Path",
];

export default function ChoiceButtons({
  choices,
  onChoiceSelect,
  isLoading,
}: ChoiceButtonsProps) {
  if (choices.length === 0) return null;

  return (
    <div className="relative z-10 px-4 pb-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-heading text-2xl text-center text-purple-200 mb-8">
          What do you choose?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {choices.map((choice, idx) => (
            <Card
              key={choice.id}
              onClick={() => onChoiceSelect(choice)}
              className={cn(
                "bg-gradient-to-br hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 cursor-pointer",
                className[idx]
              )}
            >
              <CardContent className="px-6 py-8 text-center">
                <div className="mb-4">
                  <div
                    className={`w-16 h-16 bg-${choiceIconsColor[idx]}-400 rounded-full mx-auto flex items-center justify-center mb-4`}
                  >
                    <Icon
                      icon={choiceIcons[idx]}
                      className={`w-8 h-8 text-${choiceIconsColor[idx]}-800`}
                    />
                  </div>
                  <h3
                    className={`font-heading text-xl text-${choiceIconsColor[idx]}-200 mb-3`}
                  >
                    {choiceTexts[idx]}
                  </h3>
                  <p className={`text-${choiceIconsColor[idx]}-100 text-sm`}>
                    {choice.text}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
