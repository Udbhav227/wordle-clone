import React from 'react';

import { useWordle } from '../../hooks/useWordle';

import GuessResults from './GuessResults';
import Keyboard from '../Keyboard';
import GameOverBanner from '../GameOverBanner';
import Toast from '../Toast';

function Game() {
  const {
    gameStatus,
    guesses,
    tentativeGuess,
    checkedGuesses,
    answer,
    toastMessage,
    handleKeyPress,
    handleRestart,
    clearToast,
  } = useWordle();
  
  const [gameKey, setGameKey] = React.useState(1);
  const [isBannerClosing, setIsBannerClosing] = React.useState(false);
  const [keyboardCheckedGuesses, setKeyboardCheckedGuesses] = React.useState([]);

  React.useEffect(() => {
    if (guesses.length > 0) {
      setTimeout(() => {
        setKeyboardCheckedGuesses(checkedGuesses);
      }, 1600);
    } else {
      setKeyboardCheckedGuesses([]);
    }
  }, [guesses, checkedGuesses]);

  React.useEffect(() => {
    function handleKeyDown(event) {
      const { key } = event;
      
      let pressedKey = key.toUpperCase();
      if (key === 'Enter') pressedKey = 'ENTER';
      if (key === 'Backspace') pressedKey = 'BACKSPACE';
      
      handleKeyPress(pressedKey);
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]);

  const doRestart = () => {
    setIsBannerClosing(true);
    setTimeout(() => {
    handleRestart();
    setGameKey(prevKey => prevKey + 1);
      setIsBannerClosing(false);
    }, 500); 
  }

  return (
    <React.Fragment key={gameKey}>
      {toastMessage && (
        <Toast
          message={toastMessage}
          handleClose={clearToast}
        />
      )}
      <GuessResults
        guesses={checkedGuesses}
        tentativeGuess={tentativeGuess}
        className={isBannerClosing ? 'clearing' : ''}
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
          handleRestart={doRestart}
        isClosing={isBannerClosing}
        />
      )}
    </React.Fragment>
  );
}

export default Game;