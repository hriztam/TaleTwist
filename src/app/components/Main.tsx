"use client";
import { Button } from "./ui/button";
import { StoryInput, Choice, GameState } from "@/types/story";
import { useReducer } from "react";
import StoryDisplay from "./StoryDisplay";
import ChoiceButtons from "./ChoiceButtons";
import PromptForm from "./PromptForm";

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

export function Main() {
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-300" />
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-blue-300 rounded-full animate-pulse delay-700" />
        <div className="absolute bottom-40 right-1/3 w-2 h-2 bg-white rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-60 left-1/2 w-1 h-1 bg-purple-300 rounded-full animate-pulse delay-500" />
      </div>
      <div className="relative z-10 pt-20 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            TaleTwist
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-8 max-w-2xl mx-auto leading-relaxed">
            Craft your own adventure using AI. Just give a prompt, and watch
            your story unfold.
          </p>
          <Button
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
            onClick={() => {
              const input =
                document.querySelector<HTMLInputElement>("#prompt-input");
              if (input) {
                input.scrollIntoView({ behavior: "smooth", block: "center" });
                setTimeout(() => input.focus(), 500);
              }
            }}
          >
            Start Your Story
          </Button>
        </div>
      </div>

      <PromptForm onSubmit={handleStartStory} isLoading={state.isLoading} />

      {state.isStarted && (
        <div className="text-center mb-8">
          <p className="text-purple-300">
            Turn {state.currentTurn} of {state.maxTurns}
          </p>
        </div>
      )}

      <StoryDisplay
        segments={state.storySegments}
        currentTurn={state.currentTurn}
        maxTurns={state.maxTurns}
        isStarted={state.isStarted}
        onReset={handleReset}
      />
      {/* Choices below the card */}
      {!state.isComplete && state.storySegments.length > 0 && (
        <ChoiceButtons
          choices={state.storySegments[state.storySegments.length - 1].choices}
          onChoiceSelect={handleChoiceSelect}
          isLoading={state.isLoading}
        />
      )}
    </div>
  );
}
