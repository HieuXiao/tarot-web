interface ButtonGroupProps {
  onShuffle: () => void;
  onDrawRandom: () => void;
  isShuffling: boolean;
}

const ButtonGroup = ({ onShuffle, onDrawRandom, isShuffling }: ButtonGroupProps) => {
  return (
    <div className="button-group">
      <button id="shuffleBtn" onClick={onShuffle} disabled={isShuffling}>
        {isShuffling ? "Shuffling..." : "Shuffle Deck"}
      </button>
      <button id="drawRandomBtn" onClick={onDrawRandom} disabled={isShuffling}>
        Random Card
      </button>
    </div>
  );
};

export default ButtonGroup;
