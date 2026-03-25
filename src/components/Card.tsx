import React from 'react';
import type { TarotCard } from '../types';

interface CardProps {
  card: TarotCard;
  onClick: () => void;
  isScatter?: boolean;
  isRegroup?: boolean;
  animationDelay?: string;
  tx?: string;
  ty?: string;
  r?: string;
  baseStyle?: React.CSSProperties;
}

const Card = ({
  card,
  onClick,
  isScatter,
  isRegroup,
  animationDelay,
  tx,
  ty,
  r,
  baseStyle
}: CardProps) => {
  const innerStyle = {
    animationDelay,
    '--tx': tx || '0px',
    '--ty': ty || '0px',
    '--r': r || '0deg',
  } as React.CSSProperties;

  return (
    <div
      className={`card ${card.flipped ? 'flipped' : ''}`}
      onClick={onClick}
      style={baseStyle}
    >
      <div
        className={`card-inner ${isScatter ? 'scatter-animation' : ''} ${isRegroup ? 'regroup-animation' : ''}`}
        style={innerStyle}
      >
        <div className="card-back"></div>
        <div
          className={`card-front ${card.isReversed ? 'reversed' : ''}`}
          style={{ backgroundImage: `url('/${card.imgSrc}')` }}
        >
          {card.flipped && card.flipOrder !== undefined && (
            <span className="card-number">{card.flipOrder}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
