import React from 'react';

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['✅', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'],
];

function getLetterStatuses(checkedGuesses) {
  const charObj = {};

  checkedGuesses.forEach((guess) => {
    guess.forEach(({ letter, status }) => {
      const currentStatus = charObj[letter];

      if (currentStatus === 'correct') {
        return;
      }
      if (status === 'correct') {
        charObj[letter] = 'correct';
        return;
      }
      if (currentStatus === 'misplaced') {
        return;
      }
      if (status === 'misplaced') {
        charObj[letter] = 'misplaced';
        return;
      }
      if (status === 'incorrect') {
        charObj[letter] = 'incorrect';
      }
    });
  });

  return charObj;
}

function Keyboard({ checkedGuesses, handleKeyPress }) {
  const letterStatuses = getLetterStatuses(checkedGuesses);

  return (
    <div className="keyboard">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div
          className={`keyboard-row row-${rowIndex}`}
          key={rowIndex}
        >
          {rowIndex === 1 && <div className="key-spacer-half" />}

          {row.map((key) => {
            const status = letterStatuses[key];
            const isSpecialKey = key.length > 1;
            const className = `key ${status ? status : ''} ${
              isSpecialKey ? 'special-key' : ''
            }`;
            return (
              <button
                className={className}
                key={key}
                onClick={() => handleKeyPress(key)}
              >
                {key === 'BACKSPACE' ? '⌫' : key}
              </button>
            );
          })}

          {rowIndex === 1 && <div className="key-spacer-half" />}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;