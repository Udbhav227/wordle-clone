import React from 'react';
import { sample } from '../utils';
import { WORDS } from '../data';
import { NUM_OF_GUESSES_ALLOWED } from '../constants';
import { checkGuess } from '../game-helpers';

export function useWordle() {
  const [answer, setAnswer] = React.useState(() => sample(WORDS).toUpperCase());
  const [guesses, setGuesses] = React.useState([]);
  const [tentativeGuess, setTentativeGuess] = React.useState('');
  const [gameStatus, setGameStatus] = React.useState('running');
  const [toastMessage, setToastMessage] = React.useState('');

  React.useEffect(() => {
    console.info(`THE ANSWER IS: ${answer}`);
  }, [answer]);

  React.useEffect(() => {
    if (guesses.length === 0) return;

    const lastGuess = guesses[guesses.length - 1];

    if (lastGuess.toUpperCase() === answer) {
      setTimeout(() => setGameStatus('won'), 1500);
    } else if (guesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setTimeout(() => setGameStatus('lost'), 1500);
    }
  }, [guesses, answer]);

  const handleKeyPress = React.useCallback(
    (key) => {
      if (gameStatus !== 'running') {
        return;
      }

      if (key === 'ENTER') {
        if (tentativeGuess.length !== 5) {
          setToastMessage('Not enough letters!');
          return;
        }

        if (!WORDS.includes(tentativeGuess.toUpperCase())) {
          setToastMessage('Not in word list!');
          return;
        }
        
        setGuesses((prev) => [...prev, tentativeGuess]);
        setTentativeGuess('');
        return;
      }

      if (key === 'BACKSPACE') {
        setTentativeGuess((prev) => prev.slice(0, -1));
        return;
      }

      if (/^[a-zA-Z]$/.test(key) && tentativeGuess.length < 5) {
        setTentativeGuess((prev) => prev + key.toUpperCase());
      }
    },
    [tentativeGuess, gameStatus, answer]
  );
  
  const handleRestart = React.useCallback(() => {
    const newAnswer = sample(WORDS).toUpperCase();
    setAnswer(newAnswer);
    setGuesses([]);
    setGameStatus('running');
    setTentativeGuess('');
  }, []);

  const checkedGuesses = React.useMemo(
    () => guesses.map((guess) => checkGuess(guess, answer)),
    [guesses, answer]
  );
  
  const clearToast = () => setToastMessage('');

  return {
    gameStatus,
    guesses,
    tentativeGuess,
    checkedGuesses,
    answer,
    toastMessage,
    handleKeyPress,
    handleRestart,
    clearToast,
  };
}