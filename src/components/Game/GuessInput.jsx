import React from "react";

export default function GuessInput({ handleSubmitGuess }) {
  const [tentativeGuess, setTentativeGuess] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (tentativeGuess.length != 5) {
      window.alert("Please enter exactly 5 characters. 💖");
    }

    console.log({ tentativeGuess });

    handleSubmitGuess(tentativeGuess);

    setTentativeGuess("");
  }

  return (
    <>
      <form className="guess-input-wrapper" onSubmit={handleSubmit}>
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          id="guess-input"
          type="text"
          required
          minLength={5}
          maxLength={5}
          pattern="[A-Z]{5}"
          title="5 letter word"
          value={tentativeGuess}
          onChange={(e) => setTentativeGuess(e.target.value.toUpperCase())}
        />
      </form>
    </>
  );
}
