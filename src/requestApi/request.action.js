import { toJson } from 'unsplash-js';
import unsplash from '../utilis/unsplash-keys';

export const requestLatestPhotoAction = () => (dispatch) => {
  dispatch({ type: 'REQUEST_API' });
  unsplash.photos
    .listPhotos(1, 10, 'latest')
    .then(toJson)
    .then((json) => dispatch({ type: 'REQUEST_SUCCESS', payload: json }))
    .catch((error) => dispatch({ type: 'REQUEST_ERROR', payload: error }));
};

export const likeImgAction = (id) => {
  return {
    type: 'LIKE_IMG',
    id,
  };
};
export const unlikeImgAction = (id) => {
  return {
    type: 'UNLIKE_IMG',
    id,
  };
};

export const searchRequestAction = (data) => {
  return {
    type: 'SEARCH_SUCCESS',
    payload: data,
  };
};

let count = 2;
export const moreImgsAction = () => (dispatch) => {
  count += 1;

  dispatch({ type: 'REQUEST_API' });
  unsplash.photos
    .listPhotos(count, 10, 'latest')
    .then(toJson)
    .then((json) => {
      dispatch({ type: 'REQUEST_SUCCESS_MORE', payload: json });
    })
    .catch((error) => dispatch({ type: 'REQUEST_ERROR', payload: error }));
};
