"use client";

import { StorySegment } from "@/types/story";
import { Card, CardContent } from "./ui/card";

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
    <div className="relative z-10 px-4 mb-12">
      <Card className="max-w-4xl mx-auto bg-gradient-to-br from-amber-100 to-orange-100 text-slate-800 border-amber-300 shadow-2xl">
        <CardContent className="px-8 py-12">
          <div className="relative">
            <div className="absolute -top-4 -left-4 text-6xl text-amber-400 opacity-50">
              "
            </div>
            <div className="absolute -bottom-4 -right-4 text-6xl text-amber-400 opacity-50">
              "
            </div>
            <div>
              {segments.length === 0 ? (
                <p className="text-lg md:text-xl leading-relaxed font-serif text-slate-500 italic text-center relative z-10">
                  Your story will appear here as you create it. Start by giving
                  a prompt!
                </p>
              ) : (
                segments.map((segment, index) => (
                  <div key={index}>
                    <p className="text-lg md:text-xl leading-relaxed font-serif text-slate-700 relative z-10">
                      {segment.text}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
