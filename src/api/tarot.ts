import type { TarotCard, TarotMeaning } from '../types';

const API_BASE = '/api';

/** Fetch a full shuffled deck from the backend */
export async function fetchShuffledDeck(): Promise<TarotCard[]> {
  const res = await fetch(`${API_BASE}/shuffle`);
  if (!res.ok) throw new Error('Failed to fetch shuffled deck');
  const data = await res.json();
  return data.cards as TarotCard[];
}

/** Fetch the meaning + orientation of a specific card by its imgSrc path */
export async function fetchCardMeaning(imgSrc: string): Promise<{
  meaning: TarotMeaning;
  isReversed: boolean;
}> {
  const res = await fetch(
    `${API_BASE}/draw?imgSrc=${encodeURIComponent(imgSrc)}`
  );
  if (!res.ok) throw new Error(`Failed to fetch card meaning for ${imgSrc}`);
  const data = await res.json();
  return { meaning: data.meaning as TarotMeaning, isReversed: data.isReversed as boolean };
}

/** Fetch 2 random unique cards */
export async function fetchDrawTwo(): Promise<{
  meaning: TarotMeaning;
  isReversed: boolean;
  imgSrc: string;
}[]> {
  const res = await fetch(`${API_BASE}/draw/two`);
  if (!res.ok) throw new Error('Failed to fetch 2 cards');
  const data = await res.json();
  return data.cards;
}

/** Fetch 3 random unique cards */
export async function fetchDrawThree(): Promise<{
  meaning: TarotMeaning;
  isReversed: boolean;
  imgSrc: string;
}[]> {
  const res = await fetch(`${API_BASE}/draw/three`);
  if (!res.ok) throw new Error('Failed to fetch 3 cards');
  const data = await res.json();
  return data.cards;
}
