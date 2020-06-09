import createSagaMiddleware from 'redux-saga';

import { authSaga } from './auth';

const sagaMiddleware = createSagaMiddleware();

export default sagaMiddleware;

export const runSagas = () => {
  sagaMiddleware.run(authSaga);
};
