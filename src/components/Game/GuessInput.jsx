import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';

import GuessResults from './GuessResults';
import Keyboard from '../Keyboard'; // We will create this next
import GameOverBanner from '../GameOverBanner';

const answer = sample(WORDS);
console.info({ answer });

function Game() {
  const [gameStatus, setGameStatus] = React.useState('running');
  const [guesses, setGuesses] = React.useState([]);
  const [tentativeGuess, setTentativeGuess] = React.useState('');

  function handleSubmitGuess() {
    if (tentativeGuess.length !== 5) {
      window.alert('Not enough letters!');
      return;
    }

    // TODO: Validate against word list

    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);
    setTentativeGuess('');

    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus('won');
    } else if (nextGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }

  function handleKeyPress(key) {
    if (gameStatus !== 'running') {
      return;
    }
    if (key === 'BACKSPACE') {
      setTentativeGuess((prev) => prev.slice(0, -1));
      return;
    }
    if (key === 'ENTER') {
      handleSubmitGuess();
      return;
    }
    if (tentativeGuess.length < 5) {
      setTentativeGuess((prev) => prev + key);
    }
  }

  // Allow physical keyboard input as well
  React.useEffect(() => {
    function handleKeyDown(event) {
      const { key } = event;

      if (gameStatus !== 'running') {
        return;
      }

      if (key === 'Enter') {
        handleSubmitGuess();
        return;
      }
      if (key === 'Backspace') {
        setTentativeGuess((prev) => prev.slice(0, -1));
        return;
      }
      if (/^[a-zA-Z]$/.test(key)) {
        if (tentativeGuess.length < 5) {
          setTentativeGuess((prev) => prev + key.toUpperCase());
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tentativeGuess, gameStatus, guesses]);

  const checkedGuesses = React.useMemo(
    () => guesses.map((guess) => checkGuess(guess, answer)),
    [guesses, answer]
  );

  return (
    <>
      <GuessResults
        guesses={checkedGuesses}
        tentativeGuess={tentativeGuess}
      />
      <Keyboard
        checkedGuesses={checkedGuesses}
        handleKeyPress={handleKeyPress}
      />
      {gameStatus !== 'running' && (
        <GameOverBanner
          gameStatus={gameStatus}
          numOfGuesses={guesses.length}
          answer={answer}
        />
      )}
    </>
  );
}

export default Game;