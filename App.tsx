import React from 'react';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';

import InitialScreen from './screens/InitialScreen';

const store = configureStore();

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <InitialScreen />
    </Provider>
  );
};

export default App;
