export interface User {
  username: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  type: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface Phrase {
  id: number;
  text: string;
  language: string;
  accent?: string;
  totalVideosAvailable: number;
  isActive: boolean;
  createdAt: string;
  lastUsedAt?: string;
}

export interface CreatePhraseRequest {
  text: string;
  language: string;
  accent?: string;
}

export interface NextVideoResponse {
  videoId: string;
  trackNumber: number;
  phrase: Phrase;
  captionText?: string;
  language: string;
  accent?: string;
  totalResults: number;
  preloadNext?: PreloadVideoInfo;
}

export interface PreloadVideoInfo {
  phraseId: number;
  phraseText: string;
  estimatedTrackNumber: number;
}

export interface UserStats {
  totalPhrases: number;
  activePhrases: number;
  totalVideosWatched: number;
  phrasesUsedToday: number;
}

