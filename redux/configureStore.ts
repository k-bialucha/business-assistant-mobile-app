import { createStore, combineReducers } from 'redux';

import auth from './auth';

const rootReducer = combineReducers({ auth });

const configureStore = () => {
  return createStore(rootReducer);
};

export default configureStore;
