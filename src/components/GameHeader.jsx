import React from "react";

function GameHeader({ score, moves }) {
  const restartGame = () => {
    window.location.reload();
  };
  return (
    <div className="game-header">
      <h1>Meomery Cards</h1>
      <div className="stats">
        <div className="stat-item">
          <span className="state-label">score:</span>
          <span className="state-value">{score}</span>
        </div>
        <div className="stat-item">
          <span className="state-label">move:</span>
          <span className="state-value">{moves}</span>
        </div>
      </div>
      <button className="reset-btn" onClick={restartGame}>New Game</button>
    </div>
  );
}

export default GameHeader;
