import React from 'react';

import { sample } from '../../utils';
import { WORDS } from '../../data';
import { NUM_OF_GUESSES_ALLOWED } from '../../constants';
import { checkGuess } from '../../game-helpers';

import GuessResults from './GuessResults';
import Keyboard from '../Keyboard';
import GameOverBanner from '../GameOverBanner';

function Game() {
  // A unique key for each game session to force re-mounting components
  const [gameKey, setGameKey] = React.useState(1);
  
  const [answer, setAnswer] = React.useState(() => sample(WORDS).toUpperCase());
  const [gameStatus, setGameStatus] = React.useState('running');
  const [guesses, setGuesses] = React.useState([]);
  const [tentativeGuess, setTentativeGuess] = React.useState('');
  const [keyboardCheckedGuesses, setKeyboardCheckedGuesses] = React.useState(
    []
  );

  React.useEffect(() => {
    console.info({ answer });
  }, [answer]);
  
  // Resets all state for a new game
  function handleRestart() {
    const newAnswer = sample(WORDS).toUpperCase();
    setAnswer(newAnswer);
    setGuesses([]);
    setGameStatus('running');
    setTentativeGuess('');
    setKeyboardCheckedGuesses([]);
    
    // Increment the key to force a full reset of child components
    setGameKey(prevKey => prevKey + 1);
  }

  function handleSubmitGuess() {
    if (tentativeGuess.length !== 5) {
      window.alert('Not enough letters!');
      return;
    }

    // TODO: Validate against word list

    const nextGuesses = [...guesses, tentativeGuess];
    setGuesses(nextGuesses);
    setTentativeGuess('');

    const flipAnimationDuration = 5 * 300;

    setTimeout(() => {
      const newKeyboardStatuses = nextGuesses.map((guess) =>
        checkGuess(guess, answer)
      );
      setKeyboardCheckedGuesses(newKeyboardStatuses);
    }, flipAnimationDuration);

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
          setTentativeGuess((prev) => prev.toUpperCase() + key.toUpperCase());
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [tentativeGuess, gameStatus, guesses, answer]);

  const checkedGuessesForGrid = React.useMemo(
    () => guesses.map((guess) => checkGuess(guess, answer)),
    [guesses, answer]
  );

  return (
    <React.Fragment key={gameKey}>
      <GuessResults
        guesses={checkedGuessesForGrid}
        tentativeGuess={tentativeGuess}
      />
      <Keyboard
        checkedGuesses={keyboardCheckedGuesses}
        handleKeyPress={handleKeyPress}
      />
      {gameStatus !== 'running' && (
        <GameOverBanner
          gameStatus={gameStatus}
          numOfGuesses={guesses.length}
          answer={answer}
          handleRestart={handleRestart}
        />
      )}
    </React.Fragment>
  );
}

export default Game;