import { useState } from 'react';
import type { TarotCard } from '../types';
import Card from './Card';

interface DeckProps {
  cards: TarotCard[];
  onCardClick: (index: number) => void;
  isShuffling: boolean;
  scatterData: Array<{ tx: string; ty: string; r: string; delay: string }> | null;
  regroupData: Array<{ delay: string }> | null;
}

const GROUP_COUNT = 5;

const Deck = ({ cards, onCardClick, scatterData, regroupData }: DeckProps) => {
  const [hoveredGroup, setHoveredGroup] = useState<number | null>(null);

  // Split cards into groups
  const groups: TarotCard[][] = Array.from({ length: GROUP_COUNT }, () => []);
  cards.forEach((card, i) => {
    groups[i % GROUP_COUNT].push(card);
  });

  // Maps card in group to its original index in cards[]
  const getOriginalIndex = (_groupIdx: number, cardInGroupIdx: number) => {
    return _groupIdx + cardInGroupIdx * GROUP_COUNT;
  };

  const getFanStyle = (
    groupIdx: number,
    cardInGroupIdx: number,
    totalInGroup: number,
    isHovered: boolean,
    isScattering: boolean
  ): React.CSSProperties => {
    // 3D positioning constants for the carousel
    const positionBias = [-35, -17, 0, 17, 35]; // rotateY offset per group
    const zOffset = [ -120, -40, 40, -40, -120 ]; // translateZ depth per group
    const baseRotation = positionBias[groupIdx] ?? 0;
    const baseZ = zOffset[groupIdx] ?? 0;

    if (!isHovered && !isScattering) {
      // Stacked pile in 3D carousel
      const depthOffset = Math.min(cardInGroupIdx, 5);
      const stackY = -depthOffset * 1.5;
      const stackZ = baseZ + depthOffset * 2;
      
      return {
        transform: `translate(-50%, -50%) translateY(${stackY}px) translateZ(${stackZ}px) rotateY(${baseRotation}deg) rotateZ(${(cardInGroupIdx % 3 - 1) * 0.5}deg)`,
        zIndex: cardInGroupIdx,
        transition: 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease',
        opacity: cardInGroupIdx > 12 ? 0 : cardInGroupIdx > 6 ? 0.4 : 1,
      };
    }

    if (isHovered) {
      // Focused and fanned out
      const angleRange = Math.min(130, totalInGroup * 9);
      const startAngle = -angleRange / 2;
      const step = totalInGroup > 1 ? angleRange / (totalInGroup - 1) : 0;
      const angle = startAngle + cardInGroupIdx * step;
      const angleRad = (angle * Math.PI) / 180;

      const fanRadius = Math.min(190, 100 + totalInGroup * 4.5);
      const x = Math.sin(angleRad) * fanRadius;
      const y = -Math.cos(angleRad) * fanRadius * 0.45;
      const z = 150 + cardInGroupIdx; // Bring it way forward

      return {
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) translateZ(${z}px) rotateY(0deg) rotateZ(${angle * 0.7}deg) scale(1.15)`,
        zIndex: cardInGroupIdx + 100,
        transition: `transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${cardInGroupIdx * 0.015}s, opacity 0.2s ease`,
        opacity: 1,
      };
    }

    // Default for scattering
    return {
      transform: 'translate(-50%, -50%) scale(0.9)',
      opacity: 0.8,
      transition: 'all 0.4s ease'
    };
  };


  return (
    <div className="deck-container">
      <div className="deck-piles" id="deck">
        {groups.map((group, groupIdx) => {
          const isHovered = hoveredGroup === groupIdx;
          const isScattering = !!scatterData;

          return (
            <div
              key={groupIdx}
              className={`card-pile ${isHovered ? 'pile-hovered' : ''}`}
              onMouseEnter={() => setHoveredGroup(groupIdx)}
              onMouseLeave={() => setHoveredGroup(null)}
            >
              {group.map((card, cardInGroupIdx) => {
                const originalIdx = getOriginalIndex(groupIdx, cardInGroupIdx);
                const sData = scatterData ? scatterData[originalIdx] : null;
                const rData = regroupData ? regroupData[originalIdx] : null;
                const fanStyle = getFanStyle(groupIdx, cardInGroupIdx, group.length, isHovered, isScattering);

                return (
                  <Card
                    key={card.id}
                    card={card}
                    onClick={() => onCardClick(originalIdx)}
                    isScatter={!!scatterData}
                    isRegroup={!!regroupData}
                    animationDelay={sData?.delay || rData?.delay}
                    tx={sData?.tx}
                    ty={sData?.ty}
                    r={sData?.r}
                    baseStyle={fanStyle}
                  />
                );
              })}
              {/* Pile label */}
              <div className="pile-label">
                {group.filter(c => !c.flipped).length} lá
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Deck;
