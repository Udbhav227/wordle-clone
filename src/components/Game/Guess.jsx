import React from 'react';
import { range } from '../../utils';

// The Cell component is fine as is.
function Cell({ letter, status, isFlipped }) {
  const className = `cell ${isFlipped ? 'flipped' : ''}`;
  return (
    <div className={className}>
      <div className="face front">{letter}</div>
      <div className={`face back ${status}`}>{letter}</div>
    </div>
  );
}

function Guess({ value, isSubmitted }) {
  const [flipped, setFlipped] = React.useState([]);

  React.useEffect(() => {
    if (!isSubmitted) {
      setFlipped([]);
      return;
    }

    const flipTiles = () => {
      range(5).forEach((index) => {
        setTimeout(() => {
          setFlipped((prev) => [...prev, index]);
        }, index * 300);
      });
    };

    flipTiles();
  }, [isSubmitted]);

  // This block is for SUBMITTED guesses.
  // 'value' is an array of objects: [{ letter, status }, ...]
  if (isSubmitted) {
    return (
      // FIX 1: Changed <p> to <div> to allow nesting block elements.
      <div className="guess">
        {value.map(({ letter, status }, index) => (
          <Cell
            key={index}
            letter={letter}
            status={status}
            isFlipped={flipped.includes(index)}
          />
        ))}
      </div>
    );
  }  
  const tentativeGuess = range(5).map((num) => {
      return value ? value[num] : undefined;
  });

  return (
    <div className="guess">
      {tentativeGuess.map((letter, index) => (
        <div className="cell" key={index}>
          {letter}
        </div>
      ))}
    </div>
  );
}

export default Guess;