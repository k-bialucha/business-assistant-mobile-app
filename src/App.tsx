import './utils/i18n';

import React from 'react';

import { Provider } from 'react-redux';

import NavContainer from './navigation/NavContainer';
import configureStore from './redux/configureStore';

const store = configureStore();

const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <NavContainer />
    </Provider>
  );
};

export default App;
