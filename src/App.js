import React from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import './App.css';
import PropTypes from 'prop-types';

import { toJson } from 'unsplash-js';
import { logOutAction, logInAction } from './login/login.action';
import {
  requestLatestPhotoAction,
  searchRequestAction,
  moreImgsAction,
} from './requestApi/request.action';

import Error from './components/error';
import Log from './components/log';
import ButtonTopBottom from './components/button-top-bottom';
import LatestMore from './components/latest-more';
import ImgsList from './components/imgs-list';
import ImgPage from './components/img-page';

import { ReactComponent as Logo } from './utilis/camera.svg';
import mapStateToProps from './utilis/state';

import unsplash from './utilis/unsplash-keys';

export const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  'public',
  'write_likes',
  'read_user',
  'read_photos',
]);

class App extends React.Component {
  constructor() {
    super();
    this.state = { clicked: false };
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      const { onRequestLatestImgs } = this.props;
      onRequestLatestImgs();
    }
  }

  changeClicked = () => {
    this.setState({ clicked: true });
  };

  setAccessTokenUnplash = (code) => {
    unsplash.auth
      .userAuthentication(code)
      .then(toJson)
      .then((json) => {
        localStorage.setItem('token', json.access_token);
        unsplash.auth.setBearerToken(json.access_token);
      });
  };

  setAccessToken = () => {
    const code = window.location.search.split('code=')[1];
    const { logInAct } = this.props;
    if (code) {
      localStorage.setItem('token', code);
      this.setAccessTokenUnplash(code);
      logInAct();
      if (localStorage.getItem('token')) {
        const { onRequestLatestImgs } = this.props;
        onRequestLatestImgs();
      }
    }
  };

  goLogIn = () => {
    window.location.assign(authenticationUrl);
  };

  goLogOut = () => {
    const { logOutAct } = this.props;
    localStorage.clear('token');
    logOutAct();
    this.setState({ clicked: false });
  };

  search = (qwery) => {
    const { searchAction } = this.props;
    const token = localStorage.getItem('token');
    unsplash.auth.setBearerToken(token);
    return unsplash.search
      .photos(qwery, 1, 30)
      .then(toJson)
      .then((json) => {
        searchAction(json.results);
        this.setState({ clicked: false });
      });
  };

  render() {
    const { imgs, isPending, onRequestLatestImgs, moreImgs } = this.props;
    const { clicked } = this.state;
    return (
      <div>
        <Router>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <div className="container">
                  <div className="header" id="header">
                    <Logo className="logo" />
                    <LatestMore
                      clicked={clicked}
                      changeClicked={this.changeClicked}
                      onRequestLatestImgs={onRequestLatestImgs}
                      moreImgs={moreImgs}
                    />
                    <input
                      type="text"
                      placeholder="search..."
                      className="style"
                      onChange={(e) => this.search(e.target.value)}
                    />
                    <Log
                      setAccessToken={this.setAccessToken}
                      goLogIn={this.goLogIn}
                      goLogOut={this.goLogOut}
                    />
                  </div>
                  <div>
                    {isPending ? (
                      <h1>Loading...</h1>
                    ) : (
                      <Error>
                        <ImgsList imgs={imgs} />
                      </Error>
                    )}
                  </div>
                </div>
              )}
            />

            <Route path="/:id" component={ImgPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <ButtonTopBottom />
      </div>
    );
  }
}

App.propTypes = {
  imgs: PropTypes.array,
  onRequestLatestImgs: PropTypes.func,
  moreImgs: PropTypes.func,
  logInAct: PropTypes.func.isRequired,
  logOutAct: PropTypes.func.isRequired,
  searchAction: PropTypes.func.isRequired,
  isPending: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRequestLatestImgs: () => dispatch(requestLatestPhotoAction()),
    moreImgs: () => dispatch(moreImgsAction()),
    logOutAct: () => dispatch(logOutAction()),
    logInAct: () => dispatch(logInAction()),
    searchAction: (data) => dispatch(searchRequestAction(data)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
