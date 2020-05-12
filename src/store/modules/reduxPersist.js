import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default (reducers) => {
  const persistedReducers = persistReducer(
    {
      key: 'ONLINESTORE',
      storage,
      whitelist: ['auth', 'shopcart'],
    },
    reducers
  );

  return persistedReducers;
};
