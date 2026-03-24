import type { TarotMeaning } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardMeaning: TarotMeaning | null;
  imgSrc: string;
  isReversed: boolean;
}

const Modal = ({ isOpen, onClose, cardMeaning, imgSrc, isReversed }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className={`modal ${!isOpen ? 'hidden' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>&times;</span>
        <img id="modal-image" src={`/${imgSrc}`} loading="lazy" alt={cardMeaning?.name || "Tarot Card"} />
        <div id="card-meaning" className="card-meaning">
          <h2 id="card-name">{cardMeaning?.name}</h2>
          <div 
            id="meaning-upright" 
            className="meaning-upright" 
            style={{ display: isReversed ? 'none' : 'block' }}
          >
            {cardMeaning?.upright}
          </div>
          <div 
            id="meaning-reversed" 
            className="meaning-reversed" 
            style={{ display: isReversed ? 'block' : 'none' }}
          >
            {cardMeaning?.reversed}
          </div>
          <div id="card-advice" className="card-advice">
            {isReversed ? cardMeaning?.advice.reversed : cardMeaning?.advice.upright}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
