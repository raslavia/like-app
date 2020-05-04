import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import { toJson } from 'unsplash-js';
import PropTypes from 'prop-types';
import { unlikeImgAction, likeImgAction } from '../requestApi/request.action';
import unsplash from '../utilis/unsplash-keys';
import mapStateToProps from '../utilis/state';

class ImgPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      i: [],
      links: [],
      urls: [],
      click: '',
      user: [],
      likes: '',
    };
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      const { history } = this.props;
      history.push('/');
    } else {
      unsplash.auth.setBearerToken(localStorage.getItem('token'));
      const { match } = this.props;
      const id = match.params.id;
      unsplash.photos
        .getPhoto(id)
        .then(toJson)
        .then((json) => {
          this.setState({
            i: json,
            likes: json.likes,
            links: json.links,
            urls: json.urls,
            user: json.user,
            click: json.liked_by_user,
          });
        });
    }
  }

  render() {
    const { unlikeImg, likeImg } = this.props;
    const { i, click, user, links, urls, likes } = this.state;

    const likeImgUnsplash = (id) => {
      this.setState({ click: !click, likes: likes + 1 });
      const token = localStorage.getItem('token');
      unsplash.auth.setBearerToken(token);
      return unsplash.photos.likePhoto(id).then(likeImg(id));
    };

    const unlikeImgUnsplash = (id) => {
      this.setState({ click: !click, likes: likes - 1 });
      const token = localStorage.getItem('token');
      unsplash.auth.setBearerToken(token);
      return unsplash.photos.unlikePhoto(id).then(unlikeImg(id));
    };

    return (
      <div className="container">
        {i ? (
          <div>
            <Link to="/" className="button_go-back">
              Go back
            </Link>
            <div>
              <img src={urls.small} alt={i.alt_description} />
              <div className="img-info">
                <a href={links.html}>{user.first_name}</a>
                <span>
                  {likes}
                  {click ? (
                    <span style={{ color: '#ff5656' }}>&#10084;</span>
                  ) : (
                    <span>&#10084;</span>
                  )}
                </span>
              </div>
              <Moment className="moment" fromNow>
                {i.created_at}
              </Moment>
            </div>
            {click ? (
              <button
                type="button"
                className="like-button"
                onClick={() => {
                  unlikeImgUnsplash(i.id);
                }}
              >
                dont like me
              </button>
            ) : (
              <button
                type="button"
                className="like-button"
                onClick={() => {
                  likeImgUnsplash(i.id);
                }}
              >
                like me
              </button>
            )}
          </div>
        ) : (
          'nope'
        )}
      </div>
    );
  }
}

ImgPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  likeImg: PropTypes.func.isRequired,
  unlikeImg: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeImg: (id) => dispatch(likeImgAction(id)),
    unlikeImg: (id) => dispatch(unlikeImgAction(id)),
  };
};
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImgPage));
