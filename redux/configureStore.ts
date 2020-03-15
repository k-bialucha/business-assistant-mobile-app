import { createStore, applyMiddleware } from 'redux';

import rootReducer from './rootReducer';
import sagaMiddleware, { runSagas } from './sagaMiddleware';

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  runSagas();

  return store;
};

export default configureStore;
