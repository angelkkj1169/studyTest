// src/store/useKeywordStore.ts
import { create } from "zustand";

interface KeywordStore {
  trendingKeywords: string[];
  setTrendingKeywords: (keywords: string[]) => void;
}

export const useKeywordStore = create<KeywordStore>((set) => ({
  trendingKeywords: [],
  setTrendingKeywords: (keywords) => set({ trendingKeywords: keywords }),
}));
