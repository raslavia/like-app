import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Log = (props) => {
  const { goLogIn, goLogOut, setAccessToken } = props;
  let logInLogOut = null;

  if (
    localStorage.getItem('token') === 'undefined' ||
    localStorage.getItem('token') === '' ||
    !localStorage.getItem('token')
  ) {
    setAccessToken();
    logInLogOut = (
      <button
        className="button_latest-imgs style"
        type="button"
        onClick={() => {
          goLogIn();
        }}
      >
        <Link to="/">SIGN IN</Link>
      </button>
    );
  } else {
    logInLogOut = (
      <button className="button_latest-imgs style" type="button" onClick={() => goLogOut()}>
        <Link to="/">SIGN OUT</Link>
      </button>
    );
  }
  return <div className="login-logout">{logInLogOut}</div>;
};

Log.propTypes = {
  goLogIn: PropTypes.func.isRequired,
  goLogOut: PropTypes.func.isRequired,
  setAccessToken: PropTypes.func.isRequired,
};

export default Log;
