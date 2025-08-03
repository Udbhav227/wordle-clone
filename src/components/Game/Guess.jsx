import React from "react";

import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

export default function Guess({ value }) {
  return (
    <p className="guess">
      {range(5).map((num) => (
        <span className="cell" key={num}>
          {value ? value[num] : undefined}
        </span>
      ))}
    </p>
  );
}
