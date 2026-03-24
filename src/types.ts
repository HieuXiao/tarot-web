export interface TarotAdvice {
  upright: string;
  reversed: string;
}

export interface TarotMeaning {
  name: string;
  upright: string;
  reversed: string;
  advice: TarotAdvice;
}

export interface TarotCard {
  id: string;
  imgSrc: string;
  isReversed: boolean;
  flipped: boolean;
  flipOrder?: number;
}
