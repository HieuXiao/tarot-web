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
  const getCardStyle = (
    isScattering: boolean
  ): React.CSSProperties => {
    if (!isScattering) {
      return {
        transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease',
        opacity: 1,
      };
    }

    // Default for scattering/regrouping
    return {
      opacity: 0.8,
      transition: 'all 0.4s ease'
    };
  };

  return (
    <div className="deck-container">
      <div className="deck-grid" id="deck">
        {cards.map((card, index) => {
          const sData = scatterData ? scatterData[index] : null;
          const rData = regroupData ? regroupData[index] : null;
          const cardStyle = getCardStyle(!!scatterData);

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
              baseStyle={cardStyle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Deck;
