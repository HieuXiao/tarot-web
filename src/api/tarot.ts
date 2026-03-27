import type { TarotCard, TarotMeaning } from '../types';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function requestJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text || path}`);
  }

  return (await res.json()) as T;
}

/** Fetch a full shuffled deck from the backend */
export async function fetchShuffledDeck(): Promise<TarotCard[]> {
  const data = await requestJson<{ cards: TarotCard[] }>('/shuffle');
  return data.cards as TarotCard[];
}

/** Restore in-progress deck state from session, if any */
export async function fetchCurrentState(): Promise<{
  hasDeck: boolean;
  cards: TarotCard[];
}> {
  return requestJson<{ hasDeck: boolean; cards: TarotCard[] }>('/current-state');
}

/** Fetch the meaning + orientation of a specific card by its imgSrc path */
export async function fetchCardMeaning(imgSrc: string): Promise<{
  meaning: TarotMeaning;
  isReversed: boolean;
}> {
  const data = await requestJson<{ meaning: TarotMeaning; isReversed: boolean }>(
    `/draw?imgSrc=${encodeURIComponent(imgSrc)}`
  );
  return { meaning: data.meaning as TarotMeaning, isReversed: data.isReversed as boolean };
}

/** Fetch 2 random unique cards */
export async function fetchDrawTwo(): Promise<{
  meaning: TarotMeaning;
  isReversed: boolean;
  imgSrc: string;
}[]> {
  const data = await requestJson<{ cards: { meaning: TarotMeaning; isReversed: boolean; imgSrc: string }[] }>('/draw/two');
  return data.cards;
}

/** Fetch 3 random unique cards */
export async function fetchDrawThree(): Promise<{
  meaning: TarotMeaning;
  isReversed: boolean;
  imgSrc: string;
}[]> {
  const data = await requestJson<{ cards: { meaning: TarotMeaning; isReversed: boolean; imgSrc: string }[] }>('/draw/three');
  return data.cards;
}
