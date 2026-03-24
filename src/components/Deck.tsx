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
  const getCardStyle = (index: number) => {
    const ring1Limit = 18;
    const ring2Limit = 18 + 26; // 44

    let ringIndex, ringCount, radius;

    if (index < ring1Limit) {
      ringIndex = index;
      ringCount = 18;
      radius = 140;
    } else if (index < ring2Limit) {
      ringIndex = index - ring1Limit;
      ringCount = 26;
      radius = 320;
    } else {
      ringIndex = index - ring2Limit;
      ringCount = 34;
      radius = 500;
    }

    const angleRange = 170; // Slightly tighter for better reach
    const startAngle = -175; // Balanced start
    const angleStep = ringCount > 1 ? angleRange / (ringCount - 1) : 0;
    const angleDeg = startAngle + (ringIndex * angleStep);
    const angleRad = (angleDeg * Math.PI) / 180;

    const x = Math.cos(angleRad) * radius;
    const y = Math.sin(angleRad) * radius;
    const rotation = angleDeg + 90;

    return {
      left: `calc(50% + ${x}px)`,
      top: `calc(480px + ${y}px)`,
      transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
    };
  };

  return (
    <div className="deck" id="deck">
      {cards.map((card, index) => {
        const sData = scatterData ? scatterData[index] : null;
        const rData = regroupData ? regroupData[index] : null;
        const baseStyle = getCardStyle(index);

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
            baseStyle={baseStyle}
          />
        );
      })}
    </div>
  );
};

export default Deck;
