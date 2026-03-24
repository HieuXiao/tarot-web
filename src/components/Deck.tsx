import type { TarotCard } from '../types';
import Card from './Card';

interface DeckProps {
  cards: TarotCard[];
  onCardClick: (index: number) => void;
  isShuffling: boolean;
  scatterData: Array<{ tx: string; ty: string; r: string; delay: string }> | null;
  regroupData: Array<{ delay: string }> | null;
}

const Deck = ({ cards, onCardClick, scatterData, regroupData }: DeckProps) => {
  return (
    <div className="deck" id="deck">
      {cards.map((card, index) => {
        const sData = scatterData ? scatterData[index] : null;
        const rData = regroupData ? regroupData[index] : null;

        return (
          <Card 
            key={card.id} 
            card={card} 
            onClick={() => onCardClick(index)}
            isScatter={!!scatterData}
            isRegroup={!!regroupData}
            animationDelay={sData?.delay || rData?.delay}
            tx={sData?.tx}
            ty={sData?.ty}
            r={sData?.r}
          />
        );
      })}
    </div>
  );
};

export default Deck;
