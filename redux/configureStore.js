/**
 * configureStore.js
 * configureStore {store, persistor} 생성
 */
const env = process.env.NODE_ENV;

import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistCombineReducers } from 'redux-persist';
import thunk from 'redux-thunk';

import ledger from './modules/ledger';

/**
 * middleware list
 */
const middlewares = [thunk];

if (env === 'development') {
  // const { logger } = require('redux-logger');
  // middlewares.push(logger);
}

/**
 * persistConfig
 */
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: []
};

/**
 *  여러 모듈들을 결합하여 리듀서를 생성한다.
 */
const reducer = persistCombineReducers(persistConfig, {
  ledger,
});

/**
 * configureStore 정의
 */
const configureStore = () => {
  let store = createStore(reducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
