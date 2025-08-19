import React from 'react';
import { range } from '../../utils';

const random = (min, max) => Math.random() * (max - min) + min;

const Confetti = () => {
  return (
    <div className="confetti-container">
      {range(150).map((i) => (
        <div
          key={i}
          className="confetti"
          style={{
            '--x': `${random(-200, 200)}px`,
            '--y': `${random(-200, 0)}px`,
            '--angle': `${random(0, 360)}deg`,
            '--hue': `${random(0, 360)}`,
            '--delay': `${random(0, 1000)}ms`,
            '--duration': `${random(2000, 5000)}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;