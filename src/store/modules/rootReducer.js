import { combineReducers } from 'redux';

import auth from './auth/reducer';
import shopcart from './shopcart/reducer';

export default combineReducers({
  auth,
  shopcart,
});
