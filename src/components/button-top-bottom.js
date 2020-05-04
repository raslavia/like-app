import React from 'react';

const ButtonTopBottom = () => {
  const scrollToTop = () => {
    window.scroll({
      behavior: 'smooth',
      left: 0,
      top: 0,
    });
  };

  const scrollToBottom = () => {
    window.scrollBy(0, 500);
  };
  return (
    <div className="scroll-to">
      <button type="button" className="scroll-button" onClick={() => scrollToTop()}>
        UP
      </button>
      <hr />
      <button type="button" className="scroll-button" onClick={() => scrollToBottom()}>
        DOWN
      </button>
    </div>
  );
};

export default ButtonTopBottom;
