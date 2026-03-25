import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import { CARD_MEANINGS, CARD_IMAGES } from './constants/tarotData';
import type { TarotCard, TarotMeaning } from './types';
import ParticlesBackground from './components/ParticlesBackground';
import Header from './components/Header';
import ButtonGroup from './components/ButtonGroup';
import SoundToggle from './components/SoundToggle';
import Deck from './components/Deck';
import Modal from './components/Modal';
import Footer from './components/Footer';
import useSound from './hooks/useSound';

function App() {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem("mysticDrawSound");
    return saved !== null ? saved === "true" : true;
  });
  const [isShuffling, setIsShuffling] = useState(false);
  const isProcessing = useRef(false);
  const [flipCount, setFlipCount] = useState(0);
  const [selectedCard, setSelectedCard] = useState<{ meaning: TarotMeaning; imgSrc: string; isReversed: boolean } | null>(null);
  
  // Animation states
  const [scatterData, setScatterData] = useState<any[] | null>(null);
  const [regroupData, setRegroupData] = useState<any[] | null>(null);

  const { playShuffle, playFlip } = useSound(soundEnabled);

  const initDeck = useCallback(() => {
    const newCards = CARD_IMAGES.map((imgSrc, index) => ({
      id: `${imgSrc}-${index}`,
      imgSrc,
      isReversed: Math.random() < 0.5,
      flipped: false,
    }));
    // Fisher-Yates shuffle
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }
    setCards(newCards);
    setFlipCount(0);
  }, []);

  useEffect(() => {
    initDeck();
  }, [initDeck]);

  const handleShuffle = () => {
    if (isShuffling || isProcessing.current) return;

    playShuffle();
    setIsShuffling(true);
    isProcessing.current = true;
    setFlipCount(0);
    
    // Create new shuffled deck but keep them face down
    const newCards = CARD_IMAGES.map((imgSrc, index) => ({
      id: `${imgSrc}-${index}-${Date.now()}`,
      imgSrc,
      isReversed: Math.random() < 0.5,
      flipped: false,
    }));
    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
    }

    // Prepare scatter animation data
    const sData = newCards.map((_, i) => ({
      tx: (Math.random() - 0.5) * 120 + "px",
      ty: (Math.random() - 0.5) * 80 + "px",
      r: (Math.random() - 0.5) * 60 + "deg",
      delay: `${i * 0.015}s`
    }));
    setScatterData(sData);

    // After scatter, do regroup
    const totalTime = 400 + newCards.length * 15; 
    
    setTimeout(() => {
      playShuffle();
      setScatterData(null);
      setRegroupData(newCards.map((_, i) => ({ delay: `${i * 0.015}s` })));
      setCards(newCards);

      setTimeout(() => {
        setRegroupData(null);
        setIsShuffling(false);
        isProcessing.current = false;
      }, totalTime);
    }, totalTime);
  };

  const handleCardClick = (index: number) => {
    if (isShuffling || isProcessing.current || selectedCard) return;

    const card = cards[index];
    playFlip();

    if (card.flipped) {
      const cardFile = card.imgSrc.split("/").pop() || "";
      const meaning = CARD_MEANINGS[cardFile];
      setSelectedCard({ meaning, imgSrc: card.imgSrc, isReversed: card.isReversed });
      return;
    }

    isProcessing.current = true;
    const newCards = [...cards];
    const newFlipCount = flipCount + 1;
    newCards[index] = { ...card, flipped: true, flipOrder: newFlipCount };
    setCards(newCards);
    setFlipCount(newFlipCount);

    const cardFile = card.imgSrc.split("/").pop() || "";
    const meaning = CARD_MEANINGS[cardFile];
    
    // Optional delay before showing modal
    setTimeout(() => {
      setSelectedCard({ meaning, imgSrc: card.imgSrc, isReversed: card.isReversed });
      isProcessing.current = false;
    }, 500);
  };

  const handleDrawRandom = () => {
    if (isShuffling || isProcessing.current || selectedCard) return;
    const unflippedIndices = cards.map((c, i) => c.flipped ? -1 : i).filter(i => i !== -1);
    if (unflippedIndices.length === 0) return;

    const randomIndex = unflippedIndices[Math.floor(Math.random() * unflippedIndices.length)];
    handleCardClick(randomIndex);
  };

  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    localStorage.setItem("mysticDrawSound", String(newState));
  };

  return (
    <div className="container">
      <ParticlesBackground />
      <Header />
      <SoundToggle 
        soundEnabled={soundEnabled} 
        onToggle={toggleSound} 
      />
      <Deck 
        cards={cards} 
        onCardClick={handleCardClick} 
        isShuffling={isShuffling}
        scatterData={scatterData}
        regroupData={regroupData}
      />
      <ButtonGroup 
        onShuffle={handleShuffle} 
        onDrawRandom={handleDrawRandom} 
        isShuffling={isShuffling}
      />
      <Modal 
        isOpen={!!selectedCard} 
        onClose={() => setSelectedCard(null)} 
        cardMeaning={selectedCard?.meaning || null}
        imgSrc={selectedCard?.imgSrc || ""}
        isReversed={selectedCard?.isReversed || false}
      />
      <Footer />
    </div>
  );
}

export default App;
