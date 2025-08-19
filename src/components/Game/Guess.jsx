import React from 'react';
import { range } from '../../utils';

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
    if (!isSubmitted) return;

    const flipTiles = () => {
      range(5).forEach((index) => {
        setTimeout(() => {
          setFlipped((prev) => [...prev, index]);
        }, index * 300);
      });
    };

    flipTiles();
  }, [isSubmitted]);

  if (isSubmitted) {
    return (
      <p className="guess">
        {value.map(({ letter, status }, index) => (
          <Cell
            key={index}
            letter={letter}
            status={status}
            isFlipped={flipped.includes(index)}
          />
        ))}
      </p>
    );
  }

  return (
    <p className="guess">
      {range(5).map((num) => (
        <div className="cell" key={num}>
          {value ? value[num] : undefined}
        </div>
      ))}
    </p>
  );
}

export default Guess;