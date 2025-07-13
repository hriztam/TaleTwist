// src/app/components/PromptForm.tsx
"use client";

import { useState } from "react";
import { StoryInput } from "@/types/story";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

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
    <div className="relative z-10 px-4 mb-16">
      <Card className="max-w-2xl mx-auto bg-slate-800/50 backdrop-blur-sm border-purple-500/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="font-heading text-2xl text-center text-purple-200">
            Create Your Adventure
          </CardTitle>
        </CardHeader>
        <CardContent className="px-6 space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label
                htmlFor="genre"
                className="text-purple-200 font-medium mb-2 block"
              >
                Genre
              </Label>
              <Select
                value={input.genre}
                onValueChange={(value) => setInput({ ...input, genre: value })}
                required
              >
                <SelectTrigger className="bg-slate-700/50 border-purple-500/30 text-white">
                  <SelectValue placeholder="Choose your genre..." />
                </SelectTrigger>
                <SelectContent>
                  {GENRE_OPTIONS.map((genre) => (
                    <SelectItem key={genre} value={genre}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label
                htmlFor="characters"
                className="text-purple-200 font-medium mb-2 block"
              >
                Characters
              </Label>
              <Input
                id="prompt-input"
                value={input.characters}
                onChange={(e) =>
                  setInput({ ...input, characters: e.target.value })
                }
                placeholder="A brave knight, a wise wizard, a mysterious stranger..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-300"
                required
              />
            </div>
            <div>
              <Label
                htmlFor="setting"
                className="text-purple-200 font-medium mb-2 block"
              >
                Environment
              </Label>
              <Input
                id="setting"
                value={input.setting}
                onChange={(e) =>
                  setInput({ ...input, setting: e.target.value })
                }
                placeholder="An enchanted forest, a space station, a haunted mansion..."
                className="bg-slate-700/50 border-purple-500/30 text-white placeholder-purple-300"
                required
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-lg font-semibold rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
            >
              {isLoading ? "Generating Story..." : "Begin Adventure"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
