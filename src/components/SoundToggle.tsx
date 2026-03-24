interface SoundToggleProps {
  soundEnabled: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ soundEnabled, onToggle }: SoundToggleProps) => {
  return (
    <div 
      className="sound-toggle-icon" 
      onClick={onToggle}
      title="Toggle sound effects"
    >
      <img 
        src={soundEnabled ? "/img/sound-on.svg" : "/img/sound-off.svg"} 
        alt={soundEnabled ? "Sound On" : "Sound Off"} 
      />
    </div>
  );
};

export default SoundToggle;
