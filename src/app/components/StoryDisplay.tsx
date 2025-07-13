"use client";

import { StorySegment } from "@/types/story";
import { Card, CardContent } from "./ui/card";
import { useEffect, useRef, useState } from "react";

interface StoryDisplayProps {
  segments: StorySegment[];
  currentTurn: number;
  maxTurns: number;
  isStarted?: boolean;
  onReset?: () => void;
}

export default function StoryDisplay({
  segments,
  currentTurn,
  maxTurns,
  isStarted,
  onReset,
}: StoryDisplayProps) {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (segments.length === 0) {
      setDisplayedText("");
      setAnimatingIndex(null);
      return;
    }
    const lastIndex = segments.length - 1;
    setAnimatingIndex(lastIndex);
    setDisplayedText("");
    let i = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDisplayedText((prev) => {
        const next = segments[lastIndex].text.slice(0, i + 1);
        i++;
        if (next.length === segments[lastIndex].text.length) {
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return next;
      });
      if (i >= segments[lastIndex].text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 18); // typing speed
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [segments.length]);

  return (
    <div className="relative z-10 px-4 mb-12">
      {segments.length === 0 ? (
        <Card className="max-w-4xl mx-auto bg-gradient-to-br from-amber-100 to-orange-100 text-slate-800 border-amber-300 shadow-2xl">
          <CardContent className="px-8 py-12">
            <div className="relative">
              <div className="absolute -top-4 -left-4 text-6xl text-amber-400 opacity-50">
                "
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl text-amber-400 opacity-50"></div>
              <div>
                <p className="text-lg md:text-xl leading-relaxed font-serif text-slate-500 italic text-center relative z-10">
                  No story yet. Start writing!
                </p>
              </div>
              <div className="absolute -bottom-4 -right-4 text-6xl text-amber-400 opacity-50">
                "
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        segments.map((segment, index) => (
          <Card
            key={index}
            className="max-w-4xl mx-auto bg-gradient-to-br from-amber-100 to-orange-100 text-slate-800 border-amber-300 shadow-2xl mb-6 relative"
          >
            <CardContent className="px-8 py-12">
              <div className="relative">
                <div className="absolute -top-4 -left-4 text-6xl text-amber-400 opacity-50">
                  "
                </div>
                <div className="absolute -bottom-4 -right-4 text-6xl text-amber-400 opacity-50"></div>
                <div>
                  <p className="text-lg md:text-xl leading-relaxed font-serif text-slate-700 relative z-10 pl-4">
                    {index === segments.length - 1 && animatingIndex === index
                      ? displayedText
                      : segment.text}
                    {index === segments.length - 1 &&
                      displayedText.length < segment.text.length && (
                        <span className="animate-pulse">|</span>
                      )}
                  </p>
                  {/* Reset button in latest card, bottom right */}
                  {isStarted && index === segments.length - 1 && onReset && (
                    <button
                      onClick={onReset}
                      className="relative left-180 top-8 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white mr-2 px-5 py-2 rounded-full shadow-lg font-semibold transition-all duration-300 transform hover:scale-105 z-20"
                      style={{ minWidth: "100px" }}
                      aria-label="Reset Story"
                    >
                      Start Over
                    </button>
                  )}
                </div>
                <div className="absolute -bottom-4 -right-4 text-6xl text-amber-400 opacity-50">
                  "
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
