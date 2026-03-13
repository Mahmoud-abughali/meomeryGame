import { useEffect, useState } from "react";
import { Card } from "./components/card";
import GameHeader from "./components/gameHeader";

const cardValues = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🥝",
  "🍑",
  "🍒",
];

function App() {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isWinner, setIsWinner] = useState(false);

  const shuffle = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const initializeGame = () => {
    const shuffledValues = shuffle(cardValues);

    const finalCards = shuffledValues.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
    setIsWinner(false);
  };

  const handleCardClick = (card) => {
    if (card.isFlipped || card.isMatched) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, isFlipped: true } : c,
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves((prev) => prev + 1);

      const firstCard = newCards.find((c) => c.id === newFlippedCards[0]);
      const secondCard = newCards.find((c) => c.id === newFlippedCards[1]);

      if (firstCard.value === secondCard.value) {
        setScore((prev) => prev + 1);

        const matchedCards = newCards.map((c) =>
          newFlippedCards.includes(c.id) ? { ...c, isMatched: true } : c,
        );

        setCards(matchedCards);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          const flippedBack = newCards.map((c) =>
            newFlippedCards.includes(c.id) ? { ...c, isFlipped: false } : c,
          );
          setCards(flippedBack);
          setFlippedCards([]);
        }, 800);
      }

      // Check if all matched
      if (
        newCards.every((c) => c.isMatched || newFlippedCards.includes(c.id))
      ) {
        setTimeout(() => setIsWinner(true), 500);
      }
    }
  };

  useEffect(() => {
    initializeGame();
  }, []);

  return (
    <div className="app">
      <GameHeader score={score} moves={moves} />

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>

      {isWinner && (
        <div className="win-popup">
          <h2>🎉 You Win! 🎉</h2>
          <p>
            It took you <strong>{moves}</strong> moves!
          </p>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default App;
