import React from 'react';
import Game from '../Game';
import Header from '../Header';
import HowToPlay from '../HowToPlay';

function App() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalAnchor, setModalAnchor] = React.useState({ top: 0, left: 0 });

  function handleHowToPlayClick(event) {
    const { top, left, width, height } = event.currentTarget.getBoundingClientRect();
    setModalAnchor({
      top: top + height / 2,
      left: left + width / 2,
    });
    setIsModalOpen(true);
  }

  return (
    <div className="wrapper">
      <Header onHowToPlayClick={handleHowToPlayClick} />

      <div className="game-wrapper">
        <Game />
      </div>

      <HowToPlay
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        anchorPosition={modalAnchor}
      />
    </div>
  );
}

export default App;