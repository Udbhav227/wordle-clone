
import React from 'react';

import { useWordle } from '../../hooks/useWordle';

import GuessResults from './GuessResults';
import Keyboard from '../Keyboard';
import GameOverBanner from '../GameOverBanner';

function Game() {
  // All the complex logic is now neatly contained in this single line!
  const {
    gameStatus,
    guesses,
    tentativeGuess,
    checkedGuesses,
    answer,
    handleKeyPress,
    handleRestart,
  } = useWordle();
  
  // The key state can be used to easily reset the components' internal state on restart.
  const [gameKey, setGameKey] = React.useState(1);

  // This useEffect is now much simpler and more efficient.
  // It only handles listening for physical keyboard presses.
  React.useEffect(() => {
    function handleKeyDown(event) {
      const { key } = event;
      
      // We can use a more robust way to map keyboard inputs
      let pressedKey = key.toUpperCase();
      if (key === 'Enter') pressedKey = 'ENTER';
      if (key === 'Backspace') pressedKey = 'BACKSPACE';
      
      handleKeyPress(pressedKey);
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyPress]); // The only dependency is the stable handleKeyPress function.

  const doRestart = () => {
    handleRestart();
    setGameKey(prevKey => prevKey + 1);
  }

  return (
    <React.Fragment key={gameKey}>
      <GuessResults
        guesses={checkedGuesses}
        tentativeGuess={tentativeGuess}
      />
      <Keyboard
        checkedGuesses={checkedGuesses} // We can reuse checkedGuesses for the keyboard!
        handleKeyPress={handleKeyPress}
      />
      {gameStatus !== 'running' && (
        <GameOverBanner
          gameStatus={gameStatus}
          numOfGuesses={guesses.length}
          answer={answer}
          handleRestart={doRestart}
        />
      )}
    </React.Fragment>
  );
}

export default Game;