import React from "react";

export default function gameOverBanner({ gameStatus, numOfGuesses, answer }) {
  if (gameStatus === "won") {
    return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>
            {numOfGuesses === 1 ? "1 guess" : `${numOfGuesses} guesses`}
          </strong>
          .
        </p>
      </div>
    );
  } else if (gameStatus === "lost") {
    return (
      <div className="sad banner">
        Sorry, the correct answer was <strong>{answer}</strong>.
      </div>
    );
  }
}
