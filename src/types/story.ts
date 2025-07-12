// src/types/story.ts
export interface StoryInput {
  genre: string;
  characters: string;
  setting: string;
}

export interface Choice {
  id: string;
  text: string;
}

export interface StorySegment {
  text: string;
  choices: Choice[];
}

export interface GameState {
  isStarted: boolean;
  currentTurn: number;
  maxTurns: number;
  storySegments: StorySegment[];
  isLoading: boolean;
  isComplete: boolean;
}
