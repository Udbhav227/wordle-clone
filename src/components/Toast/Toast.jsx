import React from 'react';

function Toast({ message, handleClose }) {
  return (
    <div className="toast-wrapper">
      <div className="toast">
        <div className="message">{message}</div>
        <button
          className="close-button"
          onClick={handleClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.2em"
            height="1.2em"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Toast;