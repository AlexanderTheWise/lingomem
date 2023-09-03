export interface UserCredentials {
  email: string;
  password: string;
}

export interface SRItem {
  reviews: number;
  efactor: number;
  interval: number;
}

export interface Evalutation {
  score: 1 | 2 | 3 | 4 | 5;
  lateness: number;
}

export interface Deck {
  id: number;
  user_id: string;
  name: string;
  description: string;
  imageUrl: string;
  flashcards: Flashcards;
}

export interface Flashcard {
  id: number;
  question: string;
  answer: string;
  imageUrl: string;
}

export type Flashcards = Flashcard[];
export type Decks = Deck[];
export type DeckCard = Omit<Deck, "user_id" | "flashcards">;
export type DeckCards = DeckCard[];
