import React from "react";

import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

function Cell({ letter, status, isFlipped }) {
  const className = `cell ${isFlipped ? "flipped" : ""}`;
  return (
    <span className={className}>
      <div className="face front">
        <span className="letter">{letter}</span>
      </div>
      <div className={`face back ${status}`}>
        <span className="letter">{letter}</span>
      </div>
    </span>
  );
}

export default function Guess({ value, answer }) {
  const [result, setResult] = React.useState(null);
  const [flipped, setFlipped] = React.useState([]);

  React.useEffect(() => {
    if (value) {
      const newResult = checkGuess(value, answer);
      setResult(newResult);

      newResult.forEach((_, index) => {
        setTimeout(() => {
          setFlipped((prevFlipped) => [...prevFlipped, index]);
        }, index * 300);
      });
    }
  }, [value, answer]);

  return (
    <p className="guess">
      {range(5).map((num) => (
        <Cell
          letter={result ? result[num].letter : undefined}
          status={result ? result[num].status : undefined}
          isFlipped={flipped.includes(num)}
          key={num}
        ></Cell>
      ))}
    </p>
  );
}