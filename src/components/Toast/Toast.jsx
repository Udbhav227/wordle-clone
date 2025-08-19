import React from 'react';

const VISIBLE_DURATION = 1200; 
const ANIMATION_DURATION = 300; 

function Toast({ message, handleClose }) {
  const [isClosing, setIsClosing] = React.useState(false);

  React.useEffect(() => {
    const visibleTimer = setTimeout(() => {
      setIsClosing(true);
      
      const closeTimer = setTimeout(() => {
        handleClose();
      }, ANIMATION_DURATION);

      return () => clearTimeout(closeTimer);
    }, VISIBLE_DURATION);

    return () => clearTimeout(visibleTimer);
  }, [handleClose]);

  const className = `toast-wrapper ${isClosing ? 'closing' : ''}`;

  return (
    <div className={className}>
      <div className="toast">
        <div className="message">{message}</div>
      </div>
    </div>
  );
}

export default Toast;