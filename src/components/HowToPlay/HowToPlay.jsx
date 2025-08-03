import React from 'react';

function HowToPlay({ isOpen, onClose, anchorPosition }) {
  const [isClosing, setIsClosing] = React.useState(false);
  const modalRef = React.useRef(null);

  React.useEffect(() => {
    if (!isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  function handleClose() {
    setIsClosing(true);
    if (modalRef.current) {
      modalRef.current.addEventListener('animationend', () => {
        onClose();
      }, { once: true });
    }
  }

  if (!isOpen && !isClosing) {
    return null;
  }

  const modalStyle = {
    '--start-top': `${anchorPosition.top}px`,
    '--start-left': `${anchorPosition.left}px`,
  };

  const overlayClassName = `modal-overlay ${isClosing ? 'closing' : ''}`;
  const contentClassName = `modal-content ${isClosing ? 'closing' : ''}`;

  return (
    <div className={overlayClassName} style={modalStyle} onClick={handleClose}>
      <div className={contentClassName} onClick={(e) => e.stopPropagation()} ref={modalRef}>
        <button className="modal-close-btn" onClick={handleClose}>
          &times;
        </button>
        <h2 className="modal-title">How To Play</h2>
        <p>Guess the Wordle in 6 tries.</p>
        <ul>
          <li>Each guess must be a valid 5-letter word.</li>
          <li>The color of the tiles will change to show how close your guess was to the word.</li>
        </ul>
        <h3>Examples</h3>
        <p className="example-guess">
          <span className="cell correct">W</span>
          <span className="cell">O</span>
          <span className="cell">R</span>
          <span className="cell">D</span>
          <span className="cell">Y</span>
        </p>
        <p>W is in the word and in the correct spot.</p>
        <p className="example-guess">
          <span className="cell">L</span>
          <span className="cell misplaced">I</span>
          <span className="cell">G</span>
          <span className="cell">H</span>
          <span className="cell">T</span>
        </p>
        <p>I is in the word but in the wrong spot.</p>
        <p className="example-guess">
          <span className="cell">R</span>
          <span className="cell">O</span>
          <span className="cell">G</span>
          <span className="cell incorrect">U</span>
          <span className="cell">E</span>
        </p>
        <p>U is not in the word in any spot.</p>
      </div>
    </div>
  );
}

export default HowToPlay;