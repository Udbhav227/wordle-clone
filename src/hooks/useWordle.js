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

  React.useEffect(() => {
    console.info(`THE ANSWER IS: ${answer}`);
  }, [answer]);

  React.useEffect(() => {
    if (guesses.length === 0) return;

    const lastGuess = guesses[guesses.length - 1];

    if (lastGuess.toUpperCase() === answer) {
      setGameStatus('won');
    } else if (guesses.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus('lost');
    }
  }, [guesses, answer]);

  const handleKeyPress = React. useCallback(
    (key) => {
      if (gameStatus !== 'running') {
        return;
      }

      if (key === 'ENTER') {
        if (tentativeGuess.length !== 5) {
          window.alert('Not enough letters!');
          return;
        }

        if (!WORDS.includes(tentativeGuess)) {
          window.alert('Not in word list!');
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

  return {
    gameStatus,
    guesses,
    tentativeGuess,
    checkedGuesses,
    answer,
    handleKeyPress,
    handleRestart,
  };
}