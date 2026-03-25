import type { TarotMeaning } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  cards: { meaning: TarotMeaning; imgSrc: string; isReversed: boolean }[];
}

const Modal = ({ isOpen, onClose, cards }: ModalProps) => {
  if (!isOpen || cards.length === 0) return null;

  return (
    <div className={`modal ${!isOpen ? 'hidden' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={`modal-content ${cards.length > 1 ? 'multi-column-layout' : ''}`}>
        <span className="close-button" onClick={onClose}>&times;</span>
        
        {cards.length === 1 ? (
          <>
            <img id="modal-image" src={`/${cards[0].imgSrc}`} loading="lazy" alt={cards[0].meaning?.name || "Tarot Card"} />
            <div id="card-meaning" className="card-meaning">
              <h2 id="card-name">{cards[0].meaning?.name}</h2>
              <div 
                id="meaning-upright" 
                className="meaning-upright" 
                style={{ display: cards[0].isReversed ? 'none' : 'block' }}
              >
                {cards[0].meaning?.upright}
              </div>
              <div 
                id="meaning-reversed" 
                className="meaning-reversed" 
                style={{ display: cards[0].isReversed ? 'block' : 'none' }}
              >
                {cards[0].meaning?.reversed}
              </div>
              <div id="card-advice" className="card-advice">
                {cards[0].isReversed ? cards[0].meaning?.advice.reversed : cards[0].meaning?.advice.upright}
              </div>
            </div>
          </>
        ) : (
          <div className="cards-grid">
            {cards.map((card, idx) => (
              <div key={`${card.imgSrc}-${idx}`} className="card-column">
                <img 
                  className="modal-image-thumb multi-visible"
                  src={`/${card.imgSrc}`} 
                  loading="lazy" 
                  alt={card.meaning?.name || "Tarot Card"}
                />
                <div className="card-meaning mini">
                  <h3 className="card-name-mini">{card.meaning?.name}</h3>
                  <div className="meaning-direction">
                    {card.isReversed ? "Reversed" : "Upright"}
                  </div>
                  <div className="meaning-text mini-text">
                    {card.isReversed ? card.meaning?.reversed : card.meaning?.upright}
                  </div>
                  <div className="card-advice mini-text italic">
                    {card.isReversed ? card.meaning?.advice.reversed : card.meaning?.advice.upright}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
