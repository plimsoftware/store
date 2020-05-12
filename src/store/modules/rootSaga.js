import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import shopcart from './shopcart/sagas';

export default function* rootSaga() {
  return yield all([auth, shopcart]);
}
