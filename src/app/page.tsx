// src/app/page.tsx
"use client";

import { useReducer } from "react";
import PromptForm from "./components/PromptForm";
import StoryDisplay from "./components/StoryDisplay";
import ChoiceButtons from "./components/ChoiceButtons";
import { StoryInput, Choice, GameState } from "@/types/story";

type Action =
  | { type: "START_STORY" }
  | { type: "STORY_GENERATED"; payload: { text: string; choices: Choice[] } }
  | { type: "CHOICE_SELECTED" }
  | { type: "STORY_CONTINUED"; payload: { text: string; choices: Choice[] } }
  | { type: "STORY_COMPLETED"; payload: { text: string } }
  | { type: "ERROR" }
  | { type: "RESET" };

const initialState: GameState = {
  isStarted: false,
  currentTurn: 0,
  maxTurns: 3,
  storySegments: [],
  isLoading: false,
  isComplete: false,
};

function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case "START_STORY":
      return { ...state, isLoading: true };

    case "STORY_GENERATED":
      return {
        ...state,
        isStarted: true,
        isLoading: false,
        storySegments: [action.payload],
      };

    case "CHOICE_SELECTED":
      return { ...state, isLoading: true };

    case "STORY_CONTINUED":
      return {
        ...state,
        isLoading: false,
        currentTurn: state.currentTurn + 1,
        storySegments: [...state.storySegments, action.payload],
      };

    case "STORY_COMPLETED":
      return {
        ...state,
        isLoading: false,
        currentTurn: state.currentTurn + 1,
        isComplete: true,
        storySegments: [
          ...state.storySegments,
          { text: action.payload.text, choices: [] },
        ],
      };

    case "ERROR":
      return { ...state, isLoading: false };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

export default function Home() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const handleStartStory = async (input: StoryInput) => {
    dispatch({ type: "START_STORY" });

    try {
      const response = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error("Failed to start story");

      const data = await response.json();
      dispatch({
        type: "STORY_GENERATED",
        payload: { text: data.story, choices: data.choices },
      });
    } catch (error) {
      console.error("Error starting story:", error);
      dispatch({ type: "ERROR" });
    }
  };

  const handleChoiceSelect = async (choice: Choice) => {
    dispatch({ type: "CHOICE_SELECTED" });

    try {
      const previousStory = state.storySegments.map((s) => s.text).join("\n\n");
      const response = await fetch("/api/next", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          previousStory,
          selectedChoice: choice.text,
          turnNumber: state.currentTurn,
          maxTurns: state.maxTurns,
        }),
      });

      if (!response.ok) throw new Error("Failed to continue story");

      const data = await response.json();

      if (state.currentTurn >= state.maxTurns - 1) {
        dispatch({ type: "STORY_COMPLETED", payload: { text: data.story } });
      } else {
        dispatch({
          type: "STORY_CONTINUED",
          payload: { text: data.story, choices: data.choices },
        });
      }
    } catch (error) {
      console.error("Error continuing story:", error);
      dispatch({ type: "ERROR" });
    }
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      {!state.isStarted ? (
        <PromptForm onSubmit={handleStartStory} isLoading={state.isLoading} />
      ) : (
        <div className="space-y-8">
          <StoryDisplay
            segments={state.storySegments}
            currentTurn={state.currentTurn}
            maxTurns={state.maxTurns}
          />

          {!state.isComplete && state.storySegments.length > 0 && (
            <ChoiceButtons
              choices={
                state.storySegments[state.storySegments.length - 1].choices
              }
              onChoiceSelect={handleChoiceSelect}
              isLoading={state.isLoading}
            />
          )}

          {state.isComplete && (
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                The End!
              </h3>
              <button
                onClick={handleReset}
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Start New Adventure
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
