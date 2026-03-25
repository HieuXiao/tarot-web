interface ButtonGroupProps {
  onShuffle: () => void;
  onDrawRandom: (count: number) => void;
  isShuffling: boolean;
}

const ButtonGroup = ({ onShuffle, onDrawRandom, isShuffling }: ButtonGroupProps) => {
  return (
    <div className="button-group">
      <button id="shuffleBtn" onClick={onShuffle} disabled={isShuffling}>
        {isShuffling ? "Shuffling..." : "Shuffle Deck"}
      </button>

      <div className="draw-group">
        <button id="drawRandomBtn" onClick={() => onDrawRandom(1)} disabled={isShuffling}>
          Draw 1
        </button>
        <button id="drawRandom2Btn" onClick={() => onDrawRandom(2)} disabled={isShuffling}>
          Draw 2
        </button>
        <button id="drawRandom3Btn" onClick={() => onDrawRandom(3)} disabled={isShuffling}>
          Draw 3
        </button>
      </div>
    </div>
  );
};

export default ButtonGroup;
