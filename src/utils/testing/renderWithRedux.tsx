/**
 * renderWithRedux
 *
 * Testing utility function that wraps element
 * with redux Provider component.
 * source: https://testing-library.com/docs/example-react-redux
 */
import React from 'react';

import { render } from 'react-native-testing-library';
import { Provider } from 'react-redux';

import configureStore from '~/redux/configureStore';

function renderWithRedux(ui: JSX.Element) {
  const store = configureStore();

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

export default renderWithRedux;
