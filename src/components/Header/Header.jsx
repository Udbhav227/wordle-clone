import React from 'react';

function Header({ onHowToPlayClick }) {
  return (
    <header>
      <h1>Word Game</h1>
      <div className="side right">
        <button aria-label="How to play" onClick={onHowToPlayClick}>
          ?
        </button>
      </div>
    </header>
  );
}

export default Header;
