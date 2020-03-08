import React from 'react';
import renderer from 'react-test-renderer';
import { render } from 'react-native-testing-library';

import App from './App';
import InitialScreen from './screens/InitialScreen';

describe('<App />', () => {
  it('matches the snapshot', () => {
    const tree = renderer.create(<App />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('contains InitialScreen', () => {
    const { queryByType } = render(<App />);

    const element = queryByType(InitialScreen);

    expect(element).toBeTruthy();
  });
});
