export const intialStateImg = {
  isPending: false,
  imgs: [],
  error: '',
};
export const requestReducer = (state = intialStateImg, action) => {
  switch (action.type) {
    case 'REQUEST_API':
      return {
        ...state,
        isPending: true,
      };
    case 'REQUEST_SUCCESS':
      return {
        ...state,
        isPending: false,
        imgs: action.payload,
        error: '',
      };
    case 'REQUEST_SUCCESS_MORE':
      return {
        ...state,
        isPending: false,
        imgs: [...state.imgs, ...action.payload],
        error: '',
      };
    case 'REQUEST_ERROR':
      return {
        ...state,
        isPending: false,
        error: action.payload,
      };
    case 'LIKE_IMG': {
      const likedImg = state.imgs.map((i) => {
        if (i.id === action.id) {
          i.liked_by_user = true;
          i.likes += 1;
        }
        return i;
      });
      return { ...state, imgs: likedImg };
    }
    case 'UNLIKE_IMG': {
      const unlikedImg = state.imgs.map((i) => {
        if (i.id === action.id) {
          i.liked_by_user = false;
          i.likes -= 1;
        }
        return i;
      });
      return { ...state, imgs: unlikedImg };
    }
    case 'SEARCH_SUCCESS':
      return {
        ...state,
        imgs: action.payload,
      };

    default:
      return state;
  }
};
