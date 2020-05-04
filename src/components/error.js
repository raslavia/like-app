import React from 'react';
import PropTypes from 'prop-types';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch() {
    this.state({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;
    return hasError ? <h1>error</h1> : children;
  }
}

Error.propTypes = {
  children: PropTypes.object,
};

export default Error;
