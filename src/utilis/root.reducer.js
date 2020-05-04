import { combineReducers } from 'redux';
import { loginReducer } from '../login/login.reducer';
import { requestReducer } from '../requestApi/request.reducer';

const rootReducer = combineReducers({
  loginReducer,
  requestReducer,
});

export default rootReducer;
