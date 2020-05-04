export const initialState = {
  user: {},
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOG_OUT_ACTION':
      return {
        ...state,
      };

    case 'LOG_IN_ACTION':
      return {
        ...state,
      };
    default:
      return state;
  }
};
