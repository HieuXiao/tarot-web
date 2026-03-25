import { useState, useEffect, useCallback, useRef } from 'react';
import './App.css';
import type { TarotCard, TarotMeaning } from './types';
import { fetchShuffledDeck, fetchCardMeaning } from './api/tarot';
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
  const [selectedCards, setSelectedCards] = useState<{ meaning: TarotMeaning; imgSrc: string; isReversed: boolean }[] | null>(null);

  // Animation states
  const [scatterData, setScatterData] = useState<{ tx: string; ty: string; r: string; delay: string }[] | null>(null);
  const [regroupData, setRegroupData] = useState<{ delay: string }[] | null>(null);

  const { playShuffle, playFlip } = useSound(soundEnabled);

  // ─── Fetch initial deck from API ────────────────────────────────────────────
  const initDeck = useCallback(async () => {
    try {
      const newCards = await fetchShuffledDeck();
      setCards(newCards);
      setFlipCount(0);
    } catch (err) {
      console.error('Failed to init deck:', err);
    }
  }, []);

  useEffect(() => {
    initDeck();
  }, [initDeck]);

  // ─── Shuffle: get new deck from API, run scatter/regroup animation ───────────
  const handleShuffle = async () => {
    if (isShuffling || isProcessing.current) return;

    playShuffle();
    setIsShuffling(true);
    isProcessing.current = true;
    setFlipCount(0);

    try {
      // Fetch shuffled deck from backend
      const newCards = await fetchShuffledDeck();

      // Prepare scatter animation data (client-only visual)
      const sData = newCards.map((_, i) => ({
        tx: (Math.random() - 0.5) * 120 + "px",
        ty: (Math.random() - 0.5) * 80 + "px",
        r: (Math.random() - 0.5) * 60 + "deg",
        delay: `${i * 0.05}s`,
      }));
      setScatterData(sData);

      const totalTime = 400 + newCards.length * 50;

      setTimeout(() => {
        playShuffle();
        setScatterData(null);
        setRegroupData(newCards.map((_, i) => ({ delay: `${i * 0.05}s` })));
        setCards(newCards);

        setTimeout(() => {
          setRegroupData(null);
          setIsShuffling(false);
          isProcessing.current = false;
        }, totalTime);
      }, totalTime);
    } catch (err) {
      console.error('Failed to shuffle deck:', err);
      setIsShuffling(false);
      isProcessing.current = false;
    }
  };

  // ─── Card click: flip card, then fetch meaning from API ─────────────────────
  const handleCardClick = async (index: number) => {
    if (isShuffling || isProcessing.current || selectedCards) return;

    const card = cards[index];
    playFlip();

    // Already flipped — just re-open modal using stored meaning from API
    if (card.flipped) {
      try {
        const { meaning, isReversed } = await fetchCardMeaning(card.imgSrc);
        setSelectedCards([{ meaning, imgSrc: card.imgSrc, isReversed: card.isReversed ?? isReversed }]);
      } catch (err) {
        console.error('Failed to fetch card meaning:', err);
      }
      return;
    }

    isProcessing.current = true;
    const newCards = [...cards];
    const newFlipCount = flipCount + 1;
    newCards[index] = { ...card, flipped: true, flipOrder: newFlipCount };
    setCards(newCards);
    setFlipCount(newFlipCount);

    // Fetch meaning from API while flip animation plays
    setTimeout(async () => {
      try {
        const { meaning, isReversed } = await fetchCardMeaning(card.imgSrc);
        setSelectedCards([{ meaning, imgSrc: card.imgSrc, isReversed }]);
      } catch (err) {
        console.error('Failed to fetch card meaning:', err);
      } finally {
        isProcessing.current = false;
      }
    }, 500);
  };

  // ─── Draw random: pick random unflipped cards or call API ───────────────────
  const handleDrawRandom = async (count: number) => {
    if (isShuffling || isProcessing.current || selectedCards) return;
    
    // For 1 card, use the existing logic to pick an unflipped card visually
    if (count === 1) {
      const unflippedIndices = cards
        .map((c, i) => (c.flipped ? -1 : i))
        .filter((i) => i !== -1);
      if (unflippedIndices.length === 0) return;

      const randomIndex =
        unflippedIndices[Math.floor(Math.random() * unflippedIndices.length)];
      handleCardClick(randomIndex);
      return;
    }

    // For 2 or 3 cards, fetch from the backend API
    isProcessing.current = true;
    playFlip();

    try {
      // Dynamically import the api fetches to avoid cluttering top level if unnecessary
      const { fetchDrawTwo, fetchDrawThree } = await import('./api/tarot');
      const drawnCards = count === 2 ? await fetchDrawTwo() : await fetchDrawThree();
      
      // Update local deck state to mark these cards as flipped
      const newCards = [...cards];
      let currentFlipCount = flipCount;
      
      drawnCards.forEach(drawnCard => {
        // Find the card in the deck
        const deckIndex = newCards.findIndex(c => c.imgSrc === drawnCard.imgSrc);
        if (deckIndex !== -1 && !newCards[deckIndex].flipped) {
          currentFlipCount++;
          newCards[deckIndex] = { ...newCards[deckIndex], flipped: true, flipOrder: currentFlipCount };
        }
      });
      
      setCards(newCards);
      setFlipCount(currentFlipCount);
      
      // Delay modal to show physical card flips
      setTimeout(() => {
        setSelectedCards(drawnCards);
        isProcessing.current = false;
      }, 600);
      
    } catch (err) {
      console.error('Failed to draw multiple cards', err);
      isProcessing.current = false;
    }
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
      <SoundToggle soundEnabled={soundEnabled} onToggle={toggleSound} />
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
        key={selectedCards ? selectedCards[0].imgSrc : 'empty'}
        isOpen={!!selectedCards}
        onClose={() => setSelectedCards(null)}
        cards={selectedCards || []}
      />
      <Footer />
    </div>
  );
}

export default App;
