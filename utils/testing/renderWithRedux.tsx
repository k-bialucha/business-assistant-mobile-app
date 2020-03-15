/**
 * renderWithRedux
 *
 * Testing utility function that wraps element
 * with redux Provider component.
 * source: https://testing-library.com/docs/example-react-redux
 */
import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-native-testing-library';

import configureStore from '../../redux/configureStore';

function renderWithRedux(ui: JSX.Element) {
  const store = configureStore();

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

export default renderWithRedux;
