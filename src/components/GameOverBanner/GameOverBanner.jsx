import React from 'react';
import Confetti from '../Confetti/Confetti';

function GameOverBanner({ gameStatus, numOfGuesses, answer, handleRestart }) {
  const isWinner = gameStatus === 'won';
  const definitionUrl = `https://www.merriam-webster.com/dictionary/${answer}`;

  return (
    <div className={`banner-wrapper ${gameStatus}`}>
      {isWinner && <Confetti />}
      <div className="banner-content">
        <h2>{isWinner ? 'Congratulations!' : 'Game Over!'}</h2>
        {isWinner ? (
          <p>
            You guessed the word in{' '}
            <strong>
              {numOfGuesses} {numOfGuesses === 1 ? 'guess' : 'guesses'}
            </strong>
            .
          </p>
        ) : (
          <p>
            The correct word was{' '}
            <a
              href={definitionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="answer-link"
            >
              {answer}
            </a>
            .
          </p>
        )}
        <button className="restart-button" onClick={handleRestart}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default GameOverBanner;