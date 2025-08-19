import React from 'react';

import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { range } from '../../utils';
import Guess from './Guess';

function GuessResults({ guesses, tentativeGuess }) {
  const currentGuessIndex = guesses.length;

  return (
    <div className="guess-results">
      {range(NUM_OF_GUESSES_ALLOWED).map((num) => {
        const isCurrentGuess = num === currentGuessIndex;
        return (
          <Guess
            key={num}
            value={isCurrentGuess ? tentativeGuess : guesses[num]}
            isSubmitted={!isCurrentGuess && num < currentGuessIndex}
          />
        );
      })}
    </div>
  );
}

export default GuessResults;