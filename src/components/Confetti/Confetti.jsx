import React from 'react';
import { range } from '../../utils';

const random = (min, max) => Math.random() * (max - min) + min;

const Confetti = () => {
  return (
    <div className="confetti-container">
      {range(150).map((i) => (
        <div
          key={i}
          className="confetti-wrapper"
          style={{
            '--x-start': `${random(0, 100)}vw`,
            '--fall-duration': `${random(4, 8)}s`,
            '--delay': `${random(0, 5)}s`,
          }}
        >
          <div
            className="confetti"
            style={{
              '--hue': `${random(0, 360)}`,
              '--sway-duration': `${random(2, 4)}s`,
              '--sway-amount': `${random(-60, 60)}px`,
              '--spin-amount': `${random(360, 1080)}deg`,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Confetti;