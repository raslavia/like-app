import React from 'react';
import PropTypes from 'prop-types';

const LatestMore = ({ clicked, changeClicked, onRequestLatestImgs, moreImgs }) => {
  return (
    <>
      {!clicked ? (
        <button
          type="button"
          className="button_latest-imgs style"
          onClick={() => {
            onRequestLatestImgs();
            changeClicked();
          }}
        >
          LATEST
        </button>
      ) : (
        <button
          type="button"
          className="button_latest-imgs style"
          onClick={() => {
            moreImgs();
          }}
        >
          MORE
        </button>
      )}
    </>
  );
};

LatestMore.propTypes = {
  moreImgs: PropTypes.func.isRequired,
  clicked: PropTypes.bool.isRequired,
  changeClicked: PropTypes.func.isRequired,
  onRequestLatestImgs: PropTypes.func.isRequired,
};

export default LatestMore;
